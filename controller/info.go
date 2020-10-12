package controller

import (
	"expvar"
	"go2music/model"
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
	r.GET("/info/year/:year/songs", getSongsForYear)
	r.GET("/info/genres", getGenres)
	r.GET("/info/genres/:genre/songs", getSongsForGenre)
}

func getInfo(c *gin.Context) {
	counterInfo.Add("GET /", 1)
	info, err := databaseAccess.InfoManager.Info()
	if err == nil {
		c.JSON(http.StatusOK, info)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read info", c)
}

func getDecades(c *gin.Context) {
	counterInfo.Add("GET /decades", 1)
	decades, err := databaseAccess.InfoManager.GetDecades()
	if err == nil {
		c.JSON(http.StatusOK, decades)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read decades", c)
}

func getYears(c *gin.Context) {
	counterInfo.Add("GET /decades/:decade", 1)
	decade := c.Param("decade")
	years, err := databaseAccess.InfoManager.GetYears(decade)
	if err == nil {
		c.JSON(http.StatusOK, years)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read years", c)
}

func getGenres(c *gin.Context) {
	counterInfo.Add("GET /genres", 1)
	genres, err := databaseAccess.InfoManager.GetGenres()
	if err == nil {
		c.JSON(http.StatusOK, genres)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read genres", c)
}

func getSongsForYear(c *gin.Context) {
	counterInfo.Add("GET /year/:year/songs", 1)
	paging := extractPagingFromRequest(c)
	year := c.Param("year")
	songs, total, err := databaseAccess.SongManager.FindSongsByYear(year, paging)
	if err == nil {
		var description string
		if len(songs) > 0 {
			description = "Year: " + songs[0].YearPublished
		}
		songCollection := model.SongCollection{Songs: songs, Description: description, Paging: paging, Total: total}
		c.JSON(http.StatusOK, songCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read songs", c)
}

func getSongsForGenre(c *gin.Context) {
	counterInfo.Add("GET /genres/:genre/songs", 1)
	paging := extractPagingFromRequest(c)
	genre := c.Param("genre")
	songs, total, err := databaseAccess.SongManager.FindSongsByGenre(genre, paging)
	if err == nil {
		var description string
		if len(songs) > 0 {
			description = "Genre: " + songs[0].Genre
		}
		songCollection := model.SongCollection{Songs: songs, Description: description, Paging: paging, Total: total}
		c.JSON(http.StatusOK, songCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read songs", c)
}
