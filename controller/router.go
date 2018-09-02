package controller

import (
	"fmt"
	"github.com/gin-gonic/contrib/ginrus"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"go2music/model"
	"go2music/service"
	"io/ioutil"
	"strings"
	"time"
)

var (
	router          *gin.Engine
	database        *service.DB
	albumManager    model.AlbumManager
	artistManager   model.ArtistManager
	playlistManager model.PlaylistManager
	songManager     model.SongManager
	userManager     model.UserManager
)

func initRouter() {
	gin.SetMode(service.Configuration().Application.Mode)

	router = gin.New()
	router.Use(ginrus.Ginrus(logrus.New(), time.RFC3339, false))
	router.Use(gin.Recovery())
	staticRoutes("/", "./static", &router.RouterGroup)
	router.Static("/assets", "./static/assets")

	initAuthentication()

	api := router.Group("/api/")
	api.Use(TokenAuthMiddleware())
	{
		initAlbum(api)
		initArtist(api)
		initSong(api)
		initPlaylist(api)
	}

	admin := router.Group("/api/admin/")
	admin.Use(AdminAuthMiddleware())
	{
		initUser(admin)
	}
}

func Run(db *service.DB) {
	database = db
	albumManager = db
	artistManager = db
	playlistManager = db
	songManager = db
	userManager = db
	initRouter()
	serverAddress := fmt.Sprintf(":%d", service.Configuration().Server.Port)
	router.Run(serverAddress)
}

/*
	Add all files (not dirs) unter root to routergroup with relativepath
    if there is an index.html, add a route from relative path to it
*/
func staticRoutes(relativePath, root string, r *gin.RouterGroup) {
	files, err := ioutil.ReadDir(root)
	if err == nil {
		if !strings.HasSuffix(relativePath, "/") {
			relativePath += "/"
		}
		if !strings.HasSuffix(root, "/") {
			root += "/"
		}
		for _, file := range files {
			if !file.IsDir() {
				r.StaticFile(relativePath+file.Name(), root+file.Name())
				if file.Name() == "index.html" {
					r.StaticFile(relativePath, root+file.Name())
				}
			}
		}
	} else {
		logrus.Warn("directory not found: " + root)
	}
}
