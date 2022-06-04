package database

import (
	"database/sql"
	"fmt"
	"github.com/rs/xid"
	log "github.com/sirupsen/logrus"
	"go2music/model"
	"strings"
)

// ArtistManager defines all database functions for artists
type ArtistManager interface {
	CreateArtist(artist model.Artist) (*model.Artist, error)
	CreateIfNotExistsArtist(artist model.Artist) (*model.Artist, error)
	UpdateArtist(artist model.Artist) (*model.Artist, error)
	DeleteArtist(id string) error
	FindArtistById(id string) (*model.Artist, error)
	FindArtistByName(name string) (*model.Artist, error)
	FindAllArtists(filter string, paging model.Paging) ([]*model.Artist, int, error)
	FindArtistsWithoutName() ([]*model.Artist, error)
}

const (
	SqlArtistExists      = "SELECT 1 FROM artist LIMIT 1"
	SqlArtistCreate      = "CREATE TABLE IF NOT EXISTS artist (id varchar(32), name varchar(255) NOT NULL, mbid varchar(36), PRIMARY KEY (id));"
	SqlArtistIndexName   = "CREATE UNIQUE INDEX artist_name ON artist (name)"
	SqlArtistIndexMbid   = "CREATE INDEX artist_mbid ON artist (mbid)"
	SqlArtistInsert      = "INSERT INTO artist (id, name, mbid) VALUES(?, ?, ?)"
	SqlArtistUpdate      = "UPDATE artist SET name=?, mbid=? WHERE id=?"
	SqlArtistDelete      = "DELETE FROM artist WHERE id=?"
	SqlArtistById        = "SELECT id,name,mbid FROM artist WHERE id=?"
	SqlArtistByName      = "SELECT id,name,mbid FROM artist WHERE name=?"
	SqlArtistAll         = "SELECT id, name, mbid FROM artist"
	SqlArtistCount       = "SELECT COUNT(*) FROM artist"
	SqlArtistWithoutName = "SELECT artist.id, artist.name, artist.mbid FROM artist WHERE artist.name IS NULL OR artist.name=''"
)

// CreateArtist create a new artist in the database
func (db *DB) CreateArtist(artist model.Artist) (*model.Artist, error) {
	artist.Id = xid.New().String()
	_, err := db.Exec(db.Sanitizer(db.Stmt["sqlArtistInsert"]), artist.Id, artist.Name, artist.Mbid)
	if err != nil {
		log.Error(err)
	}
	return &artist, err
}

// CreateIfNotExistsArtist create a new artist in the database if the name is not found in the database
func (db *DB) CreateIfNotExistsArtist(artist model.Artist) (*model.Artist, error) {
	existingArtist, findErr := db.FindArtistByName(artist.Name)
	if findErr == nil {
		return existingArtist, findErr
	}
	artist.Id = xid.New().String()
	_, err := db.Exec(db.Sanitizer(db.Stmt["sqlArtistInsert"]), artist.Id, artist.Name, artist.Mbid)
	if err != nil {
		log.Error(err)
	}
	return &artist, err
}

// UpdateArtist update the given artist in the database
func (db *DB) UpdateArtist(artist model.Artist) (*model.Artist, error) {
	_, err := db.Exec(db.Sanitizer(db.Stmt["sqlArtistUpdate"]), artist.Name, artist.Mbid, artist.Id)
	return &artist, err
}

// DeleteArtist delete the artist with the id in the database
func (db *DB) DeleteArtist(id string) error {
	_, err := db.Exec(db.Sanitizer(db.Stmt["sqlArtistDelete"]), id)
	return err
}

// FindArtistById get the artist with the given id
func (db *DB) FindArtistById(id string) (*model.Artist, error) {
	return fetchArtistRow(db.QueryRow(db.Sanitizer(db.Stmt["sqlArtistById"]), id))
}

// FindArtistByName get the artist with the given name
func (db *DB) FindArtistByName(name string) (*model.Artist, error) {
	return fetchArtistRow(db.QueryRow(db.Sanitizer(db.Stmt["sqlArtistByName"]), name))
}

// FindAllArtists get all artists which matches the optional filter and is in the given page
func (db *DB) FindAllArtists(filter string, paging model.Paging) ([]*model.Artist, int, error) {
	orderAndLimit, limit := createOrderAndLimitForArtist(paging)
	whereClause := ""
	if filter != "" {
		whereClause = " WHERE LOWER(artist.name) LIKE '%" + strings.ToLower(filter) + "%'"
		orderAndLimit = whereClause + orderAndLimit
	}
	rows, err := db.Query(db.Sanitizer(db.Stmt["sqlArtistAll"]) + orderAndLimit)
	if err != nil {
		log.Errorf("Error get all artists: %v", err)
		return nil, 0, err
	}
	artists := fetchArtistRows(rows)
	if err = rows.Err(); err != nil {
		log.Error(err)
	}
	total := len(artists)
	if limit {
		total = db.countRows(db.Sanitizer(db.Stmt["sqlArtistCount"]) + whereClause)
	}
	return artists, total, err
}

// FindArtistsWithoutName find all artists without a name
func (db *DB) FindArtistsWithoutName() ([]*model.Artist, error) {
	rows, err := db.Query(db.Sanitizer(db.Stmt["sqlArtistWithoutName"]))
	if err != nil {
		log.Errorf("Error get artists without name: %v", err)
		return nil, err
	}
	artists := fetchArtistRows(rows)
	if err = rows.Err(); err != nil {
		log.Error(err)
	}

	return artists, err
}

func fetchArtistRow(row *sql.Row) (*model.Artist, error) {
	artist := model.Artist{}
	var mbid sql.NullString
	err := row.Scan(&artist.Id, &artist.Name, &mbid)
	if err != nil {
		return nil, err
	}
	if mbid.Valid {
		artist.Mbid = mbid.String
	}
	return &artist, nil
}

func fetchArtistRows(rows *sql.Rows) []*model.Artist {
	var mbid sql.NullString
	defer func() {
		err := rows.Close()
		if err != nil {
			log.Errorf("error closing rows in artists: %v", err)
		}
	}()
	artists := make([]*model.Artist, 0)
	for rows.Next() {
		artist := new(model.Artist)
		err := rows.Scan(&artist.Id, &artist.Name, &mbid)
		if err != nil {
			log.Error(err)
		}
		if mbid.Valid {
			artist.Mbid = mbid.String
		}
		artists = append(artists, artist)
	}
	return artists
}

func createOrderAndLimitForArtist(paging model.Paging) (string, bool) {
	s := ""
	l := false
	if paging.Sort != "" {
		switch paging.Sort {
		case "name":
			s += " ORDER BY name"
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
