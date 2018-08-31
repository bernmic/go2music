package service

import (
	"database/sql"
	"fmt"
	log "github.com/sirupsen/logrus"
	"os/user"
	"strings"
	"time"
)

var Database *sql.DB

func InitializeDatabase() *sql.DB {
	c := GetConfiguration()
	db, err := sql.Open(c.Database.Type, fmt.Sprintf("%s:%s@%s", c.Database.Username, c.Database.Password, c.Database.Url))
	if err != nil {
		log.Errorf("Error opening service " + c.Database.Url)
		panic(fmt.Sprintf("%v", err))
	}
	if err := db.Ping(); err != nil {
		log.Errorf("Error accessing database: %v\n", err)
		return nil
	}
	Database = db
	InitializeUser()
	InitializeArtist()
	InitializeAlbum()
	InitializeSong()
	InitializePlaylist()
	log.Info("Database initialized....")

	go syncWithFilesystem(db)

	return db
}

func syncWithFilesystem(db *sql.DB) {
	log.Info("Start scanning filesystem....")
	start := time.Now()
	path := replaceVariables(GetConfiguration().Media.Path)
	result := Filescanner(path, ".mp3")
	log.Infof("Found %d files with extension %s in %f seconds", len(result), ".mp3", time.Since(start).Seconds())
	log.Info("Start sync found files with service...")
	start = time.Now()
	ID3Reader(result)
	log.Infof("Sync finished...in %f seconds", time.Since(start).Seconds())
}

func replaceVariables(in string) string {
	homeDir := ""
	usr, err := user.Current()
	if err == nil {
		homeDir = usr.HomeDir
	}

	return strings.Replace(in, "${home}", homeDir, -1)
}
