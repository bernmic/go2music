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

const ()

func (db *DB) initializeArtist() {
	db.stmt["sqlArtistExists"] = database.SqlArtistExists
	db.stmt["sqlArtistCreate"] = database.SqlArtistCreate
	db.stmt["sqlArtistIndexName"] = database.SqlArtistIndexName
	db.stmt["sqlArtistIndexMbid"] = database.SqlArtistIndexMbid
	db.stmt["sqlArtistInsert"] = database.SqlArtistInsert
	db.stmt["sqlArtistUpdate"] = database.SqlArtistUpdate
	db.stmt["sqlArtistDelete"] = database.SqlArtistDelete
	db.stmt["sqlArtistById"] = database.SqlArtistById
	db.stmt["sqlArtistByName"] = database.SqlArtistByName
	db.stmt["sqlArtistAll"] = database.SqlArtistAll
	db.stmt["sqlArtistCount"] = database.SqlArtistCount
	db.stmt["sqlArtistWithoutName"] = database.SqlArtistWithoutName
	_, err := db.Query(db.sanitizer(db.stmt["sqlArtistExists"]))
	if err != nil {
		log.Info("Table artist does not exists. Creating now.")
		_, err := db.Exec(db.sanitizer(db.stmt["sqlArtistCreate"]))
		if err != nil {
			log.Error("Error creating artist table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Artist Table successfully created....")
		}
		_, err = db.Exec(db.sanitizer(db.stmt["sqlArtistIndexName"]))
		if err != nil {
			log.Error("Error creating artist table index for name")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on artist name generated....")
		}
		_, err = db.Exec(db.sanitizer(db.stmt["sqlArtistIndexMbid"]))
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
	_, err := db.Exec(db.sanitizer(db.stmt["sqlArtistInsert"]), artist.Id, artist.Name, artist.Mbid)
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
	_, err := db.Exec(db.sanitizer(db.stmt["sqlArtistInsert"]), artist.Id, artist.Name, artist.Mbid)
	if err != nil {
		log.Error(err)
	}
	return &artist, err
}

// UpdateArtist update the given artist in the database
func (db *DB) UpdateArtist(artist model.Artist) (*model.Artist, error) {
	_, err := db.Exec(db.sanitizer(db.stmt["sqlArtistUpdate"]), artist.Name, artist.Mbid, artist.Id)
	return &artist, err
}

// DeleteArtist delete the artist with the id in the database
func (db *DB) DeleteArtist(id string) error {
	_, err := db.Exec(db.sanitizer(db.stmt["sqlArtistDelete"]), id)
	return err
}

// FindArtistById get the artist with the given id
func (db *DB) FindArtistById(id string) (*model.Artist, error) {
	return fetchArtistRow(db.QueryRow(db.sanitizer(db.stmt["sqlArtistById"]), id))
}

// FindArtistByName get the artist with the given name
func (db *DB) FindArtistByName(name string) (*model.Artist, error) {
	return fetchArtistRow(db.QueryRow(db.sanitizer(db.stmt["sqlArtistByName"]), name))
}

// FindAllArtists get all artists which matches the optional filter and is in the given page
func (db *DB) FindAllArtists(filter string, paging model.Paging) ([]*model.Artist, int, error) {
	orderAndLimit, limit := createOrderAndLimitForArtist(paging)
	whereClause := ""
	if filter != "" {
		whereClause = " WHERE LOWER(artist.name) LIKE '%" + strings.ToLower(filter) + "%'"
		orderAndLimit = whereClause + orderAndLimit
	}
	rows, err := db.Query(db.sanitizer(db.stmt["sqlArtistAll"]) + orderAndLimit)
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
		total = db.countRows(db.sanitizer(db.stmt["sqlArtistCount"]) + whereClause)
	}
	return artists, total, err
}

// FindArtistsWithoutName find all artists without a name
func (db *DB) FindArtistsWithoutName() ([]*model.Artist, error) {
	rows, err := db.Query(db.sanitizer(db.stmt["sqlArtistWithoutName"]))
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
