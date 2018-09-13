package mysql

import (
	"database/sql"
	"errors"
	"fmt"
	log "github.com/sirupsen/logrus"
	"go2music/configuration"
	"go2music/fs"
)

type DB struct {
	sql.DB
}

var database DB

func New() (*DB, error) {
	c := configuration.Configuration()
	url := c.Database.Url + "/" + c.Database.Schema
	db, err := sql.Open(c.Database.Type, fmt.Sprintf("%s:%s@%s", c.Database.Username, c.Database.Password, url))
	if err != nil {
		log.Errorf("Error opening service " + url)
		panic(fmt.Sprintf("%v", err))
	}
	if err := db.Ping(); err != nil {
		log.Errorf("Error accessing database: %v\n", err)
		return nil, errors.New("Database not configured or accessible")
	}
	database = DB{*db}
	database.initializeUser()
	database.initializeArtist()
	database.initializeAlbum()
	database.initializeSong()
	database.initializePlaylist()
	log.Info("Database initialized....")

	go fs.SyncWithFilesystem(&database, &database, &database)

	return &database, nil
}

func Database() *DB {
	return &database
}

func (db *DB) countRows(sql string, args ...interface{}) int {
	var count int
	rows := db.QueryRow(sql, args...)
	rows.Scan(&count)
	return count
}
