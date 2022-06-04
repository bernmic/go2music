package database

import (
	"database/sql"
	"fmt"
	"github.com/rs/xid"
	log "github.com/sirupsen/logrus"
	"go2music/model"
	"strings"
)

// AlbumManager defines all database functions for albums
type AlbumManager interface {
	CreateAlbum(album model.Album) (*model.Album, error)
	CreateIfNotExistsAlbum(album model.Album) (*model.Album, error)
	UpdateAlbum(album model.Album) (*model.Album, error)
	DeleteAlbum(id string) error
	FindAlbumById(id string) (*model.Album, error)
	FindAlbumByPath(path string) (*model.Album, error)
	FindAllAlbums(filter string, paging model.Paging, titleMode string) ([]*model.Album, int, error)
	FindAlbumsForArtist(artistId string) ([]*model.Album, error)
	FindAlbumsWithoutSongs() ([]*model.Album, error)
	FindAlbumsWithoutTitle() ([]*model.Album, error)
}

const (
	SqlAlbumExists       = "SELECT 1 FROM album LIMIT 1"
	SqlAlbumCreate       = "CREATE TABLE IF NOT EXISTS album (id varchar(32), title varchar(255) NOT NULL, path varchar(255) NOT NULL, mbid varchar(36), PRIMARY KEY (id));"
	SqlAlbumIndexPath    = "CREATE UNIQUE INDEX album_path ON album (path)"
	SqlAlbumIndexMbid    = "CREATE INDEX album_mbid ON album (mbid)"
	SqlAlbumInsert       = "INSERT INTO album (id, title, path, mbid) VALUES(?, ?, ?, ?)"
	SqlAlbumUpdate       = "UPDATE album SET title=?, path=?, mbid=? WHERE id=?"
	SqlAlbumDelete       = "DELETE FROM album WHERE id=?"
	SqlAlbumById         = "SELECT id,title,path, mbid FROM album WHERE id=?"
	SqlAlbumByPath       = "SELECT id,title,path,mbid FROM album WHERE path=?"
	SqlAlbumAll          = "SELECT id, title, path, mbid FROM album"
	SqlAlbumCount        = "SELECT COUNT(*) FROM album"
	SqlAlbumWithoutSong  = "SELECT album.id, album.title, album.path, album.mbid FROM album LEFT OUTER JOIN song ON album.id=song.album_id WHERE song.id IS NULL"
	SqlAlbumWithoutTitle = "SELECT album.id, album.title, album.path, album.mbid FROM album WHERE album.title IS NULL OR album.title=''"
	SqlAlbumForArtist    = `
SELECT DISTINCT
	album.id album_id,
	album.title album_title,
	album.path album_path,
	album.mbid album_mbid
FROM
	song
LEFT JOIN artist ON song.artist_id = artist.id
LEFT JOIN album ON song.album_id = album.id
WHERE
	artist.id=?
`
	SqlAlbumRecent = `
	SELECT DISTINCT
		album.id,
		album.title,
		album.path,
		album.mbid
	FROM
		song
	INNER JOIN album ON song.album_id = album.id
	ORDER BY song.added DESC LIMIT ?
	`
)

// CreateAlbum create a new album in the database
func (db *DB) CreateAlbum(album model.Album) (*model.Album, error) {
	album.Id = xid.New().String()
	_, err := db.Exec(db.Sanitizer(db.Stmt["sqlAlbumInsert"]), album.Id, album.Title, album.Path, album.Mbid)
	if err != nil {
		log.Error(err)
	}
	return &album, err
}

// CreateIfNotExistsAlbum create a new album in the database if the path is not found in the database
func (db *DB) CreateIfNotExistsAlbum(album model.Album) (*model.Album, error) {
	album.Id = xid.New().String()
	existingAlbum, findErr := db.FindAlbumByPath(album.Path)
	if findErr == nil {
		return existingAlbum, findErr
	}
	_, err := db.Exec(db.Sanitizer(db.Stmt["sqlAlbumInsert"]), album.Id, album.Title, album.Path, album.Mbid)
	if err != nil {
		log.Error(err)
	}
	return &album, err
}

// UpdateAlbum update the given album in the database
func (db *DB) UpdateAlbum(album model.Album) (*model.Album, error) {
	_, err := db.Exec(db.Sanitizer(db.Stmt["sqlAlbumUpdate"]), album.Title, album.Path, album.Mbid, album.Id)
	return &album, err
}

// DeleteAlbum delete the album with the id in the database
func (db *DB) DeleteAlbum(id string) error {
	_, err := db.Exec(db.Sanitizer(db.Stmt["sqlAlbumDelete"]), id)
	return err
}

// FindAlbumById get the album with the given id
func (db *DB) FindAlbumById(id string) (*model.Album, error) {
	return fetchAlbumRow(db.QueryRow(db.Sanitizer(db.Stmt["sqlAlbumById"]), id))
}

// FindAlbumByPath get the album with the given path
func (db *DB) FindAlbumByPath(path string) (*model.Album, error) {
	return fetchAlbumRow(db.QueryRow(db.Sanitizer(db.Stmt["sqlAlbumByPath"]), path))
}

func fetchAlbumRow(row *sql.Row) (*model.Album, error) {
	album := model.Album{}
	var mbid sql.NullString
	err := row.Scan(&album.Id, &album.Title, &album.Path, &mbid)
	if err != nil {
		return nil, err
	}
	if mbid.Valid {
		album.Mbid = mbid.String
	}
	return &album, nil
}

func fetchAlbumRows(rows *sql.Rows) []*model.Album {
	var mbid sql.NullString
	defer func() {
		err := rows.Close()
		if err != nil {
			log.Errorf("error closing rows in albums: %v", err)
		}
	}()
	albums := make([]*model.Album, 0)
	for rows.Next() {
		album := new(model.Album)
		err := rows.Scan(&album.Id, &album.Title, &album.Path, &mbid)
		if err != nil {
			log.Error(err)
		}
		if mbid.Valid {
			album.Mbid = mbid.String
		}
		albums = append(albums, album)
	}
	return albums
}

// FindAllAlbums get all albums which matches the optional filter and is in the given page
func (db *DB) FindAllAlbums(filter string, paging model.Paging, titleMode string) ([]*model.Album, int, error) {
	orderAndLimit, limit := createOrderAndLimitForAlbum(paging)
	whereClause := ""
	switch strings.ToLower(titleMode) {
	case "empty":
		whereClause = " WHERE (album.title='' OR album.title IS NULL)"
	case "notempty":
		whereClause = " WHERE (album.title!='' AND album.title IS NOT NULL)"
	default:
		whereClause = " WHERE album.title is not null"
	}
	if filter != "" {
		whereClause = whereClause + " AND LOWER(album.title) LIKE '%" + strings.ToLower(filter) + "%'"
	}
	orderAndLimit = whereClause + orderAndLimit
	rows, err := db.Query(db.Sanitizer(db.Stmt["sqlAlbumAll"]) + orderAndLimit)
	if err != nil {
		log.Errorf("Error get all albums: %v", err)
		return nil, 0, err
	}
	albums := fetchAlbumRows(rows)
	if err = rows.Err(); err != nil {
		log.Error(err)
	}

	total := len(albums)
	if limit {
		total = db.countRows(db.Sanitizer(db.Stmt["sqlAlbumCount"]) + whereClause)
	}
	return albums, total, err
}

// FindAlbumsWithoutSongs find all albums without any song
func (db *DB) FindAlbumsWithoutSongs() ([]*model.Album, error) {
	rows, err := db.Query(db.Sanitizer(db.Stmt["sqlAlbumWithoutSong"]))
	if err != nil {
		log.Errorf("Error get albums without songs: %v", err)
		return nil, err
	}
	albums := fetchAlbumRows(rows)
	if err = rows.Err(); err != nil {
		log.Error(err)
	}

	return albums, err
}

// FindAlbumsWithoutTitle find all albums without a title
func (db *DB) FindAlbumsWithoutTitle() ([]*model.Album, error) {
	rows, err := db.Query(db.Sanitizer(db.Stmt["sqlAlbumWithoutTitle"]))
	if err != nil {
		log.Errorf("Error get albums without title: %v", err)
		return nil, err
	}
	albums := fetchAlbumRows(rows)
	if err = rows.Err(); err != nil {
		log.Error(err)
	}

	return albums, err
}

// FindAlbumsForArtist find all albums with at least one song of the given artist
func (db *DB) FindAlbumsForArtist(artistId string) ([]*model.Album, error) {
	rows, err := db.Query(db.Sanitizer(db.Stmt["sqlAlbumForArtist"]), artistId)
	if err != nil {
		log.Errorf("Error get all albums for artist: %v", err)
		return nil, err
	}
	albums := fetchAlbumRows(rows)
	if err = rows.Err(); err != nil {
		log.Error(err)
	}
	return albums, err
}

// FindRecentlyAddedAlbums find the num recently added albums
func (db *DB) FindRecentlyAddedAlbums(num int) ([]*model.Album, error) {
	rows, err := db.Query(db.Sanitizer(db.Stmt["sqlAlbumRecent"]), num)
	if err != nil {
		log.Error("Error reading recently added albums: ", err)
		return nil, err
	}
	albums := fetchAlbumRows(rows)
	if err = rows.Err(); err != nil {
		log.Error(err)
	}
	return albums, err
}

func createOrderAndLimitForAlbum(paging model.Paging) (string, bool) {
	s := ""
	l := false
	if paging.Sort != "" {
		switch paging.Sort {
		case "title":
			s += " ORDER BY title"
		}
		if s != "" {
			if paging.Direction == "asc" {
				s += " ASC"
			} else if paging.Direction == "desc" {
				s += " DESC"
			}
		}
	}
	if paging.Size > 0 {
		s += fmt.Sprintf(" LIMIT %d OFFSET %d", paging.Size, paging.Page*paging.Size)
		l = true
	}
	return s, l
}
