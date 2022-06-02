package postgres

import (
	"database/sql"
	"errors"
	"fmt"
	"go2music/configuration"
	"go2music/database"
	"go2music/model"
	"strings"

	_ "github.com/lib/pq"
	log "github.com/sirupsen/logrus"
)

func New() (*database.DB, error) {
	c := configuration.Configuration(false)
	url := createUrl(c.Database)
	log.Infof("Use postgres database at %v", url)
	db, err := sql.Open(c.Database.Type, url)
	if err != nil {
		log.Errorf("Error opening service " + url)
		panic(fmt.Sprintf("%v", err))
	}
	if err := db.Ping(); err != nil {
		log.Errorf("Error accessing database: %v\n", err)
		return nil, errors.New("database not configured or accessible")
	}
	pg := database.DB{DB: *db, Stmt: make(map[string]string), Sanitizer: sanitizePlaceholder}
	initializeUser(&pg)
	initializeArtist(&pg)
	initializeAlbum(&pg)
	initializeSong(&pg)
	initializePlaylist(&pg)
	initializeInfo(&pg)
	log.Info("Database initialized....")

	return &pg, nil

}

func createUrl(dbParam model.Database) string {
	result := strings.Replace(dbParam.Url, "${username}", dbParam.Username, -1)
	result = strings.Replace(result, "${password}", dbParam.Password, -1)
	result = strings.Replace(result, "${schema}", dbParam.Schema, -1)
	return result
}

// postgres can't handle ? placeholder in sql. so we have to change them to $n
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
