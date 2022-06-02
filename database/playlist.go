package database

import (
	"fmt"
	"github.com/rs/xid"
	log "github.com/sirupsen/logrus"
	"go2music/model"
)

// PlaylistManager defines all database functions for playlists
type PlaylistManager interface {
	CreatePlaylist(playlist model.Playlist) (*model.Playlist, error)
	CreateIfNotExistsPlaylist(playlist model.Playlist) (*model.Playlist, error)
	UpdatePlaylist(playlist model.Playlist) (*model.Playlist, error)
	DeletePlaylist(id string, userId string) error
	FindPlaylistById(id string, userId string) (*model.Playlist, error)
	FindPlaylistByName(name string, userId string) (*model.Playlist, error)
	FindAllPlaylistsOfKind(userId string, kind string, paging model.Paging) ([]*model.Playlist, int, error)
	AddSongsToPlaylist(playlistId string, songIds []string) int
	RemoveSongsFromPlaylist(playlistId string, songIds []string) int
	SetSongsOfPlaylist(playlistId string, songIds []string) (int, int)
}

const (
	SqlPlaylistExists = "SELECT 1 FROM playlist LIMIT 1"
	SqlPlaylistCreate = `
	CREATE TABLE IF NOT EXISTS playlist (
		id varchar(32),
		name VARCHAR(255) NOT NULL,
		query VARCHAR(255) NOT NULL,
		user_id varchar(32) NOT NULL,
		PRIMARY KEY (id),
		FOREIGN KEY (user_id) REFERENCES guser(id)
		);
	`
	SqlPlaylistIndexName  = "CREATE UNIQUE INDEX playlist_name ON playlist (name)"
	SqlPlaylistSongExists = "SELECT 1 FROM playlist_song LIMIT 1"
	SqlPlaylistSongCreate = `
	CREATE TABLE IF NOT EXISTS playlist_song (
		playlist_id varchar(32) NOT NULL,
		song_id varchar(32) NOT NULL,
		PRIMARY KEY (playlist_id,song_id),
		FOREIGN KEY (playlist_id) REFERENCES playlist(id),
		FOREIGN KEY (song_id) REFERENCES song(id)
		);
	`
	SqlPlaylistInsert        = "INSERT INTO playlist (id,name,query,user_id) VALUES(?,?,?,?)"
	SqlPlaylistUpdate        = "UPDATE playlist SET name=?,query=? WHERE id=?"
	SqlPlaylistDelete        = "DELETE FROM playlist WHERE id=? AND user_id=?"
	SqlPlaylistSongDeleteAll = "DELETE FROM playlist_song WHERE playlist_id=?"
	SqlPlaylistById          = "SELECT id,name,query FROM playlist WHERE id=? AND user_id=?"
	SqlPlaylistByName        = "SELECT id,name,query FROM playlist WHERE name=? AND user_id=?"
	SqlPlaylistByUserId      = "SELECT id, name, query FROM playlist WHERE user_id=?"
	SqlPlaylistCountByUserId = "SELECT COUNT(*) FROM playlist WHERE user_id=?"
	SqlPlaylistAll           = "SELECT id,name,query FROM playlist"
	SqlPlaylistCount         = "SELECT COUNT(*) FROM playlist"
	SqlPlaylistSongInsert    = "INSERT IGNORE INTO playlist_song (playlist_id,song_id) VALUES(?,?)"
	SqlPlaylistSongDelete    = "DELETE FROM playlist_song WHERE playlist_id=? AND song_id=?"
)

// CreatePlaylist create a new playlist in the database
func (db *DB) CreatePlaylist(playlist model.Playlist) (*model.Playlist, error) {
	playlist.Id = xid.New().String()
	_, err := db.Exec(db.Sanitizer(db.Stmt["sqlPlaylistInsert"]), playlist.Id, playlist.Name, playlist.Query, playlist.User.Id)
	if err != nil {
		log.Error(err)
	}
	return &playlist, err
}

// CreateIfNotExistsPlaylist create a new playlist in the database if the name is not found in the database
func (db *DB) CreateIfNotExistsPlaylist(playlist model.Playlist) (*model.Playlist, error) {
	existingPlaylist, findErr := db.FindPlaylistByName(playlist.Name, playlist.User.Id)
	if findErr == nil {
		return existingPlaylist, findErr
	}
	playlist.Id = xid.New().String()
	_, err := db.Exec(db.Sanitizer(db.Stmt["sqlPlaylistInsert"]), playlist.Id, playlist.Name, playlist.Query, playlist.User.Id)
	if err != nil {
		log.Error(err)
	}
	return &playlist, err
}

// UpdatePlaylist update the given playlist in the database
func (db *DB) UpdatePlaylist(playlist model.Playlist) (*model.Playlist, error) {
	_, err := db.Exec(db.Sanitizer(db.Stmt["sqlPlaylistUpdate"]), playlist.Name, playlist.Query, playlist.Id)
	return &playlist, err
}

// DeletePlaylist delete the playlist with the id in the database
func (db *DB) DeletePlaylist(id string, userId string) error {
	_, err := db.Exec(db.Sanitizer(db.Stmt["sqlPlaylistSongDeleteAll"]), id)
	if err == nil {
		_, err = db.Exec(db.Sanitizer(db.Stmt["sqlPlaylistDelete"]), id, userId)
	}
	return err
}

// FindPlaylistById get the playlist with the given id
func (db *DB) FindPlaylistById(id string, userId string) (*model.Playlist, error) {
	playlist := new(model.Playlist)
	err := db.QueryRow(db.Sanitizer(db.Stmt["sqlPlaylistById"]), id, userId).Scan(&playlist.Id, &playlist.Name, &playlist.Query)
	if err != nil {
		log.Error(err)
	}
	return playlist, err
}

// FindPlaylistByName get the playlist with the given name
func (db *DB) FindPlaylistByName(name string, userId string) (*model.Playlist, error) {
	playlist := new(model.Playlist)
	err := db.QueryRow(db.Sanitizer(db.Stmt["sqlPlaylistByName"]), name, userId).Scan(&playlist.Id, &playlist.Name, &playlist.Query)
	if err != nil {
		return playlist, err
	}
	return playlist, err
}

// FindAllPlaylistsOfKind finds all playlist of kind "static" or "dynamic"
func (db *DB) FindAllPlaylistsOfKind(userId string, kind string, paging model.Paging) ([]*model.Playlist, int, error) {
	orderAndLimit, limit := createOrderAndLimitForPlaylist(paging)
	where := ""
	switch kind {
	case "static":
		where = " AND query IS NULL OR query=''"
	case "dynamic":
		where = " AND query IS NOT NULL AND query!=''"
	}
	rows, err := db.Query(db.Sanitizer(db.Stmt["sqlPlaylistByUserId"])+where+orderAndLimit, userId)
	if err != nil {
		log.Errorf("Error get playlists of kind %s: %v", kind, err)
		return nil, 0, err
	}
	defer func() {
		err := rows.Close()
		if err != nil {
			log.Errorf("error closing rows in playlists: %v", err)
		}
	}()
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
		total = db.countRows(db.Sanitizer(db.Stmt["sqlPlaylistCountByUserId"])+where, userId)
	}
	return playlists, total, err
}

// AddSongsToPlaylist adds the songs to the static playlist with the given id
func (db *DB) AddSongsToPlaylist(playlistId string, songIds []string) int {
	var count int
	tx, err := db.Begin()
	if err != nil {
		log.Errorf("Error beginning transaction: %v", err)
	}
	defer func() {
		err = tx.Rollback()
		if err != nil {
			log.Errorf("error rolling back adding songs for playlist")
		}
	}()
	for _, songId := range songIds {
		_, err := tx.Exec(db.Sanitizer(db.Stmt["sqlPlaylistSongInsert"]), playlistId, songId)
		if err != nil {
			log.Error(err)
		} else {
			count++
		}
	}
	err = tx.Commit()
	if err != nil {
		log.Errorf("error committing adding songs for playlist")
	}
	return count
}

// RemoveSongsFromPlaylist removes the songs from the static playlist with the given id
func (db *DB) RemoveSongsFromPlaylist(playlistId string, songIds []string) int {
	var count int
	tx, err := db.Begin()
	if err != nil {
		log.Errorf("Error beginning transaction: %v", err)
	}
	defer func() {
		err = tx.Rollback()
		if err != nil {
			log.Errorf("error rolling back removing songs for playlist")
		}
	}()
	for _, songId := range songIds {
		_, err := tx.Exec(db.Sanitizer(db.Stmt["sqlPlaylistSongDelete"]), playlistId, songId)
		if err != nil {
			log.Error(err)
		} else {
			count++
		}
	}
	err = tx.Commit()
	if err != nil {
		log.Errorf("error committing removing songs for playlist")
	}
	return count
}

// SetSongsOfPlaylist replaces all songs from the static playlist with the new songs
func (db *DB) SetSongsOfPlaylist(playlistId string, songIds []string) (removed int, added int) {
	tx, err := db.Begin()
	if err != nil {
		log.Errorf("Error beginning transaction: %v", err)
	}
	defer func() {
		err = tx.Rollback()
		if err != nil {
			log.Errorf("error rolling back setting songs for playlist")
		}
	}()
	result, err := tx.Exec(db.Sanitizer(db.Stmt["sqlPlaylistSongDeleteAll"]), playlistId)
	if err == nil {
		removed64, _ := result.RowsAffected()
		removed = int(removed64)
	} else {
		log.Errorf("Error removing songs from playlist %v", err)
	}
	for _, songId := range songIds {
		_, err := tx.Exec(db.Sanitizer(db.Stmt["sqlPlaylistSongInsert"]), playlistId, songId)
		if err != nil {
			log.Error(err)
		} else {
			added++
		}
	}
	err = tx.Commit()
	if err != nil {
		log.Errorf("error committing setting songs for playlist")
	}
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
