package mysql

import (
	"fmt"
	log "github.com/sirupsen/logrus"
	"go2music/database"
)

func initializeArtist(db *database.DB) {
	db.Stmt["sqlArtistExists"] = database.SqlArtistExists
	db.Stmt["sqlArtistCreate"] = database.SqlArtistCreate
	db.Stmt["sqlArtistIndexName"] = database.SqlArtistIndexName
	db.Stmt["sqlArtistIndexMbid"] = database.SqlArtistIndexMbid
	db.Stmt["sqlArtistInsert"] = database.SqlArtistInsert
	db.Stmt["sqlArtistUpdate"] = database.SqlArtistUpdate
	db.Stmt["sqlArtistDelete"] = database.SqlArtistDelete
	db.Stmt["sqlArtistById"] = database.SqlArtistById
	db.Stmt["sqlArtistByName"] = database.SqlArtistByName
	db.Stmt["sqlArtistAll"] = database.SqlArtistAll
	db.Stmt["sqlArtistCount"] = database.SqlArtistCount
	db.Stmt["sqlArtistWithoutName"] = database.SqlArtistWithoutName
	_, err := db.Query(db.Sanitizer(db.Stmt["sqlArtistExists"]))
	if err != nil {
		log.Info("Table artist does not exists. Creating now.")
		_, err := db.Exec(db.Sanitizer(db.Stmt["sqlArtistCreate"]))
		if err != nil {
			log.Error("Error creating artist table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Artist Table successfully created....")
		}
		_, err = db.Exec(db.Sanitizer(db.Stmt["sqlArtistIndexName"]))
		if err != nil {
			log.Error("Error creating artist table index for name")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on artist name generated....")
		}
		_, err = db.Exec(db.Sanitizer(db.Stmt["sqlArtistIndexMbid"]))
		if err != nil {
			log.Error("Error creating artist table index for mbid")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on artist mbid generated....")
		}
	}
}
