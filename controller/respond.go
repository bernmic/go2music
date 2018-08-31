package controller

import (
	"github.com/gin-gonic/gin"
)

func respondWithError(code int, message string, c *gin.Context) {
	c.JSON(code, gin.H{"message": message})
	c.Abort()
}
