package controller

import (
	"github.com/gin-gonic/gin"
	"go2music/model"
	"go2music/service"
	"log"
	"net/http"
	"strconv"
)

func initPlaylist(r *gin.RouterGroup) {
	r.GET("/playlist", GetPlaylists)
	r.GET("/playlist/:id", GetPlaylist)
	r.GET("/playlist/:id/songs", GetSongsForPlaylist)
	r.POST("/playlist", CreatePlaylist)
	r.PUT("/playlist", UpdatePlaylist)
	r.DELETE("/playlist/:id", DeletePlaylist)
}

func GetPlaylists(c *gin.Context) {
	playlists, err := service.FindAllPlaylists()
	if err == nil {
		playlistCollection := model.PlaylistCollection{Playlists: playlists}
		c.JSON(http.StatusOK, playlistCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read playlists", c)
}

func GetPlaylist(c *gin.Context) {
	idString := c.Param("id")
	id, err := strconv.ParseInt(idString, 10, 64)
	if err != nil {
		respondWithError(http.StatusBadRequest, "Invalid playlist ID", c)
		return
	}
	playlist, err := service.FindPlaylistById(id)
	if err != nil {
		respondWithError(http.StatusNotFound, "playlist not found", c)
		return
	}
	c.JSON(http.StatusOK, playlist)
}

func GetSongsForPlaylist(c *gin.Context) {
	idString := c.Param("id")
	id, err := strconv.ParseInt(idString, 10, 64)
	if err != nil {
		respondWithError(http.StatusBadRequest, "Invalid playlist ID", c)
		return
	}
	playlist, err := service.FindPlaylistById(id)
	if err != nil {
		respondWithError(http.StatusNotFound, "playlist not found", c)
		return
	}

	songs, err := service.FindSongsByPlaylistQuery(playlist.Query)
	if err == nil {
		songCollection := model.SongCollection{Songs: songs, Paging: model.Paging{Page: 1, Size: len(songs)}}
		c.JSON(http.StatusOK, songCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read songs of playlist", c)
}

func CreatePlaylist(c *gin.Context) {
	playlist := &model.Playlist{}
	err := c.BindJSON(playlist)
	if err != nil {
		log.Println("WARN cannot decode request", err)
		respondWithError(http.StatusBadRequest, "bad request", c)
		return
	}
	playlist, err = service.CreatePlaylist(*playlist)
	if err != nil {
		respondWithError(http.StatusBadRequest, "bad request", c)
		return
	}
	c.JSON(http.StatusCreated, playlist)
}

func UpdatePlaylist(c *gin.Context) {
	playlist := &model.Playlist{}
	err := c.BindJSON(playlist)
	if err != nil {
		log.Println("WARN cannot decode request", err)
		respondWithError(http.StatusBadRequest, "bad request", c)
		return
	}
	playlist, err = service.UpdatePlaylist(*playlist)
	if err != nil {
		respondWithError(http.StatusBadRequest, "bad request", c)
		return
	}
	c.JSON(http.StatusOK, playlist)
}

func DeletePlaylist(c *gin.Context) {
	idString := c.Param("id")
	id, err := strconv.ParseInt(idString, 10, 64)
	if err != nil {
		respondWithError(http.StatusBadRequest, "Invalid playlist ID", c)
		return
	}
	if service.DeletePlaylist(id) != nil {
		respondWithError(http.StatusBadRequest, "cannot delete playlist", c)
		return
	}
	c.JSON(http.StatusOK, "")
}
