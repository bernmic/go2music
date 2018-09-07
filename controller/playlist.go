package controller

import (
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"go2music/model"
	"net/http"
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
	user, ok := c.Get("principal")
	if !ok {
		respondWithError(http.StatusUnauthorized, "not allowed", c)
		return
	}
	playlists, err := playlistManager.FindAllPlaylists(user.(*model.User).Id)
	if err == nil {
		playlistCollection := model.PlaylistCollection{Playlists: playlists}
		c.JSON(http.StatusOK, playlistCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read playlists", c)
}

func GetPlaylist(c *gin.Context) {
	user, ok := c.Get("principal")
	if !ok {
		respondWithError(http.StatusUnauthorized, "not allowed", c)
		return
	}
	id := c.Param("id")
	playlist, err := playlistManager.FindPlaylistById(id, user.(*model.User).Id)
	if err != nil {
		respondWithError(http.StatusNotFound, "playlist not found", c)
		return
	}
	c.JSON(http.StatusOK, playlist)
}

func GetSongsForPlaylist(c *gin.Context) {
	user, ok := c.Get("principal")
	if !ok {
		respondWithError(http.StatusUnauthorized, "not allowed", c)
		return
	}
	id := c.Param("id")
	playlist, err := playlistManager.FindPlaylistById(id, user.(*model.User).Id)
	if err != nil {
		respondWithError(http.StatusNotFound, "playlist not found", c)
		return
	}

	var songs []*model.Song

	if playlist.Query != "" {
		songs, err = songManager.FindSongsByPlaylistQuery(playlist.Query)
	} else {
		songs, err = songManager.FindSongsByPlaylist(playlist.Id)
	}
	if err == nil {
		songCollection := model.SongCollection{Songs: songs, Paging: model.Paging{Page: 1, Size: len(songs)}}
		c.JSON(http.StatusOK, songCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read songs of playlist", c)
}

func CreatePlaylist(c *gin.Context) {
	user, ok := c.Get("principal")
	if !ok {
		respondWithError(http.StatusUnauthorized, "not allowed", c)
		return
	}
	playlist := &model.Playlist{}
	playlist.User = *(user.(*model.User))
	err := c.BindJSON(playlist)
	if err != nil {
		log.Warn("cannot decode request", err)
		respondWithError(http.StatusBadRequest, "bad request", c)
		return
	}
	playlist, err = playlistManager.CreatePlaylist(*playlist)
	if err != nil {
		respondWithError(http.StatusBadRequest, "bad request", c)
		return
	}
	c.JSON(http.StatusCreated, playlist)
}

func UpdatePlaylist(c *gin.Context) {
	user, ok := c.Get("principal")
	if !ok {
		respondWithError(http.StatusUnauthorized, "not allowed", c)
		return
	}
	playlist := &model.Playlist{}
	playlist.User = *(user.(*model.User))
	err := c.BindJSON(playlist)
	if err != nil {
		log.Warn("cannot decode request", err)
		respondWithError(http.StatusBadRequest, "bad request", c)
		return
	}
	playlist, err = playlistManager.UpdatePlaylist(*playlist)
	if err != nil {
		respondWithError(http.StatusBadRequest, "bad request", c)
		return
	}
	c.JSON(http.StatusOK, playlist)
}

func DeletePlaylist(c *gin.Context) {
	user, ok := c.Get("principal")
	if !ok {
		respondWithError(http.StatusUnauthorized, "not allowed", c)
		return
	}
	id := c.Param("id")
	if playlistManager.DeletePlaylist(id, user.(*model.User).Id) != nil {
		respondWithError(http.StatusBadRequest, "cannot delete playlist", c)
		return
	}
	c.JSON(http.StatusOK, "")
}
