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
	mysql := DB{*db}
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
	rows := db.QueryRow(sql, args...)
	rows.Scan(&count)
	return count
}

// postgres can't handle ? placeholder in sql. so we have to chanbge them to $n
func sanitizePlaceholder(sql string) string {
	if configuration.Configuration(false).Database.Type == "postgres" {
		counter := 1
		for strings.Contains(sql, "?") {
			sql = strings.Replace(sql, "?", fmt.Sprintf("$%d", counter), 1)
			counter++
		}
	}
	return sql
}

func createUrl(dbParam model.Database) string {
	result := strings.Replace(dbParam.Url, "${username}", dbParam.Username, -1)
	result = strings.Replace(result, "${password}", dbParam.Password, -1)
	result = strings.Replace(result, "${schema}", dbParam.Schema, -1)
	return result
}
