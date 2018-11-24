package controller

import (
	"expvar"
	"go2music/model"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

var (
	counterAlbum = expvar.NewMap("album")
)

func initAlbum(r *gin.RouterGroup) {
	r.GET("/album", getAlbums)
	r.GET("/album/:id", getAlbum)
	r.GET("/album/:id/songs", getSongForAlbum)
	r.GET("/album/:id/cover", getCoverForAlbum)
}

func getAlbums(c *gin.Context) {
	counterAlbum.Add("GET /", 1)
	paging := extractPagingFromRequest(c)
	filter := extractFilterFromRequest(c)
	albums, total, err := albumManager.FindAllAlbums(filter, paging)
	if err == nil {
		albumCollection := model.AlbumCollection{Albums: albums, Paging: paging, Total: total}
		c.JSON(http.StatusOK, albumCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read albums", c)
}

func getAlbum(c *gin.Context) {
	counterAlbum.Add("GET /:id", 1)
	id := c.Param("id")
	album, err := albumManager.FindAlbumById(id)
	if err != nil {
		respondWithError(http.StatusNotFound, "album not found", c)
		return
	}
	c.JSON(http.StatusOK, album)
}

func getSongForAlbum(c *gin.Context) {
	counterAlbum.Add("GET /:id/songs", 1)
	id := c.Param("id")
	paging := extractPagingFromRequest(c)
	songs, total, err := songManager.FindSongsByAlbumId(id, paging)
	if err == nil {
		var description string
		if len(songs) > 0 {
			if allSameArtist(songs) {
				description = songs[0].Artist.Name + " - " + songs[0].Album.Title
			} else {
				description = songs[0].Album.Title
			}
		}
		songCollection := model.SongCollection{Songs: songs, Description: description, Paging: paging, Total: total}
		c.JSON(http.StatusOK, songCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read songs", c)
}

func getCoverForAlbum(c *gin.Context) {
	counterAlbum.Add("GET /:id/cover", 1)
	id := c.Param("id")
	songs, _, err := songManager.FindSongsByAlbumId(id, model.Paging{Size: 1})
	if err != nil {
		respondWithError(http.StatusNotFound, "album not found", c)
		return
	}
	if len(songs) > 0 {
		image, mimetype, _ := songManager.GetCoverForSong(songs[0])

		if image != nil {
			c.Header("Content-Type", mimetype)
			c.Header("Content-Length", strconv.Itoa(len(image)))
			c.Data(http.StatusOK, mimetype, image)
			return
		}
	}
	respondWithError(http.StatusNotFound, "No cover found", c)
}

func allSameArtist(s []*model.Song) bool {
	for i := 1; i < len(s); i++ {
		if s[i].Artist.Name != s[0].Artist.Name {
			return false
		}
	}
	return true
}
