package controller

import (
	"github.com/gin-gonic/gin"
	"go2music/model"
	"go2music/service"
	"net/http"
	"strconv"
)

func initAlbum(r *gin.RouterGroup) {
	r.GET("/album", GetAlbums)
	r.GET("/album/:id", GetAlbum)
	r.GET("/album/:id/songs", GetSongForAlbum)
	r.GET("/album/:id/cover", GetCoverForAlbum)
}

func GetAlbums(c *gin.Context) {
	albums, err := service.FindAllAlbums()
	if err == nil {
		albumCollection := model.AlbumCollection{Albums: albums}
		c.JSON(http.StatusOK, albumCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read albums", c)
}

func GetAlbum(c *gin.Context) {
	idString := c.Param("id")
	id, err := strconv.ParseInt(idString, 10, 64)
	if err != nil {
		respondWithError(http.StatusBadRequest, "Invalid album ID", c)
		return
	}
	album, err := service.FindAlbumById(id)
	if err != nil {
		respondWithError(http.StatusNotFound, "album not found", c)
		return
	}
	c.JSON(http.StatusOK, album)
}

func GetSongForAlbum(c *gin.Context) {
	idString := c.Param("id")
	id, err := strconv.ParseInt(idString, 10, 64)
	if err != nil {
		respondWithError(http.StatusBadRequest, "Invalid album ID", c)
		return
	}
	songs, err := service.FindSongsByAlbumId(id)
	if err == nil {
		songCollection := model.SongCollection{Songs: songs, Paging: model.Paging{Page: 1, Size: len(songs)}}
		c.JSON(http.StatusOK, songCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read songs", c)
}

func GetCoverForAlbum(c *gin.Context) {
	idString := c.Param("id")
	id, err := strconv.ParseInt(idString, 10, 64)
	if err != nil {
		respondWithError(http.StatusBadRequest, "Invalid album ID", c)
		return
	}
	songs, err := service.FindSongsByAlbumId(id)
	if err != nil {
		respondWithError(http.StatusNotFound, "album not found", c)
		return
	}
	if len(songs) > 0 {
		image, mimetype, _ := service.GetCoverForSong(songs[0])

		if image != nil {
			c.Header("Content-Type", mimetype)
			c.Header("Content-Length", strconv.Itoa(len(image)))
			c.Data(http.StatusOK, mimetype, image)
			return
		}
	}
	respondWithError(http.StatusNotFound, "No cover found", c)
}
