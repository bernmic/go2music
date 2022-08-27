package mysql

import (
	"database/sql"
	"fmt"
	"go2music/configuration"
	"go2music/database"
	"go2music/model"
	"strings"
	"time"

	_ "github.com/go-sql-driver/mysql"
	log "github.com/sirupsen/logrus"
)

// New create a new mysql database session and returens it
func New() (*database.DB, error) {
	c := configuration.Configuration(false)
	d, err := time.ParseDuration(c.Database.RetryDelay)
	if err != nil {
		d = time.Second * 0
	}
	//url := c.Database.Url + "/" + c.Database.Schema
	//db, err := sql.Open(c.Database.Type, fmt.Sprintf("%s:%s@%s", c.Database.Username, c.Database.Password, url))
	url := createUrl(c.Database)
	log.Infof("Use mysql database at %v", url)
	var db *sql.DB
	for i := 0; i < c.Database.RetryCounter; i++ {
		db, err = sql.Open(c.Database.Type, url)
		if err != nil {
			log.Errorf("Error opening service " + url)
			time.Sleep(d)
			continue
		}
		if err := db.Ping(); err != nil {
			log.Errorf("Error accessing database: %v\n", err)
			time.Sleep(d)
			continue
		}

	}
	if db == nil {
		return nil, fmt.Errorf("database not configured or accessible: %v", err)
	}
	mysql := database.DB{DB: *db, Stmt: make(map[string]string, 0), Sanitizer: Sanitizer}
	initializeUser(&mysql)
	initializeArtist(&mysql)
	initializeAlbum(&mysql)
	initializeSong(&mysql)
	initializePlaylist(&mysql)
	initializeInfo(&mysql)
	log.Info("Database initialized....")

	return &mysql, nil
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
