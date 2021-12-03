package postgres

import (
	"database/sql"
	"flag"
	"fmt"
	"os"
	"testing"
)

var testDatabase DB

func TestMain(m *testing.M) {
	// Pretend to open our DB connection
	url := os.Getenv("DATABASE_URL")
	if url == "" {
		return
	}

	db, err := sql.Open("postgres", url)
	if err != nil {
		fmt.Printf("Error opening service " + url)
		panic(fmt.Sprintf("%v", err))
	}
	if err := db.Ping(); err != nil {
		fmt.Printf("Error accessing database: %v\n", err)
		os.Exit(1)
	}
	testDatabase = DB{db}
	cleanDatabase(db)

	testDatabase.initializeUser()
	testDatabase.initializeArtist()
	testDatabase.initializeAlbum()
	testDatabase.initializeSong()
	testDatabase.initializePlaylist()

	flag.Parse()
	exitCode := m.Run()

	// Pretend to close our DB connection
	testDatabase.DB.Close()

	// Exit
	os.Exit(exitCode)
}

func cleanDatabase(db *sql.DB) {
	_, err := db.Exec("DROP TABLE IF EXISTS playlist_song, playlist, song, album, artist, user")
	if err != nil {
		fmt.Printf("Error dopping tables: %v\n", err)
	}
}

func chechTableExists(tableName string) bool {
	_, err := testDatabase.Query("SELECT 1 FROM " + tableName + " LIMIT 1")
	if err == nil {
		return true
	}
	return false
}
