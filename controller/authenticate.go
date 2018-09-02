package controller

import (
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"go2music/service"
	"net/http"
)

func initAuthentication() {
	router.POST("/api/authenticate", authenticate)
	router.GET("/token", authenticate)
}

func authenticate(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		respondWithError(http.StatusUnauthorized, "missing token", c)
		return
	}
	user, err := database.AuthenticateRequest(authHeader)
	if err != nil {
		respondWithError(http.StatusUnauthorized, "username / password wrong", c)
		return
	}
	token, err := service.GenerateJWT(user)
	if err != nil {
		respondWithError(http.StatusInternalServerError, "unknown error", c)
		return
	}
	c.JSON(http.StatusOK, gin.H{"token": token})
}

func TokenAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			bearer := c.Query("bearer")
			if bearer != "" {
				authHeader = "Bearer " + bearer
			}
		}
		username, b := service.AuthenticateJWTString(authHeader)
		if b {
			user, err := database.GetPrincipal(username)
			if err == nil && (user.Role == service.UserRole || user.Role == service.AdminRole) {
				c.Set("principal", user)
				log.Println("INFO Authorization OK - " + username + " with role " + user.Role)
				c.Next()
				return
			}
		}
		respondWithError(http.StatusUnauthorized, "Unauthorized", c)
	}
}

func AdminAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		bearer := c.Query("bearer")
		if bearer != "" {
			c.Header("Authorization", "Bearer "+bearer)
		}
		username, b := service.AuthenticateJWTString(c.GetHeader("Authorization"))
		if b {
			user, err := database.GetPrincipal(username)
			if err == nil && (user.Role == service.AdminRole) {
				c.Set("principal", user)
				log.Info("Authorization OK - " + username + " with role " + user.Role)
				c.Next()
				return
			}
		}
		respondWithError(http.StatusUnauthorized, "Unauthorized", c)
	}
}
