package mysql

import (
	"database/sql"
	"errors"
	"fmt"
	"go2music/configuration"
	"go2music/model"
	"strings"

	_ "github.com/go-sql-driver/mysql"
	log "github.com/sirupsen/logrus"
)

// DB contains the session data for a database session
type DB struct {
	sql.DB
	stmt      map[string]string
	sanitizer func(string) string
}

// New create a new mysql database session and returens it
func New() (*DB, error) {
	c := configuration.Configuration(false)
	//url := c.Database.Url + "/" + c.Database.Schema
	//db, err := sql.Open(c.Database.Type, fmt.Sprintf("%s:%s@%s", c.Database.Username, c.Database.Password, url))
	url := createUrl(c.Database)
	log.Infof("Use mysql database at %v", url)
	db, err := sql.Open(c.Database.Type, url)
	if err != nil {
		log.Errorf("Error opening service " + url)
		panic(fmt.Sprintf("%v", err))
	}
	if err := db.Ping(); err != nil {
		log.Errorf("Error accessing database: %v\n", err)
		return nil, errors.New("Database not configured or accessible")
	}
	mysql := DB{*db, make(map[string]string, 0), Sanitizer}
	mysql.initializeUser()
	mysql.initializeArtist()
	mysql.initializeAlbum()
	mysql.initializeSong()
	mysql.initializePlaylist()
	mysql.initializeInfo()
	log.Info("Database initialized....")

	return &mysql, nil
}

func (db *DB) countRows(sql string, args ...interface{}) int {
	var count int
	rows := db.QueryRow(Sanitizer(sql), args...)
	rows.Scan(&count)
	return count
}

func createUrl(dbParam model.Database) string {
	result := strings.Replace(dbParam.Url, "${username}", dbParam.Username, -1)
	result = strings.Replace(result, "${password}", dbParam.Password, -1)
	result = strings.Replace(result, "${schema}", dbParam.Schema, -1)
	return result
}

func Sanitizer(s string) string {
	return s
}
