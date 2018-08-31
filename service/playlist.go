package service

import (
	"fmt"
	log "github.com/sirupsen/logrus"
	"go2music/model"
)

func InitializePlaylist() {
	_, err := Database.Query("SELECT 1 FROM playlist LIMIT 1")
	if err != nil {
		log.Info("Table playlist does not exists. Creating now.")
		stmt, err := Database.Prepare("CREATE TABLE IF NOT EXISTS playlist (id BIGINT NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, query varchar(255) NOT NULL, PRIMARY KEY (id));")
		if err != nil {
			log.Error("Error creating playlist table")
			panic(fmt.Sprintf("%v", err))
		}
		_, err = stmt.Exec()
		if err != nil {
			log.Error("Error creating playlist table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Playlist Table successfully created....")
		}
		stmt, err = Database.Prepare("ALTER TABLE playlist ADD UNIQUE INDEX playlist_name (name)")
		if err != nil {
			log.Error("Error creating playlist table index for name")
			panic(fmt.Sprintf("%v", err))
		}
		_, err = stmt.Exec()
		if err != nil {
			log.Error("Error creating playlist table index for name")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on name generated....")
		}
	}
}

func CreatePlaylist(playlist model.Playlist) (*model.Playlist, error) {
	result, err := Database.Exec("INSERT IGNORE INTO playlist (name,query) VALUES(?,?)", playlist.Name, playlist.Query)
	if err != nil {
		log.Fatal(err)
	}
	playlist.Id, _ = result.LastInsertId()
	return &playlist, err
}

func CreateIfNotExistsPlaylist(playlist model.Playlist) (*model.Playlist, error) {
	existingPlaylist, findErr := FindPlaylistByName(playlist.Name)
	if findErr == nil {
		return existingPlaylist, findErr
	}
	result, err := Database.Exec("INSERT INTO playlist (name,query) VALUES(?,?)", playlist.Name, playlist.Query)
	if err != nil {
		log.Fatal(err)
	}
	playlist.Id, _ = result.LastInsertId()
	return &playlist, err
}

func UpdatePlaylist(playlist model.Playlist) (*model.Playlist, error) {
	_, err := Database.Exec("UPDATE playlist SET name=?,query=? WHERE id=?", playlist.Name, playlist.Query, playlist.Id)
	return &playlist, err
}

func DeletePlaylist(id int64) error {
	_, err := Database.Exec("DELETE FROM playlist WHERE id=?", id)
	return err
}

func FindPlaylistById(id int64) (*model.Playlist, error) {
	playlist := new(model.Playlist)
	err := Database.QueryRow("SELECT id,name,query FROM playlist WHERE id=?", id).Scan(&playlist.Id, &playlist.Name, &playlist.Query)
	if err != nil {
		log.Fatal(err)
	}
	return playlist, err
}

func FindPlaylistByName(name string) (*model.Playlist, error) {
	playlist := new(model.Playlist)
	err := Database.QueryRow("SELECT id,name,query FROM playlist WHERE name=?", name).Scan(&playlist.Id, &playlist.Name, &playlist.Query)
	if err != nil {
		return playlist, err
	}
	return playlist, err
}

func FindAllPlaylists() ([]*model.Playlist, error) {
	rows, err := Database.Query("SELECT id, name, query FROM playlist")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	playlists := make([]*model.Playlist, 0)
	for rows.Next() {
		playlist := new(model.Playlist)
		err := rows.Scan(&playlist.Id, &playlist.Name, &playlist.Query)
		if err != nil {
			log.Fatal(err)
		}
		playlists = append(playlists, playlist)
	}
	if err = rows.Err(); err != nil {
		log.Fatal(err)
	}

	return playlists, err
}
