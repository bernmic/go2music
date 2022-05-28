package mysql

import (
	"database/sql"
	"fmt"
	"go2music/model"
	"strings"

	"github.com/rs/xid"
	log "github.com/sirupsen/logrus"
)

const (
	sqlArtistExists      = "SELECT 1 FROM artist LIMIT 1"
	sqlArtistCreate      = "CREATE TABLE IF NOT EXISTS artist (id varchar(32), name varchar(255) NOT NULL, mbid varchar(36), PRIMARY KEY (id));"
	sqlArtistIndexName   = "CREATE UNIQUE INDEX artist_name ON artist (name)"
	sqlArtistIndexMbid   = "CREATE INDEX artist_mbid ON artist (mbid)"
	sqlArtistInsert      = "INSERT INTO artist (id, name, mbid) VALUES(?, ?, ?)"
	sqlArtistUpdate      = "UPDATE artist SET name=?, mbid=? WHERE id=?"
	sqlArtistDelete      = "DELETE FROM artist WHERE id=?"
	sqlArtistById        = "SELECT id,name,mbid FROM artist WHERE id=?"
	sqlArtistByName      = "SELECT id,name,mbid FROM artist WHERE name=?"
	sqlArtistAll         = "SELECT id, name, mbid FROM artist"
	sqlArtistCount       = "SELECT COUNT(*) FROM artist"
	sqlArtistWithoutName = "SELECT artist.id, artist.name, artist.mbid FROM artist WHERE artist.name IS NULL OR artist.name=''"
)

func (db *DB) initializeArtist() {
	_, err := db.Query(sqlArtistExists)
	if err != nil {
		log.Info("Table artist does not exists. Creating now.")
		_, err := db.Exec(sqlArtistCreate)
		if err != nil {
			log.Error("Error creating artist table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Artist Table successfully created....")
		}
		_, err = db.Exec(sqlArtistIndexName)
		if err != nil {
			log.Error("Error creating artist table index for name")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on artist name generated....")
		}
		_, err = db.Exec(sqlArtistIndexMbid)
		if err != nil {
			log.Error("Error creating artist table index for mbid")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on artist mbid generated....")
		}
	}
}

// CreateArtist create a new artist in the database
func (db *DB) CreateArtist(artist model.Artist) (*model.Artist, error) {
	artist.Id = xid.New().String()
	_, err := db.Exec(sanitizePlaceholder(sqlArtistInsert), artist.Id, artist.Name, artist.Mbid)
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
	_, err := db.Exec(sanitizePlaceholder(sqlArtistInsert), artist.Id, artist.Name, artist.Mbid)
	if err != nil {
		log.Error(err)
	}
	return &artist, err
}

// UpdateArtist update the given artist in the database
func (db *DB) UpdateArtist(artist model.Artist) (*model.Artist, error) {
	_, err := db.Exec(sanitizePlaceholder(sqlArtistUpdate), artist.Name, artist.Mbid, artist.Id)
	return &artist, err
}

// DeleteArtist delete the artist with the id in the database
func (db *DB) DeleteArtist(id string) error {
	_, err := db.Exec(sanitizePlaceholder(sqlArtistDelete), id)
	return err
}

// FindArtistById get the artist with the given id
func (db *DB) FindArtistById(id string) (*model.Artist, error) {
	return fetchArtistRow(db.QueryRow(sanitizePlaceholder(sqlArtistById), id))
}

// FindArtistByName get the artist with the given name
func (db *DB) FindArtistByName(name string) (*model.Artist, error) {
	return fetchArtistRow(db.QueryRow(sanitizePlaceholder(sqlArtistByName), name))
}

// FindAllArtists get all artists which matches the optional filter and is in the given page
func (db *DB) FindAllArtists(filter string, paging model.Paging) ([]*model.Artist, int, error) {
	orderAndLimit, limit := createOrderAndLimitForArtist(paging)
	whereClause := ""
	if filter != "" {
		whereClause = " WHERE LOWER(artist.name) LIKE '%" + strings.ToLower(filter) + "%'"
		orderAndLimit = whereClause + orderAndLimit
	}
	rows, err := db.Query(sanitizePlaceholder(sqlArtistAll + orderAndLimit))
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
		total = db.countRows(sanitizePlaceholder(sqlArtistCount + whereClause))
	}
	return artists, total, err
}

// FindArtistsWithoutName find all artists without a name
func (db *DB) FindArtistsWithoutName() ([]*model.Artist, error) {
	rows, err := db.Query(sanitizePlaceholder(sqlArtistWithoutName))
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
	defer rows.Close()
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
		s += fmt.Sprintf(" LIMIT %d,%d", paging.Page*paging.Size, paging.Size)
		l = true
	}
	return s, l
}
