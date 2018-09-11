package mysql

import (
	"fmt"
	"github.com/rs/xid"
	log "github.com/sirupsen/logrus"
	"go2music/model"
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
		_, err = db.Exec("ALTER TABLE album ADD UNIQUE INDEX album_path (path)")
		if err != nil {
			log.Error("Error creating album table index for path")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on path generated....")
		}
	}
}

func (db *DB) CreateAlbum(album model.Album) (*model.Album, error) {
	album.Id = xid.New().String()
	_, err := db.Exec("INSERT INTO album (id, title, path) VALUES(?, ?, ?)", album.Id, album.Title, album.Path)
	if err != nil {
		log.Error(err)
	}
	return &album, err
}

func (db *DB) CreateIfNotExistsAlbum(album model.Album) (*model.Album, error) {
	album.Id = xid.New().String()
	existingAlbum, findErr := db.FindAlbumByPath(album.Path)
	if findErr == nil {
		return existingAlbum, findErr
	}
	_, err := db.Exec("INSERT INTO album (id, title, path) VALUES(?, ?, ?)", album.Id, album.Title, album.Path)
	if err != nil {
		log.Error(err)
	}
	return &album, err
}

func (db *DB) UpdateAlbum(album model.Album) (*model.Album, error) {
	_, err := db.Exec("UPDATE album SET title=?, path=? WHERE id=?", album.Title, album.Path, album.Id)
	return &album, err
}

func (db *DB) DeleteAlbum(id string) error {
	_, err := db.Exec("DELETE FROM album WHERE id=?", id)
	return err
}

func (db *DB) FindAlbumById(id string) (*model.Album, error) {
	album := model.Album{}
	err := db.QueryRow("SELECT id,title,path FROM album WHERE id=?", id).Scan(&album.Id, &album.Title, &album.Path)
	if err != nil {
		log.Error(err)
	}
	return &album, err
}

func (db *DB) FindAlbumByPath(path string) (*model.Album, error) {
	album := model.Album{}
	err := db.QueryRow("SELECT id,title,path FROM album WHERE path=?", path).Scan(&album.Id, &album.Title, &album.Path)
	return &album, err
}

func (db *DB) FindAllAlbums(paging model.Paging) ([]*model.Album, error) {
	rows, err := db.Query("SELECT id, title, path FROM album" + createOrderAndLimitForAlbum(paging))
	if err != nil {
		log.Fatal(err)
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

func createOrderAndLimitForAlbum(paging model.Paging) string {
	s := ""
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
	}
	return s
}
