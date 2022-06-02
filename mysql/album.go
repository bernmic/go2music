package mysql

import (
	"fmt"
	log "github.com/sirupsen/logrus"
	"go2music/database"
)

func initializeAlbum(db *database.DB) {
	db.Stmt["sqlAlbumExists"] = database.SqlAlbumExists
	db.Stmt["sqlAlbumCreate"] = database.SqlAlbumCreate
	db.Stmt["sqlAlbumIndexPath"] = database.SqlAlbumIndexPath
	db.Stmt["sqlAlbumIndexMbid"] = database.SqlAlbumIndexMbid
	db.Stmt["sqlAlbumInsert"] = database.SqlAlbumInsert
	db.Stmt["sqlAlbumUpdate"] = database.SqlAlbumUpdate
	db.Stmt["sqlAlbumDelete"] = database.SqlAlbumDelete
	db.Stmt["sqlAlbumById"] = database.SqlAlbumById
	db.Stmt["sqlAlbumByPath"] = database.SqlAlbumByPath
	db.Stmt["sqlAlbumAll"] = database.SqlAlbumAll
	db.Stmt["sqlAlbumCount"] = database.SqlAlbumCount
	db.Stmt["sqlAlbumWithoutSong"] = database.SqlAlbumWithoutSong
	db.Stmt["sqlAlbumWithoutTitle"] = database.SqlAlbumWithoutTitle
	db.Stmt["sqlAlbumForArtist"] = database.SqlAlbumForArtist
	db.Stmt["sqlAlbumRecent"] = database.SqlAlbumRecent
	_, err := db.Query(db.Sanitizer(db.Stmt["sqlAlbumExists"]))
	if err != nil {
		log.Info("Table album does not exists. Creating now.")
		_, err := db.Exec(db.Sanitizer(db.Stmt["sqlAlbumCreate"]))
		if err != nil {
			log.Error("Error creating album table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Album Table successfully created....")
		}
		_, err = db.Exec(db.Sanitizer(db.Stmt["sqlAlbumIndexPath"]))
		if err != nil {
			log.Error("Error creating album table index for path")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on album path generated....")
		}
		_, err = db.Exec(db.Sanitizer(db.Stmt["sqlAlbumIndexMbid"]))
		if err != nil {
			log.Error("Error creating album table index for mbid")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on album mbid generated....")
		}
	}
}
