package controller

import (
	"expvar"
	"go2music/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

var (
	counterArtist = expvar.NewMap("artist")
)

func initArtist(r *gin.RouterGroup) {
	r.GET("/artist", GetArtists)
	r.GET("/artist/:id", GetArtist)
	r.GET("/artist/:id/songs", GetSongForArtist)
	r.GET("/artist/:id/albums", GetAlbumsForArtist)
}

func GetArtists(c *gin.Context) {
	counterArtist.Add("GET /", 1)
	paging := extractPagingFromRequest(c)
	filter := extractFilterFromRequest(c)

	artists, total, err := artistManager.FindAllArtists(filter, paging)
	if err == nil {
		artistCollection := model.ArtistCollection{Artists: artists, Paging: paging, Total: total}
		c.JSON(http.StatusOK, artistCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read artists", c)
}

func GetArtist(c *gin.Context) {
	counterArtist.Add("GET /:id", 1)
	id := c.Param("id")
	artist, err := artistManager.FindArtistById(id)
	if err != nil {
		respondWithError(http.StatusNotFound, "artist not found", c)
		return
	}
	c.JSON(http.StatusOK, artist)
}

func GetSongForArtist(c *gin.Context) {
	counterArtist.Add("GET /:id/songs", 1)
	id := c.Param("id")
	paging := extractPagingFromRequest(c)
	songs, total, err := songManager.FindSongsByArtistId(id, paging)
	if err == nil {
		var description string
		if len(songs) > 0 {
			description = "Artist: " + songs[0].Artist.Name
		}
		songCollection := model.SongCollection{Songs: songs, Description: description, Paging: paging, Total: total}
		c.JSON(http.StatusOK, songCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read songs", c)
}

func GetAlbumsForArtist(c *gin.Context) {
	counterArtist.Add("GET /:id/albums", 1)
	id := c.Param("id")
	albums, err := albumManager.FindAlbumsForArtist(id)
	if err == nil {
		c.JSON(http.StatusOK, albums)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read albums", c)
}
