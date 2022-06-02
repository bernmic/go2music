package postgres

import (
	"fmt"
	log "github.com/sirupsen/logrus"
	"go2music/database"
)

func initializePlaylist(db *database.DB) {
	db.Stmt["sqlPlaylistExists"] = database.SqlPlaylistExists
	db.Stmt["sqlPlaylistCreate"] = database.SqlPlaylistCreate
	db.Stmt["sqlPlaylistIndexName"] = database.SqlPlaylistIndexName
	db.Stmt["sqlPlaylistSongExists"] = database.SqlPlaylistSongExists
	db.Stmt["sqlPlaylistSongCreate"] = database.SqlPlaylistSongCreate
	db.Stmt["sqlPlaylistInsert"] = database.SqlPlaylistInsert
	db.Stmt["sqlPlaylistUpdate"] = database.SqlPlaylistUpdate
	db.Stmt["sqlPlaylistDelete"] = database.SqlPlaylistDelete
	db.Stmt["sqlPlaylistSongDeleteAll"] = database.SqlPlaylistSongDeleteAll
	db.Stmt["sqlPlaylistById"] = database.SqlPlaylistById
	db.Stmt["sqlPlaylistByName"] = database.SqlPlaylistByName
	db.Stmt["sqlPlaylistByUserId"] = database.SqlPlaylistByUserId
	db.Stmt["sqlPlaylistCountByUserId"] = database.SqlPlaylistCountByUserId
	db.Stmt["sqlPlaylistAll"] = database.SqlPlaylistAll
	db.Stmt["sqlPlaylistCount"] = database.SqlPlaylistCount
	db.Stmt["sqlPlaylistSongInsert"] = database.SqlPlaylistSongInsert
	db.Stmt["sqlPlaylistSongDelete"] = database.SqlPlaylistSongDelete
	_, err := db.Query(db.Sanitizer(db.Stmt["sqlPlaylistExists"]))
	if err != nil {
		log.Info("Table playlist does not exists. Creating now.")
		_, err := db.Exec(db.Sanitizer(db.Stmt["sqlPlaylistCreate"]))
		if err != nil {
			log.Error("Error creating playlist table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Playlist Table successfully created....")
		}
		_, err = db.Exec(db.Sanitizer(db.Stmt["sqlPlaylistIndexName"]))
		if err != nil {
			log.Error("Error creating playlist table index for name")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on name generated....")
		}
		_, err = db.Query(db.Sanitizer(db.Stmt["sqlPlaylistSongExists"]))
		if err != nil {
			log.Info("Table playlist_song does not exists. Creating now.")
			_, err := db.Exec(db.Sanitizer(db.Stmt["sqlPlaylistSongCreate"]))
			if err != nil {
				log.Error("Error creating playlist_song table")
				panic(fmt.Sprintf("%v", err))
			} else {
				log.Info("Playlist_song Table successfully created....")
			}
		}
	}
}
