package postgres

import (
	"fmt"
	"go2music/model"
	"strings"

	"github.com/rs/xid"
	log "github.com/sirupsen/logrus"
)

func (db *DB) initializeArtist() {
	_, err := db.Query("SELECT 1 FROM artist LIMIT 1")
	if err != nil {
		log.Info("Table artist does not exists. Creating now.")
		_, err := db.Exec("CREATE TABLE IF NOT EXISTS artist (id varchar(32), name varchar(255) NOT NULL, PRIMARY KEY (id));")
		if err != nil {
			log.Error("Error creating artist table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Artist Table successfully created....")
		}
		_, err = db.Exec("CREATE UNIQUE INDEX artist_name ON artist (name)")
		if err != nil {
			log.Error("Error creating artist table index for name")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on name generated....")
		}
	}
}

// CreateArtist create a new artist in the database
func (db *DB) CreateArtist(artist model.Artist) (*model.Artist, error) {
	artist.Id = xid.New().String()
	_, err := db.Exec(sanitizePlaceholder("INSERT INTO artist (id, name) VALUES(?, ?)"), artist.Id, artist.Name)
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
	_, err := db.Exec(sanitizePlaceholder("INSERT INTO artist (id, name) VALUES(?, ?)"), artist.Id, artist.Name)
	if err != nil {
		log.Error(err)
	}
	return &artist, err
}

// UpdateArtist update the given artist in the database
func (db *DB) UpdateArtist(artist model.Artist) (*model.Artist, error) {
	_, err := db.Exec(sanitizePlaceholder("UPDATE artist SET name=? WHERE id=?"), artist.Name, artist.Id)
	return &artist, err
}

// DeleteArtist delete the artist with the id in the database
func (db *DB) DeleteArtist(id string) error {
	_, err := db.Exec(sanitizePlaceholder("DELETE FROM artist WHERE id=?"), id)
	return err
}

// FindArtistById get the artist with the given id
func (db *DB) FindArtistById(id string) (*model.Artist, error) {
	artist := new(model.Artist)
	err := db.QueryRow(sanitizePlaceholder("SELECT id,name FROM artist WHERE id=?"), id).Scan(&artist.Id, &artist.Name)
	if err != nil {
		log.Error(err)
	}
	return artist, err
}

// FindArtistByName get the artist with the given name
func (db *DB) FindArtistByName(name string) (*model.Artist, error) {
	artist := new(model.Artist)
	err := db.QueryRow(sanitizePlaceholder("SELECT id,name FROM artist WHERE name=?"), name).Scan(&artist.Id, &artist.Name)
	if err != nil {
		return artist, err
	}
	return artist, err
}

// FindAllArtists get all artists which matches the optional filter and is in the given page
func (db *DB) FindAllArtists(filter string, paging model.Paging) ([]*model.Artist, int, error) {
	orderAndLimit, limit := createOrderAndLimitForArtist(paging)
	whereClause := ""
	if filter != "" {
		whereClause = " WHERE LOWER(artist.name) LIKE '%" + strings.ToLower(filter) + "%'"
		orderAndLimit = whereClause + orderAndLimit
	}
	rows, err := db.Query(sanitizePlaceholder("SELECT id, name FROM artist" + orderAndLimit))
	if err != nil {
		log.Errorf("Error get all artists: %v", err)
		return nil, 0, err
	}
	defer rows.Close()
	artists := make([]*model.Artist, 0)
	for rows.Next() {
		artist := new(model.Artist)
		err := rows.Scan(&artist.Id, &artist.Name)
		if err != nil {
			log.Error(err)
		}
		artists = append(artists, artist)
	}
	if err = rows.Err(); err != nil {
		log.Error(err)
	}
	total := len(artists)
	if limit {
		total = db.countRows(sanitizePlaceholder("SELECT COUNT(*) FROM artist" + whereClause))
	}
	return artists, total, err
}

// FindArtistsWithoutName find all artists without a name
func (db *DB) FindArtistsWithoutName() ([]*model.Artist, error) {
	rows, err := db.Query(sanitizePlaceholder("SELECT artist.id, artist.name FROM artist WHERE artist.name IS NULL OR artist.name=''"))
	if err != nil {
		log.Errorf("Error get artists without name: %v", err)
		return nil, err
	}
	defer rows.Close()
	artists := make([]*model.Artist, 0)
	for rows.Next() {
		artist := new(model.Artist)
		err := rows.Scan(&artist.Id, &artist.Name)
		if err != nil {
			log.Error(err)
		}
		artists = append(artists, artist)
	}
	if err = rows.Err(); err != nil {
		log.Error(err)
	}

	return artists, err
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
