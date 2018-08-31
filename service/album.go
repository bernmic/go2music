package service

import (
	"fmt"
	log "github.com/sirupsen/logrus"
	"go2music/model"
)

func InitializeAlbum() {
	_, err := Database.Query("SELECT 1 FROM album LIMIT 1")
	if err != nil {
		log.Info("Table album does not exists. Creating now.")
		stmt, err := Database.Prepare("CREATE TABLE IF NOT EXISTS album (id BIGINT NOT NULL AUTO_INCREMENT, title varchar(255) NOT NULL, path varchar(255) NOT NULL, PRIMARY KEY (id));")
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
		stmt, err = Database.Prepare("ALTER TABLE album ADD UNIQUE INDEX album_path (path)")
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

func CreateAlbum(album model.Album) (*model.Album, error) {
	result, err := Database.Exec("INSERT IGNORE INTO album (title, path) VALUES(?, ?)", album.Title, album.Path)
	if err != nil {
		log.Fatal(err)
	}
	album.Id, _ = result.LastInsertId()
	return &album, err
}

func CreateIfNotExistsAlbum(album model.Album) (*model.Album, error) {
	existingAlbum, findErr := FindAlbumByPath(album.Path)
	if findErr == nil {
		return existingAlbum, findErr
	}
	result, err := Database.Exec("INSERT INTO album (title, path) VALUES(?, ?)", album.Title, album.Path)
	if err != nil {
		log.Fatal(err)
	}
	album.Id, _ = result.LastInsertId()
	return &album, err
}

func UpdateAlbum(album model.Album) (*model.Album, error) {
	_, err := Database.Exec("UPDATE album SET title=?, path=? WHERE id=?", album.Title, album.Path, album.Id)
	return &album, err
}

func DeleteAlbum(id int64) error {
	_, err := Database.Exec("DELETE FROM album WHERE id=?", id)
	return err
}

func FindAlbumById(id int64) (*model.Album, error) {
	album := new(model.Album)
	err := Database.QueryRow("SELECT id,title,path FROM album WHERE id=?", id).Scan(&album.Id, &album.Title, &album.Path)
	if err != nil {
		log.Fatal(err)
	}
	return album, err
}

func FindAlbumByPath(path string) (*model.Album, error) {
	album := new(model.Album)
	err := Database.QueryRow("SELECT id,title,path FROM album WHERE path=?", path).Scan(&album.Id, &album.Title, &album.Path)
	return album, err
}

func FindAllAlbums() ([]*model.Album, error) {
	rows, err := Database.Query("SELECT id, title, path FROM album")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	albums := make([]*model.Album, 0)
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
