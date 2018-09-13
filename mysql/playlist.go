package mysql

import (
	"fmt"
	"github.com/rs/xid"
	log "github.com/sirupsen/logrus"
	"go2music/model"
)

const (
	createPlaylistTableStatement = `
	CREATE TABLE IF NOT EXISTS playlist (
		id varchar(32),
		name VARCHAR(255) NOT NULL,
		query VARCHAR(255) NOT NULL,
		user_id varchar(32) NOT NULL,
		PRIMARY KEY (id),
		FOREIGN KEY (user_id) REFERENCES user(id)
		);
	`

	createPlaylistSongTableStatement = `
	CREATE TABLE IF NOT EXISTS playlist_song (
		playlist_id varchar(32) NOT NULL,
		song_id varchar(32) NOT NULL,
		PRIMARY KEY (playlist_id,song_id),
		FOREIGN KEY (playlist_id) REFERENCES playlist(id),
		FOREIGN KEY (song_id) REFERENCES song(id)
		);
	`
)

func (db *DB) initializePlaylist() {
	_, err := db.Query("SELECT 1 FROM playlist LIMIT 1")
	if err != nil {
		log.Info("Table playlist does not exists. Creating now.")
		_, err := db.Exec(createPlaylistTableStatement)
		if err != nil {
			log.Error("Error creating playlist table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Playlist Table successfully created....")
		}
		_, err = db.Exec("ALTER TABLE playlist ADD UNIQUE INDEX playlist_name (name)")
		if err != nil {
			log.Error("Error creating playlist table index for name")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on name generated....")
		}
		_, err = db.Query("SELECT 1 FROM playlist_song LIMIT 1")
		if err != nil {
			log.Info("Table playlist_song does not exists. Creating now.")
			_, err := db.Exec(createPlaylistSongTableStatement)
			if err != nil {
				log.Error("Error creating playlist_song table")
				panic(fmt.Sprintf("%v", err))
			} else {
				log.Info("Playlist_song Table successfully created....")
			}
		}
	}
}

func (db *DB) CreatePlaylist(playlist model.Playlist) (*model.Playlist, error) {
	playlist.Id = xid.New().String()
	_, err := db.Exec("INSERT IGNORE INTO playlist (id,name,query,user_id) VALUES(?,?,?,?)", playlist.Id, playlist.Name, playlist.Query, playlist.User.Id)
	if err != nil {
		log.Error(err)
	}
	return &playlist, err
}

func (db *DB) CreateIfNotExistsPlaylist(playlist model.Playlist) (*model.Playlist, error) {
	existingPlaylist, findErr := db.FindPlaylistByName(playlist.Name, playlist.User.Id)
	if findErr == nil {
		return existingPlaylist, findErr
	}
	playlist.Id = xid.New().String()
	_, err := db.Exec("INSERT INTO playlist (id,name,query,user_id) VALUES(?,?,?,?)", playlist.Id, playlist.Name, playlist.Query, playlist.User.Id)
	if err != nil {
		log.Error(err)
	}
	return &playlist, err
}

func (db *DB) UpdatePlaylist(playlist model.Playlist) (*model.Playlist, error) {
	_, err := db.Exec("UPDATE playlist SET name=?,query=? WHERE id=?", playlist.Name, playlist.Query, playlist.Id)
	return &playlist, err
}

func (db *DB) DeletePlaylist(id string, user_id string) error {
	_, err := db.Exec("DELETE FROM playlist_song WHERE playlist_id=?", id)
	if err == nil {
		_, err = db.Exec("DELETE FROM playlist WHERE id=? AND user_id=?", id, user_id)
	}
	return err
}

func (db *DB) FindPlaylistById(id string, user_id string) (*model.Playlist, error) {
	playlist := new(model.Playlist)
	err := db.QueryRow("SELECT id,name,query FROM playlist WHERE id=? AND user_id=?", id, user_id).Scan(&playlist.Id, &playlist.Name, &playlist.Query)
	if err != nil {
		log.Error(err)
	}
	return playlist, err
}

func (db *DB) FindPlaylistByName(name string, user_id string) (*model.Playlist, error) {
	playlist := new(model.Playlist)
	err := db.QueryRow("SELECT id,name,query FROM playlist WHERE name=? AND user_id=?", name, user_id).Scan(&playlist.Id, &playlist.Name, &playlist.Query)
	if err != nil {
		return playlist, err
	}
	return playlist, err
}

func (db *DB) FindAllPlaylists(user_id string, paging model.Paging) ([]*model.Playlist, int, error) {
	orderAndLimit, limit := createOrderAndLimitForPlaylist(paging)
	rows, err := db.Query("SELECT id, name, query FROM playlist WHERE user_id=?"+orderAndLimit, user_id)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	playlists := make([]*model.Playlist, 0)
	for rows.Next() {
		playlist := new(model.Playlist)
		err := rows.Scan(&playlist.Id, &playlist.Name, &playlist.Query)
		if err != nil {
			log.Error(err)
		}
		playlists = append(playlists, playlist)
	}
	if err = rows.Err(); err != nil {
		log.Error(err)
	}
	total := len(playlists)
	if limit {
		total = db.countRows("SELECT COUNT(*) FROM playlist WHERE user_id=?", user_id)
	}
	return playlists, total, err
}

func (db *DB) AddSongsToPlaylist(playlistId string, songIds []string) int {
	var count int
	tx, err := db.Begin()
	if err != nil {
		log.Errorf("Error beginning transaction: %v", err)
	}
	defer tx.Rollback()
	for _, songId := range songIds {
		_, err := tx.Exec("INSERT IGNORE INTO playlist_song (playlist_id,song_id) VALUES(?,?)", playlistId, songId)
		if err != nil {
			log.Error(err)
		} else {
			count++
		}
	}
	tx.Commit()
	return count
}

func (db *DB) RemoveSongsFromPlaylist(playlistId string, songIds []string) int {
	var count int
	tx, err := db.Begin()
	if err != nil {
		log.Errorf("Error beginning transaction: %v", err)
	}
	defer tx.Rollback()
	for _, songId := range songIds {
		_, err := tx.Exec("DELETE FROM playlist_song WHERE playlist_id=? AND song_id=?", playlistId, songId)
		if err != nil {
			log.Error(err)
		} else {
			count++
		}
	}
	tx.Commit()
	return count
}

func (db *DB) SetSongsOfPlaylist(playlistId string, songIds []string) (removed int, added int) {
	tx, err := db.Begin()
	if err != nil {
		log.Errorf("Error beginning transaction: %v", err)
	}
	defer tx.Rollback()
	result, err := tx.Exec("DELETE FROM playlist_song WHERE playlist_id=?", playlistId)
	if err == nil {
		removed64, _ := result.RowsAffected()
		removed = int(removed64)
	} else {
		log.Errorf("Error removing songs from playlist %v", err)
	}
	for _, songId := range songIds {
		_, err := tx.Exec("INSERT IGNORE INTO playlist_song (playlist_id,song_id) VALUES(?,?)", playlistId, songId)
		if err != nil {
			log.Error(err)
		} else {
			added++
		}
	}
	tx.Commit()
	return
}

func createOrderAndLimitForPlaylist(paging model.Paging) (string, bool) {
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
