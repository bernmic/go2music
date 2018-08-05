package main

import (
	"go2music/route"
	"go2music/service"
	"os"
)

func main() {
	dbuser := os.Getenv("GO2MUSIC_DBUSERNAME")
	if dbuser == "" {
		dbuser = "go2music"
	}
	dbpass := os.Getenv("GO2MUSIC_DBPASSWORD")
	if dbpass == "" {
		dbpass = "go2music"
	}
	dburl := os.Getenv("GO2MUSIC_DBURL")
	if dburl == "" {
		//dburl = "tcp(newmedia:3307)/go2music"
		dburl = "tcp(beethoven:3306)/go2music"
	}
	dbtype := os.Getenv("GO2MUSIC_DBTYPE")
	if dbtype == "" {
		dbtype = "mysql"
	}
	service.InitializeDatabase(dbtype, dbuser, dbpass, dburl)
	route.Run(":8080")
}
