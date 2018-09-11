package mysql

import (
	"fmt"
	"github.com/rs/xid"
	log "github.com/sirupsen/logrus"
	"go2music/model"
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
		_, err = db.Exec("ALTER TABLE artist ADD UNIQUE INDEX artist_name (name)")
		if err != nil {
			log.Error("Error creating artist table index for name")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on name generated....")
		}
	}
}

func (db *DB) CreateArtist(artist model.Artist) (*model.Artist, error) {
	artist.Id = xid.New().String()
	_, err := db.Exec("INSERT INTO artist (id, name) VALUES(?, ?)", artist.Id, artist.Name)
	if err != nil {
		log.Error(err)
	}
	return &artist, err
}

func (db *DB) CreateIfNotExistsArtist(artist model.Artist) (*model.Artist, error) {
	existingArtist, findErr := db.FindArtistByName(artist.Name)
	if findErr == nil {
		return existingArtist, findErr
	}
	artist.Id = xid.New().String()
	_, err := db.Exec("INSERT INTO artist (id, name) VALUES(?, ?)", artist.Id, artist.Name)
	if err != nil {
		log.Error(err)
	}
	return &artist, err
}

func (db *DB) UpdateArtist(artist model.Artist) (*model.Artist, error) {
	_, err := db.Exec("UPDATE artist SET name=? WHERE id=?", artist.Name, artist.Id)
	return &artist, err
}

func (db *DB) DeleteArtist(id string) error {
	_, err := db.Exec("DELETE FROM artist WHERE id=?", id)
	return err
}

func (db *DB) FindArtistById(id string) (*model.Artist, error) {
	artist := new(model.Artist)
	err := db.QueryRow("SELECT id,name FROM artist WHERE id=?", id).Scan(&artist.Id, &artist.Name)
	if err != nil {
		log.Error(err)
	}
	return artist, err
}

func (db *DB) FindArtistByName(name string) (*model.Artist, error) {
	artist := new(model.Artist)
	err := db.QueryRow("SELECT id,name FROM artist WHERE name=?", name).Scan(&artist.Id, &artist.Name)
	if err != nil {
		return artist, err
	}
	return artist, err
}

func (db *DB) FindAllArtists(paging model.Paging) ([]*model.Artist, error) {
	rows, err := db.Query("SELECT id, name FROM artist" + createOrderAndLimitForArtist(paging))
	if err != nil {
		log.Fatal(err)
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

func createOrderAndLimitForArtist(paging model.Paging) string {
	s := ""
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
	}
	return s
}
