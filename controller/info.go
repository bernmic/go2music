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
	r.GET("/info/decades", getDecades)
	r.GET("/info/decades/:decade", getYears)
	r.GET("/info/genres", getGenres)
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

func getDecades(c *gin.Context) {
	counterInfo.Add("GET /decades", 1)
	decades, err := infoManager.GetDecades()
	if err == nil {
		c.JSON(http.StatusOK, decades)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read decades", c)
}

func getYears(c *gin.Context) {
	counterInfo.Add("GET /decades/:decade", 1)
	decade := c.Param("decade")
	years, err := infoManager.GetYears(decade)
	if err == nil {
		c.JSON(http.StatusOK, years)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read years", c)
}

func getGenres(c *gin.Context) {
	counterInfo.Add("GET /genres", 1)
	genres, err := infoManager.GetGenres()
	if err == nil {
		c.JSON(http.StatusOK, genres)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read genres", c)
}
