package main

import (
	"errors"
	"github.com/jasonlvhit/gocron"
	log "github.com/sirupsen/logrus"
	"go2music/configuration"
	"go2music/controller"
	"go2music/database"
	"go2music/fs"
	"go2music/mysql"
	"strconv"
	"strings"
)

var (
	songManager     database.SongManager
	albumManager    database.AlbumManager
	artistManager   database.ArtistManager
	playlistManager database.PlaylistManager
	userManager     database.UserManager
)

func main() {
	loglevel := configuration.Configuration().Application.Loglevel
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
	db, _ := mysql.New()
	songManager = db
	albumManager = db
	artistManager = db
	playlistManager = db
	userManager = db
	startCron()
	if configuration.Configuration().Media.SyncAtStart {
		go fs.SyncWithFilesystem(albumManager, artistManager, songManager)
	}
	controller.Run(db)
}

func startCron() {
	frequency := configuration.Configuration().Media.Syncfrequency
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
	fs.SyncWithFilesystem(albumManager, artistManager, songManager)
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
