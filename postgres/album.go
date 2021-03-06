package postgres

import (
	"fmt"
	"go2music/model"
	"strings"

	"github.com/rs/xid"
	log "github.com/sirupsen/logrus"
)

func (db *DB) initializeAlbum() {
	_, err := db.Query("SELECT 1 FROM album LIMIT 1")
	if err != nil {
		log.Info("Table album does not exists. Creating now.")
		_, err := db.Exec("CREATE TABLE IF NOT EXISTS album (id varchar(32), title varchar(255) NOT NULL, path varchar(255) NOT NULL, PRIMARY KEY (id));")
		if err != nil {
			log.Error("Error creating album table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Album Table successfully created....")
		}
		_, err = db.Exec("CREATE UNIQUE INDEX album_path ON album (path)")
		if err != nil {
			log.Error("Error creating album table index for path")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on path generated....")
		}
	}
}

// CreateAlbum create a new album in the database
func (db *DB) CreateAlbum(album model.Album) (*model.Album, error) {
	album.Id = xid.New().String()
	_, err := db.Exec(sanitizePlaceholder("INSERT INTO album (id, title, path) VALUES(?, ?, ?)"), album.Id, album.Title, album.Path)
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
	_, err := db.Exec(sanitizePlaceholder("INSERT INTO album (id, title, path) VALUES(?, ?, ?)"), album.Id, album.Title, album.Path)
	if err != nil {
		log.Error(err)
	}
	return &album, err
}

// UpdateAlbum update the given album in the database
func (db *DB) UpdateAlbum(album model.Album) (*model.Album, error) {
	_, err := db.Exec(sanitizePlaceholder("UPDATE album SET title=?, path=? WHERE id=?"), album.Title, album.Path, album.Id)
	return &album, err
}

// DeleteAlbum delete the album with the id in the database
func (db *DB) DeleteAlbum(id string) error {
	_, err := db.Exec(sanitizePlaceholder("DELETE FROM album WHERE id=?"), id)
	return err
}

// FindAlbumById get the album with the given id
func (db *DB) FindAlbumById(id string) (*model.Album, error) {
	album := model.Album{}
	err := db.QueryRow(sanitizePlaceholder("SELECT id,title,path FROM album WHERE id=?"), id).Scan(&album.Id, &album.Title, &album.Path)
	if err != nil {
		log.Errorf("Error loading album with id %s: %v", id, err)
		return nil, err
	}
	return &album, err
}

// FindAlbumByPath get the album with the given path
func (db *DB) FindAlbumByPath(path string) (*model.Album, error) {
	album := model.Album{}
	err := db.QueryRow(sanitizePlaceholder("SELECT id,title,path FROM album WHERE path=?"), path).Scan(&album.Id, &album.Title, &album.Path)
	return &album, err
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
	rows, err := db.Query(sanitizePlaceholder("SELECT id, title, path FROM album" + orderAndLimit))
	if err != nil {
		log.Errorf("Error get all albums: %v", err)
		return nil, 0, err
	}
	defer rows.Close()
	albums := make([]*model.Album, 0)
	for rows.Next() {
		album := new(model.Album)
		err := rows.Scan(&album.Id, &album.Title, &album.Path)
		if err != nil {
			log.Error(err)
		}
		albums = append(albums, album)
	}
	if err = rows.Err(); err != nil {
		log.Error(err)
	}

	total := len(albums)
	if limit {
		total = db.countRows(sanitizePlaceholder("SELECT COUNT(*) FROM album" + whereClause))
	}
	return albums, total, err
}

// FindAlbumsWithoutSongs find all albums without any song
func (db *DB) FindAlbumsWithoutSongs() ([]*model.Album, error) {
	rows, err := db.Query(sanitizePlaceholder("SELECT album.id, album.title, album.path FROM album LEFT OUTER JOIN song ON album.id=song.album_id WHERE song.id IS NULL"))
	if err != nil {
		log.Errorf("Error get albums without songs: %v", err)
		return nil, err
	}
	defer rows.Close()
	albums := make([]*model.Album, 0)
	for rows.Next() {
		album := new(model.Album)
		err := rows.Scan(&album.Id, &album.Title, &album.Path)
		if err != nil {
			log.Error(err)
		}
		albums = append(albums, album)
	}
	if err = rows.Err(); err != nil {
		log.Error(err)
	}

	return albums, err
}

// FindAlbumsWithoutTitle find all albums without a title
func (db *DB) FindAlbumsWithoutTitle() ([]*model.Album, error) {
	rows, err := db.Query(sanitizePlaceholder("SELECT album.id, album.title, album.path FROM album WHERE album.title IS NULL OR album.title=''"))
	if err != nil {
		log.Errorf("Error get albums without title: %v", err)
		return nil, err
	}
	defer rows.Close()
	albums := make([]*model.Album, 0)
	for rows.Next() {
		album := new(model.Album)
		err := rows.Scan(&album.Id, &album.Title, &album.Path)
		if err != nil {
			log.Error(err)
		}
		albums = append(albums, album)
	}
	if err = rows.Err(); err != nil {
		log.Error(err)
	}

	return albums, err
}

// FindAlbumsForArtist find all albums with at least one song of the given artist
func (db *DB) FindAlbumsForArtist(artistId string) ([]*model.Album, error) {
	stmt := `
SELECT DISTINCT
	album.id album_id,
	album.title album_title,
	album.path album_path
FROM
	song
LEFT JOIN artist ON song.artist_id = artist.id
LEFT JOIN album ON song.album_id = album.id
WHERE
	artist.id=?
`
	rows, err := db.Query(sanitizePlaceholder(stmt), artistId)
	if err != nil {
		log.Errorf("Error get all albums for artist: %v", err)
		return nil, err
	}
	defer rows.Close()
	albums := make([]*model.Album, 0)
	for rows.Next() {
		album := new(model.Album)
		err := rows.Scan(&album.Id, &album.Title, &album.Path)
		if err != nil {
			log.Error(err)
		}
		albums = append(albums, album)
	}
	if err = rows.Err(); err != nil {
		log.Error(err)
	}
	return albums, err
}

// FindRecentlyAddedAlbums find the num recently added albums
func (db *DB) FindRecentlyAddedAlbums(num int) ([]*model.Album, error) {
	stmt := `
	SELECT DISTINCT
		album.id,
		album.title,
		album.path,
		song.added
	FROM
		song
	INNER JOIN album ON song.album_id = album.id
	ORDER BY song.added DESC LIMIT ?
	`
	rows, err := db.Query(sanitizePlaceholder(stmt), num)
	if err != nil {
		log.Error("Error reading recently added albums: ", err)
		return nil, err
	}
	defer rows.Close()
	albums := make([]*model.Album, 0)
	for rows.Next() {
		album := new(model.Album)
		added := 0
		err := rows.Scan(&album.Id, &album.Title, &album.Path, &added)
		if err != nil {
			log.Error(err)
		}
		albums = append(albums, album)
	}
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
