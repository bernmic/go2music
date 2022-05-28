package controller

import (
	"go2music/auth"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func initAuthentication(r *gin.RouterGroup) {
	r.POST("/api/authenticate", authenticate)
	r.GET("/token", authenticate)
}

func authenticate(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		respondWithError(http.StatusUnauthorized, "missing token", c)
		return
	}
	user, err := auth.AuthenticateRequest(authHeader, databaseAccess.UserManager)
	if err != nil {
		respondWithError(http.StatusUnauthorized, "username / password wrong", c)
		return
	}
	token, err := auth.GenerateTokenForUser(user)
	if err != nil {
		respondWithError(http.StatusInternalServerError, "unknown error", c)
		return
	}
	c.JSON(http.StatusOK, gin.H{"token": token, "role": user.Role})
}

// TokenAuthMiddleware checks requests against user or admin role.
func TokenAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			bearer := c.Request.URL.Query().Get("bearer")
			//bearer := c.Query("bearer")
			if bearer != "" {
				authHeader = "Bearer " + bearer
			}
		}
		user, err := auth.ValidateUser(strings.SplitN(authHeader, " ", 2)[1])
		if err == nil && (user.Role == auth.UserRole || user.Role == auth.AdminRole) {
			c.Set("principal", user)
			log.Println("INFO Authorization OK - " + user.Username + " with role " + user.Role)
			c.Next()
			return
		}
		respondWithError(http.StatusUnauthorized, "Unauthorized", c)
	}
}

// AdminAuthMiddleware checks requests against admin role.
func AdminAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		bearer := c.Query("bearer")
		if bearer != "" {
			c.Header("Authorization", "Bearer "+bearer)
		}

		b := strings.Split(c.GetHeader("Authorization"), " ")
		if len(b) != 2 {
			respondWithError(http.StatusUnauthorized, "Unauthorized", c)
			return
		}
		user, err := auth.ValidateUser(b[1])
		if err == nil && (user.Role == auth.UserRole || user.Role == auth.AdminRole) {
			c.Set("principal", user)
			log.Println("INFO Authorization OK - " + user.Username + " with role " + user.Role)
			c.Next()
			return
		}
		respondWithError(http.StatusUnauthorized, "Unauthorized", c)
	}
}
