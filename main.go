// Package main go2music
//
// the purpose of this application is to manage large MP3 libraries.
//
// Terms Of Service:
//
// there are no TOS at this moment, use at your own risk we take no responsibility
//
//	    Title: Go2Music
//	    Schemes: http, https
//	    Host: localhost
//		   BasePath: /api
//	    Version: 0.0.1
//	    License: MIT http://opensource.org/licenses/MIT
//
//	    Consumes:
//	    - application/json
//
//	    Produces:
//	    - application/json
//
// swagger:meta
package main

import (
	"errors"
	"go2music/configuration"
	"go2music/controller"
	"go2music/database"
	"go2music/install"
	"go2music/mysql"
	"go2music/postgres"
	"strconv"
	"strings"

	"github.com/jasonlvhit/gocron"
	log "github.com/sirupsen/logrus"
)

var databaseAccess database.DatabaseAccess

func main() {
	if configuration.Configuration(true).Database.Type == "" {
		log.Println("No valid configuration found. Entering installation mode on port 8080.")
		if err := install.InstallHandler(); err != nil {
			panic(err)
		}
		configuration.Configuration(true)
	}

	loglevel := configuration.Configuration(false).Application.Loglevel
	switch loglevel {
	case "panic":
		log.SetLevel(log.DebugLevel)
	case "fatal":
		log.SetLevel(log.FatalLevel)
	case "error":
		log.SetLevel(log.ErrorLevel)
	case "warn":
		log.SetLevel(log.WarnLevel)
	case "info":
		log.SetLevel(log.InfoLevel)
	case "debug":
		log.SetLevel(log.DebugLevel)
	}
	log.SetFormatter(&log.TextFormatter{
		FullTimestamp: true,
	})
	databaseAccess = database.DatabaseAccess{}
	databaseType := configuration.Configuration(false).Database.Type
	if databaseType == "mysql" {
		db, _ := mysql.New()
		databaseAccess.SongManager = db
		databaseAccess.AlbumManager = db
		databaseAccess.ArtistManager = db
		databaseAccess.PlaylistManager = db
		databaseAccess.UserManager = db
		databaseAccess.InfoManager = db
	} else if databaseType == "postgres" {
		db, _ := postgres.New()
		databaseAccess.SongManager = db
		databaseAccess.AlbumManager = db
		databaseAccess.ArtistManager = db
		databaseAccess.PlaylistManager = db
		databaseAccess.UserManager = db
		databaseAccess.InfoManager = db
	} else {
		panic(errors.New("Unknown database type " + databaseType))
	}
	log.Infof("Using bulk insert: %t", *configuration.Configuration(false).Database.UseBulkInsert)
	startCron()
	if configuration.Configuration(false).Media.SyncAtStart {
		go database.SyncWithFilesystem(&databaseAccess)
	}
	controller.Run(&databaseAccess)
}

func startCron() {
	frequency := configuration.Configuration(false).Media.Syncfrequency
	value, unit, err := parseFrequency(frequency)
	if err != nil {
		log.Errorf("Error starting sync cron job: %v", err)
		log.Infof("Start sync job every %d %s", 1, "days")
		gocron.Every(1).Days().Do(cron)
	} else {
		switch unit {
		case "s":
			log.Infof("Start sync job every %d %s", value, "seconds")
			gocron.Every(value).Seconds().Do(cron)
		case "m":
			log.Infof("Start sync job every %d %s", value, "minutes")
			gocron.Every(value).Minutes().Do(cron)
		case "h":
			log.Infof("Start sync job every %d %s", value, "hours")
			gocron.Every(value).Hours().Do(cron)
		case "d":
			log.Infof("Start sync job every %d %s", value, "days")
			gocron.Every(value).Days().Do(cron)
		}
	}
	gocron.Start()
}

func cron() {
	database.SyncWithFilesystem(&databaseAccess)
}

func parseFrequency(f string) (uint64, string, error) {
	if len(f) < 2 {
		return 0, "", errors.New("illegal format")
	}
	valPart := f[:len(f)-1]
	unitPart := f[len(f)-1:]
	if len(valPart) == 0 || len(unitPart) == 0 || !strings.Contains("smhd", unitPart) {
		return 0, "", errors.New("illegal format")
	}
	value, err := strconv.Atoi(valPart)
	return uint64(value), unitPart, err
}
