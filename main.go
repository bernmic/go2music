package main

import (
	log "github.com/sirupsen/logrus"
	"go2music/controller"
	"go2music/service"
)

func main() {
	loglevel := service.GetConfiguration().Application.Loglevel
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
	service.InitializeDatabase()
	controller.Run()
}
