package controller

import (
	"fmt"
	"go2music/assets"
	"go2music/configuration"
	"go2music/database"
	"go2music/metrics"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/contrib/expvar"
	"github.com/gin-gonic/contrib/ginrus"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

var (
	router         *gin.Engine
	metricsRouter  *gin.Engine
	databaseAccess *database.DatabaseAccess
)

func initRouter() {
	config := configuration.Configuration(false)
	gin.SetMode(config.Application.Mode)

	router = gin.New()
	router.Use(ginrus.Ginrus(log.New(), time.RFC3339, false))
	router.Use(gin.Recovery())
	if config.Application.Cors == "all" {
		router.Use(CorsMiddleware())
	}
	if config.Metrics.Collect {
		router.Use(metrics.PrometheusMetricsMiddleware())
	}
	router.GET("/debug/vars", expvar.Handler())

	initAuthentication(&router.RouterGroup)

	api := router.Group("/api/")
	api.Use(TokenAuthMiddleware())
	{
		initAlbum(api)
		initArtist(api)
		initSong(api)
		initPlaylist(api)
		initInfo(api)
		initTagging(api)
	}
	if config.Application.Cors == "all" {
		api.Use(CorsMiddleware())
	}

	admin := router.Group("/api/admin/")
	admin.Use(AdminAuthMiddleware())
	{
		initUser(admin)
		initConfig(admin)
		initSync(admin)
	}
	if config.Application.Cors == "all" {
		admin.Use(CorsMiddleware())
	}

	router.NoRoute(noRoute)

	if config.Metrics.Collect {
		metricsRouter = gin.New()
		metricsRouter.GET("/metrics", metrics.PrometheusHandler(databaseAccess))
		mp := fmt.Sprintf(":%d", config.Metrics.Port)
		go func() {
			log.Infof("start metrics server on port %d", config.Metrics.Port)
			err := metricsRouter.Run(mp)
			log.Errorf("error in metrics router: %v", err)
		}()
	}
}

func noRoute(c *gin.Context) {
	if c.Request.Method == http.MethodGet {
		u := c.Request.URL.Path
		if u == "/" {
			u = "/index.html"
		}
		f, err := assets.FrontendAssets.Open(u)
		if err == nil {
			b, err := io.ReadAll(f)
			if err == nil {
				// we have the static file in our assets. so we send this one.
				c.Writer.WriteHeader(http.StatusOK)
				c.Header("Content-Type", getMimeType(u))
				_, err = c.Writer.Write(b)
				if err != nil {
					log.Errorf("error writing static content: %v", err)
				}
				c.Writer.Flush()
				return
			}
		} else if !strings.HasPrefix(u, "/api/") {
			// not found but not /api. redirect to "/"
			c.Redirect(http.StatusMovedPermanently, "/")
		}
	}
}

// Run initializes and starts all controller
func Run(da *database.DatabaseAccess) {
	databaseAccess = da
	initRouter()
	port := configuration.Configuration(false).Server.Port
	serverAddress := fmt.Sprintf(":%d", port)
	log.Infof("start server on port %d", port)

	err := router.Run(serverAddress)
	if err != nil {
		log.Errorf("error in engine: %v", err)
	}
}

// CorsMiddleware creates a middleware which allows all origins, needed methods and headers for all endpoints.
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
