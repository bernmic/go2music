package controller

import (
	"expvar"
	"github.com/gin-gonic/gin"
	"go2music/model"
	"net/http"
	"strconv"
)

var (
	counterAlbum = expvar.NewMap("album")
)

func initAlbum(r *gin.RouterGroup) {
	r.GET("/album", GetAlbums)
	r.GET("/album/:id", GetAlbum)
	r.GET("/album/:id/songs", GetSongForAlbum)
	r.GET("/album/:id/cover", GetCoverForAlbum)
}

func GetAlbums(c *gin.Context) {
	counterAlbum.Add("GET /", 1)
	paging := extractPagingFromRequest(c)
	albums, err := albumManager.FindAllAlbums(paging)
	if err == nil {
		albumCollection := model.AlbumCollection{Albums: albums, Paging: paging}
		c.JSON(http.StatusOK, albumCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read albums", c)
}

func GetAlbum(c *gin.Context) {
	counterAlbum.Add("GET /:id", 1)
	id := c.Param("id")
	album, err := albumManager.FindAlbumById(id)
	if err != nil {
		respondWithError(http.StatusNotFound, "album not found", c)
		return
	}
	c.JSON(http.StatusOK, album)
}

func GetSongForAlbum(c *gin.Context) {
	counterAlbum.Add("GET /:id/songs", 1)
	id := c.Param("id")
	songs, err := songManager.FindSongsByAlbumId(id, model.Paging{})
	if err == nil {
		var description string
		if len(songs) > 0 {
			if allSameArtist(songs) {
				description = songs[0].Artist.Name + " - " + songs[0].Album.Title
			} else {
				description = songs[0].Album.Title
			}
		}
		songCollection := model.SongCollection{Songs: songs, Description: description, Paging: model.Paging{Page: 1, Size: len(songs)}}
		c.JSON(http.StatusOK, songCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read songs", c)
}

func GetCoverForAlbum(c *gin.Context) {
	counterAlbum.Add("GET /:id/cover", 1)
	id := c.Param("id")
	songs, err := songManager.FindSongsByAlbumId(id, model.Paging{Size: 1})
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
