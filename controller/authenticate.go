package controller

import (
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"go2music/security"
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
	user, err := security.AuthenticateRequest(authHeader, userManager)
	if err != nil {
		respondWithError(http.StatusUnauthorized, "username / password wrong", c)
		return
	}
	token, err := security.GenerateJWT(user)
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
		username, b := security.AuthenticateJWTString(authHeader)
		if b {
			user, err := security.GetPrincipal(username, userManager)
			if err == nil && (user.Role == security.UserRole || user.Role == security.AdminRole) {
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
		username, b := security.AuthenticateJWTString(c.GetHeader("Authorization"))
		if b {
			user, err := security.GetPrincipal(username, userManager)
			if err == nil && (user.Role == security.AdminRole) {
				c.Set("principal", user)
				log.Info("Authorization OK - " + username + " with role " + user.Role)
				c.Next()
				return
			}
		}
		respondWithError(http.StatusUnauthorized, "Unauthorized", c)
	}
}