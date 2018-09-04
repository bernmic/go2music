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
		stmt, err := db.Prepare("CREATE TABLE IF NOT EXISTS album (id varchar(32), title varchar(255) NOT NULL, path varchar(255) NOT NULL, PRIMARY KEY (id));")
		if err != nil {
			log.Error("Error creating album table")
			panic(fmt.Sprintf("%v", err))
		}
		_, err = stmt.Exec()
		if err != nil {
			log.Error("Error creating album table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Album Table successfully created....")
		}
		stmt, err = db.Prepare("ALTER TABLE album ADD UNIQUE INDEX album_path (path)")
		if err != nil {
			log.Error("Error creating album table index for path")
			panic(fmt.Sprintf("%v", err))
		}
		_, err = stmt.Exec()
		if err != nil {
			log.Error("Error creating album table index for path")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on path generated....")
		}
	}
}

func (db *DB) CreateAlbum(album model.Album) (model.Album, error) {
	album.Id = xid.New().String()
	_, err := db.Exec("INSERT IGNORE INTO album (id, title, path) VALUES(?, ?, ?)", album.Id, album.Title, album.Path)
	if err != nil {
		log.Fatal(err)
	}
	return album, err
}

func (db *DB) CreateIfNotExistsAlbum(album model.Album) (model.Album, error) {
	album.Id = xid.New().String()
	existingAlbum, findErr := db.FindAlbumByPath(album.Path)
	if findErr == nil {
		return existingAlbum, findErr
	}
	_, err := db.Exec("INSERT INTO album (id, title, path) VALUES(?, ?, ?)", album.Id, album.Title, album.Path)
	if err != nil {
		log.Fatal(err)
	}
	return album, err
}

func (db *DB) UpdateAlbum(album model.Album) (model.Album, error) {
	_, err := db.Exec("UPDATE album SET title=?, path=? WHERE id=?", album.Title, album.Path, album.Id)
	return album, err
}

func (db *DB) DeleteAlbum(id string) error {
	_, err := db.Exec("DELETE FROM album WHERE id=?", id)
	return err
}

func (db *DB) FindAlbumById(id string) (model.Album, error) {
	album := model.Album{}
	err := db.QueryRow("SELECT id,title,path FROM album WHERE id=?", id).Scan(&album.Id, &album.Title, &album.Path)
	if err != nil {
		log.Fatal(err)
	}
	return album, err
}

func (db *DB) FindAlbumByPath(path string) (model.Album, error) {
	album := model.Album{}
	err := db.QueryRow("SELECT id,title,path FROM album WHERE path=?", path).Scan(&album.Id, &album.Title, &album.Path)
	return album, err
}

func (db *DB) FindAllAlbums() ([]model.Album, error) {
	rows, err := db.Query("SELECT id, title, path FROM album")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	albums := make([]model.Album, 0)
	for rows.Next() {
		album := new(model.Album)
		err := rows.Scan(&album.Id, &album.Title, &album.Path)
		if err != nil {
			log.Fatal(err)
		}
		albums = append(albums, album)
	}
	if err = rows.Err(); err != nil {
		log.Fatal(err)
	}

	return albums, err
}
