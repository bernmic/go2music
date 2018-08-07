package service

import (
	"database/sql"
	"fmt"
	"log"
	"time"
)

var Database *sql.DB

func InitializeDatabase(dbtype, user, password, dbname string) *sql.DB {
	db, err := sql.Open(dbtype, fmt.Sprintf("%s:%s@%s", user, password, dbname))
	if err != nil {
		log.Print("Error opening service " + dbname)
		panic(fmt.Sprintf("%v", err))
	}
	Database = db
	InitializeArtist()
	InitializeAlbum()
	InitializeSong()
	InitializePlaylist()
	log.Print("Database initialized....")

	go syncWithFilesystem(db)

	return db
}

func syncWithFilesystem(db *sql.DB) {
	log.Print("Start scanning filesystem....")
	start := time.Now()
	result := Filescanner("d:/music", ".mp3")
	log.Printf("Found %d files with extension %s in %f seconds", len(result), ".mp3", time.Since(start).Seconds())
	log.Print("Start sync found files with service...")
	start = time.Now()
	ID3Reader(result)
	log.Printf("Sync finished...in %f seconds", time.Since(start).Seconds())
}
