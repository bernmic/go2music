package controller

import (
	"expvar"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"go2music/model"
	"net/http"
)

type songIds []string

var (
	counterPlaylist = expvar.NewMap("playlist")
)

func initPlaylist(r *gin.RouterGroup) {
	r.GET("/playlist", GetPlaylists)
	r.GET("/playlist/:id", GetPlaylist)
	r.GET("/playlist/:id/songs", GetSongsForPlaylist)
	r.POST("/playlist/:id/songs", AddSongsToPlaylist)
	r.PUT("/playlist/:id/songs", SetSongsOfPlaylist)
	r.DELETE("/playlist/:id/songs", RemoveSongsFromPlaylist)
	r.POST("/playlist", CreatePlaylist)
	r.PUT("/playlist", UpdatePlaylist)
	r.DELETE("/playlist/:id", DeletePlaylist)
}

func GetPlaylists(c *gin.Context) {
	counterPlaylist.Add("GET /", 1)
	user, ok := c.Get("principal")
	if !ok {
		respondWithError(http.StatusUnauthorized, "not allowed", c)
		return
	}
	paging := extractPagingFromRequest(c)
	playlists, total, err := playlistManager.FindAllPlaylists(user.(*model.User).Id, paging)
	if err == nil {
		playlistCollection := model.PlaylistCollection{Playlists: playlists, Paging: paging, Total: total}
		c.JSON(http.StatusOK, playlistCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read playlists", c)
}

func GetPlaylist(c *gin.Context) {
	counterPlaylist.Add("GET /:id", 1)
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
	counterPlaylist.Add("GET /:id/songs", 1)
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

	paging := extractPagingFromRequest(c)
	var total int
	if playlist.Query != "" {
		songs, total, err = songManager.FindSongsByPlaylistQuery(playlist.Query, paging)
	} else {
		songs, total, err = songManager.FindSongsByPlaylist(playlist.Id, paging)
	}
	if err == nil {
		songCollection := model.SongCollection{Songs: songs, Description: "Playlist: " + playlist.Name, Paging: paging, Total: total}
		c.JSON(http.StatusOK, songCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read songs of playlist", c)
}

func CreatePlaylist(c *gin.Context) {
	counterPlaylist.Add("POST /:id", 1)
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
	counterPlaylist.Add("PUT /:id", 1)
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
	counterPlaylist.Add("DELETE /:id", 1)
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

func AddSongsToPlaylist(c *gin.Context) {
	counterPlaylist.Add("POST /:id/songs", 1)
	user, ok := c.Get("principal")
	if !ok {
		respondWithError(http.StatusUnauthorized, "not allowed", c)
		return
	}
	id := c.Param("id")
	_, err := playlistManager.FindPlaylistById(id, user.(*model.User).Id)
	if err != nil {
		respondWithError(http.StatusNotFound, "playlist not found", c)
		return
	}
	songIdsToAdd := songIds{}
	err = c.BindJSON(&songIdsToAdd)
	if err != nil {
		log.Warn("cannot decode request", err)
		respondWithError(http.StatusBadRequest, "bad request", c)
		return
	}
	addedSongs := playlistManager.AddSongsToPlaylist(id, songIdsToAdd)
	c.JSON(http.StatusOK, gin.H{"added": addedSongs})
}

func RemoveSongsFromPlaylist(c *gin.Context) {
	counterPlaylist.Add("DELETE /:id/songs", 1)
	user, ok := c.Get("principal")
	if !ok {
		respondWithError(http.StatusUnauthorized, "not allowed", c)
		return
	}
	id := c.Param("id")
	_, err := playlistManager.FindPlaylistById(id, user.(*model.User).Id)
	if err != nil {
		respondWithError(http.StatusNotFound, "playlist not found", c)
		return
	}
	songIdsToRemove := songIds{}
	err = c.BindJSON(&songIdsToRemove)
	if err != nil {
		log.Warn("cannot decode request", err)
		respondWithError(http.StatusBadRequest, "bad request", c)
		return
	}
	removedSongs := playlistManager.RemoveSongsFromPlaylist(id, songIdsToRemove)
	c.JSON(http.StatusOK, gin.H{"removed": removedSongs})
}

func SetSongsOfPlaylist(c *gin.Context) {
	counterPlaylist.Add("PUT /:id/songs", 1)
	user, ok := c.Get("principal")
	if !ok {
		respondWithError(http.StatusUnauthorized, "not allowed", c)
		return
	}
	id := c.Param("id")
	_, err := playlistManager.FindPlaylistById(id, user.(*model.User).Id)
	if err != nil {
		respondWithError(http.StatusNotFound, "playlist not found", c)
		return
	}
	songIdsToSet := songIds{}
	err = c.BindJSON(&songIdsToSet)
	if err != nil {
		log.Warn("cannot decode request", err)
		respondWithError(http.StatusBadRequest, "bad request", c)
		return
	}
	removedSongs, addedSongs := playlistManager.SetSongsOfPlaylist(id, songIdsToSet)
	c.JSON(http.StatusOK, gin.H{"removed": removedSongs, "added": addedSongs})
}
