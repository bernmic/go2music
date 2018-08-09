package service

import (
	"database/sql"
	"fmt"
	"log"
	"time"
)

var Database *sql.DB

func InitializeDatabase() *sql.DB {
	c := GetConfiguration()
	db, err := sql.Open(c.Database.Type, fmt.Sprintf("%s:%s@%s", c.Database.Username, c.Database.Password, c.Database.Url))
	if err != nil {
		log.Print("Error opening service " + c.Database.Url)
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
	result := Filescanner(GetConfiguration().Media.Path, ".mp3")
	log.Printf("Found %d files with extension %s in %f seconds", len(result), ".mp3", time.Since(start).Seconds())
	log.Print("Start sync found files with service...")
	start = time.Now()
	ID3Reader(result)
	log.Printf("Sync finished...in %f seconds", time.Since(start).Seconds())
}
