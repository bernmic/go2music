package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"go2music/service"
	"net/http"
)

var router *gin.Engine

func init() {
	gin.SetMode(service.GetConfiguration().Application.Mode)
	router = gin.Default()
	gin.Logger()
	router.GET("/", func(c *gin.Context) {
		c.Redirect(http.StatusMovedPermanently, "/static/index.html")
	})
	router.GET("/index.html", func(c *gin.Context) {
		c.Redirect(http.StatusMovedPermanently, "/static/index.html")
	})
	router.Static("/static", "./static")
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

func Run() {
	serverAddress := fmt.Sprintf(":%d", service.GetConfiguration().Server.Port)
	router.Run(serverAddress)
}
