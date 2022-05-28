package mysql

import (
	"database/sql"
	"fmt"
	"go2music/database"
	"go2music/model"
	"strings"

	"github.com/rs/xid"
	log "github.com/sirupsen/logrus"
)

func (db *DB) initializeAlbum() {
	db.stmt["sqlAlbumExists"] = database.SqlAlbumExists
	db.stmt["sqlAlbumCreate"] = database.SqlAlbumCreate
	db.stmt["sqlAlbumIndexPath"] = database.SqlAlbumIndexPath
	db.stmt["sqlAlbumIndexMbid"] = database.SqlAlbumIndexMbid
	db.stmt["sqlAlbumInsert"] = database.SqlAlbumInsert
	db.stmt["sqlAlbumUpdate"] = database.SqlAlbumUpdate
	db.stmt["sqlAlbumDelete"] = database.SqlAlbumDelete
	db.stmt["sqlAlbumById"] = database.SqlAlbumById
	db.stmt["sqlAlbumByPath"] = database.SqlAlbumByPath
	db.stmt["sqlAlbumAll"] = database.SqlAlbumAll
	db.stmt["sqlAlbumCount"] = database.SqlAlbumCount
	db.stmt["sqlAlbumWithoutSong"] = database.SqlAlbumWithoutSong
	db.stmt["sqlAlbumWithoutTitle"] = database.SqlAlbumWithoutTitle
	db.stmt["sqlAlbumForArtist"] = database.SqlAlbumForArtist
	db.stmt["sqlAlbumRecent"] = database.SqlAlbumRecent
	_, err := db.Query(db.sanitizer(db.stmt["sqlAlbumExists"]))
	if err != nil {
		log.Info("Table album does not exists. Creating now.")
		_, err := db.Exec(db.sanitizer(db.stmt["sqlAlbumCreate"]))
		if err != nil {
			log.Error("Error creating album table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Album Table successfully created....")
		}
		_, err = db.Exec(db.sanitizer(db.stmt["sqlAlbumIndexPath"]))
		if err != nil {
			log.Error("Error creating album table index for path")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on album path generated....")
		}
		_, err = db.Exec(db.sanitizer(db.stmt["sqlAlbumIndexMbid"]))
		if err != nil {
			log.Error("Error creating album table index for mbid")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on album mbid generated....")
		}
	}
}

// CreateAlbum create a new album in the database
func (db *DB) CreateAlbum(album model.Album) (*model.Album, error) {
	album.Id = xid.New().String()
	_, err := db.Exec(db.sanitizer(db.stmt["sqlAlbumInsert"]), album.Id, album.Title, album.Path, album.Mbid)
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
	_, err := db.Exec(db.sanitizer(db.stmt["sqlAlbumInsert"]), album.Id, album.Title, album.Path, album.Mbid)
	if err != nil {
		log.Error(err)
	}
	return &album, err
}

// UpdateAlbum update the given album in the database
func (db *DB) UpdateAlbum(album model.Album) (*model.Album, error) {
	_, err := db.Exec(db.sanitizer(db.stmt["sqlAlbumUpdate"]), album.Title, album.Path, album.Mbid, album.Id)
	return &album, err
}

// DeleteAlbum delete the album with the id in the database
func (db *DB) DeleteAlbum(id string) error {
	_, err := db.Exec(db.sanitizer(db.stmt["sqlAlbumDelete"]), id)
	return err
}

// FindAlbumById get the album with the given id
func (db *DB) FindAlbumById(id string) (*model.Album, error) {
	return fetchAlbumRow(db.QueryRow(db.sanitizer(db.stmt["sqlAlbumById"]), id))
}

// FindAlbumByPath get the album with the given path
func (db *DB) FindAlbumByPath(path string) (*model.Album, error) {
	return fetchAlbumRow(db.QueryRow(db.sanitizer(db.stmt["sqlAlbumByPath"]), path))
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
	defer rows.Close()
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
	rows, err := db.Query(db.sanitizer(db.stmt["sqlAlbumAll"]) + orderAndLimit)
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
		total = db.countRows(db.sanitizer(db.stmt["sqlAlbumCount"]) + whereClause)
	}
	return albums, total, err
}

// FindAlbumsWithoutSongs find all albums without any song
func (db *DB) FindAlbumsWithoutSongs() ([]*model.Album, error) {
	rows, err := db.Query(db.sanitizer(db.stmt["sqlAlbumWithoutSong"]))
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
	rows, err := db.Query(db.sanitizer(db.stmt["sqlAlbumWithoutTitle"]))
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
	rows, err := db.Query(db.sanitizer(db.stmt["sqlAlbumForArtist"]), artistId)
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
	rows, err := db.Query(db.sanitizer(db.stmt["sqlAlbumRecent"]), num)
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
		s += fmt.Sprintf(" LIMIT %d,%d", paging.Page*paging.Size, paging.Size)
		l = true
	}
	return s, l
}
