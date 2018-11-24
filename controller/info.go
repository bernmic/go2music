package controller

import (
	"expvar"
	"net/http"

	"github.com/gin-gonic/gin"
)

var (
	counterInfo = expvar.NewMap("info")
)

func initInfo(r *gin.RouterGroup) {
	r.GET("/info", getInfo)
}

func getInfo(c *gin.Context) {
	counterInfo.Add("GET /", 1)
	info, err := infoManager.Info()
	if err == nil {
		c.JSON(http.StatusOK, info)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read info", c)
}
