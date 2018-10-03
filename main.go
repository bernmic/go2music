package main

import (
	log "github.com/sirupsen/logrus"
	"go2music/configuration"
	"go2music/controller"
	"go2music/fs"
	"go2music/mysql"
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

	go fs.SyncWithFilesystem(db, db, db)

	controller.Run(db)
}
