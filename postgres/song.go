package postgres

import (
	"fmt"
	log "github.com/sirupsen/logrus"
	"go2music/database"
)

func initializeSong(db *database.DB) {
	db.Stmt["sqlSongExists"] = database.SqlSongExists
	db.Stmt["sqlSongCreate"] = database.SqlSongCreate
	db.Stmt["sqlSongIndexPath"] = database.SqlSongIndexPath
	db.Stmt["sqlSongIndexMbid"] = database.SqlSongIndexMbid
	db.Stmt["sqlUserSongCreate"] = database.SqlUserSongCreate
	db.Stmt["sqlSongAll"] = database.SqlSongAll
	db.Stmt["sqlSongCount"] = database.SqlSongCount
	db.Stmt["sqlSongInsert"] = database.SqlSongInsert
	db.Stmt["sqlSongUpdate"] = database.SqlSongUpdate
	db.Stmt["sqlSongDelete"] = database.SqlSongDelete
	db.Stmt["sqlUserSongDelete"] = database.SqlUserSongDelete
	db.Stmt["sqlSongPathExists"] = database.SqlSongPathExists
	db.Stmt["sqlSongCountByAlbum"] = database.SqlSongCountByAlbum
	db.Stmt["sqlSongCountByArtist"] = database.SqlSongCountByArtist
	db.Stmt["sqlSongCountByPlaylist"] = database.SqlSongCountByPlaylist
	db.Stmt["sqlSongCountByYear"] = database.SqlSongCountByYear
	db.Stmt["sqlSongCountByGenre"] = database.SqlSongCountByGenre
	db.Stmt["sqlSongPlaycount"] = database.SqlSongPlaycount
	db.Stmt["sqlUserSongById"] = database.SqlUserSongById
	db.Stmt["sqlUserSongInsert"] = database.SqlUserSongInsert
	db.Stmt["sqlUserSongUpdate"] = database.SqlUserSongUpdate
	db.Stmt["sqlSongOnlyIdAndPath"] = database.SqlSongOnlyIdAndPath
	db.Stmt["sqlSongDuration"] = database.SqlSongDuration
	_, err := db.Query(db.Sanitizer(db.Stmt["sqlSongExists"]))
	if err != nil {
		log.Info("Table song does not exists. Creating now.")
		_, err := db.Exec(db.Sanitizer(db.Stmt["sqlSongCreate"]))
		if err != nil {
			log.Error("Error creating song table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Song Table successfully created....")
		}
		_, err = db.Exec(db.Sanitizer(db.Stmt["sqlUserSongCreate"]))
		if err != nil {
			log.Error("Error creating user_song table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("UserSong Table successfully created....")
		}
		_, err = db.Exec(db.Sanitizer(db.Stmt["sqlSongIndexPath"]))
		if err != nil {
			log.Error("Error creating song table index for path")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on song path generated....")
		}
		_, err = db.Exec(db.Sanitizer(db.Stmt["sqlSongIndexMbid"]))
		if err != nil {
			log.Error("Error creating song table index for mbid")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on song mbid generated....")
		}
	}
}
