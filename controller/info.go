package controller

import (
	"expvar"
	"github.com/gin-gonic/gin"
	"net/http"
)

var (
	counterInfo = expvar.NewMap("info")
)

func initInfo(r *gin.RouterGroup) {
	r.GET("/info", GetInfo)
}

func GetInfo(c *gin.Context) {
	counterInfo.Add("GET /", 1)
	info, err := infoManager.Info()
	if err == nil {
		c.JSON(http.StatusOK, info)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read info", c)
}
