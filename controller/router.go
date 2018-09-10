package controller

import (
	"fmt"
	"github.com/gin-gonic/contrib/expvar"
	"github.com/gin-gonic/contrib/ginrus"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"go2music/configuration"
	"go2music/database"
	"go2music/mysql"
	"io/ioutil"
	"net/http"
	"strings"
	"time"
)

var (
	router          *gin.Engine
	db              *mysql.DB
	albumManager    database.AlbumManager
	artistManager   database.ArtistManager
	playlistManager database.PlaylistManager
	songManager     database.SongManager
	userManager     database.UserManager
)

func initRouter() {
	gin.SetMode(configuration.Configuration().Application.Mode)

	router = gin.New()
	if configuration.Configuration().Application.Cors == "all" {
		router.Use(CorsMiddleware())
	}

	router.Use(ginrus.Ginrus(log.New(), time.RFC3339, false))
	router.Use(gin.Recovery())

	router.GET("/debug/vars", expvar.Handler())

	staticRoutes("/", "./static", &router.RouterGroup)
	router.Static("/assets", "./static/assets")

	initAuthentication(&router.RouterGroup)

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

func Run(dbi *mysql.DB) {
	db = dbi
	albumManager = db
	artistManager = db
	playlistManager = db
	songManager = db
	userManager = db
	initRouter()
	serverAddress := fmt.Sprintf(":%d", configuration.Configuration().Server.Port)
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
		log.Warn("directory not found: " + root)
	}
}

func CorsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Authorization, Content-type")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, HEAD")
		if c.Request.Method == "OPTIONS" {
			c.Data(http.StatusOK, "text/plain", nil)
			c.Abort()
		}
		c.Next()
	}
}
