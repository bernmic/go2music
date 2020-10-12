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
	r.GET("/artist", getArtists)
	r.GET("/artist/:id", getArtist)
	r.GET("/artist/:id/songs", getSongForArtist)
	r.GET("/artist/:id/albums", getAlbumsForArtist)
}

func getArtists(c *gin.Context) {
	counterArtist.Add("GET /", 1)
	paging := extractPagingFromRequest(c)
	filter := extractFilterFromRequest(c)

	artists, total, err := databaseAccess.ArtistManager.FindAllArtists(filter, paging)
	if err == nil {
		artistCollection := model.ArtistCollection{Artists: artists, Paging: paging, Total: total}
		c.JSON(http.StatusOK, artistCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read artists", c)
}

func getArtist(c *gin.Context) {
	counterArtist.Add("GET /:id", 1)
	id := c.Param("id")
	artist, err := databaseAccess.ArtistManager.FindArtistById(id)
	if err != nil {
		respondWithError(http.StatusNotFound, "artist not found", c)
		return
	}
	c.JSON(http.StatusOK, artist)
}

func getSongForArtist(c *gin.Context) {
	counterArtist.Add("GET /:id/songs", 1)
	id := c.Param("id")
	paging := extractPagingFromRequest(c)
	songs, total, err := databaseAccess.SongManager.FindSongsByArtistId(id, paging)
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

func getAlbumsForArtist(c *gin.Context) {
	counterArtist.Add("GET /:id/albums", 1)
	id := c.Param("id")
	albums, err := databaseAccess.AlbumManager.FindAlbumsForArtist(id)
	if err == nil {
		c.JSON(http.StatusOK, albums)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read albums", c)
}
