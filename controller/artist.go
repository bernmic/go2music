package controller

import (
	"github.com/gin-gonic/gin"
	"go2music/model"
	"go2music/service"
	"net/http"
	"strconv"
)

func initArtist(r *gin.RouterGroup) {
	r.GET("/artist", GetArtists)
	r.GET("/artist/:id", GetArtist)
	r.GET("/artist/:id/songs", GetSongForArtist)
}

func GetArtists(c *gin.Context) {
	artists, err := service.FindAllArtists()
	if err == nil {
		artistCollection := model.ArtistCollection{Artists: artists}
		c.JSON(http.StatusOK, artistCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read artists", c)
}

func GetArtist(c *gin.Context) {
	idString := c.Param("id")
	id, err := strconv.ParseInt(idString, 10, 64)
	if err != nil {
		respondWithError(http.StatusBadRequest, "Invalid artist ID", c)
		return
	}
	artist, err := service.FindArtistById(id)
	if err != nil {
		respondWithError(http.StatusNotFound, "artist not found", c)
		return
	}
	c.JSON(http.StatusOK, artist)
}

func GetSongForArtist(c *gin.Context) {
	idString := c.Param("id")
	id, err := strconv.ParseInt(idString, 10, 64)
	if err != nil {
		respondWithError(http.StatusBadRequest, "Invalid artist ID", c)
		return
	}
	songs, err := service.FindSongsByArtistId(id)
	if err == nil {
		songCollection := model.SongCollection{Songs: songs, Paging: model.Paging{Page: 1, Size: len(songs)}}
		c.JSON(http.StatusOK, songCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read songs", c)
}
