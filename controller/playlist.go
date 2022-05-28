package controller

import (
	"expvar"
	"fmt"
	"go2music/exchange"
	"go2music/model"
	"net/http"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

type songIds []string

var (
	counterPlaylist = expvar.NewMap("playlist")
)

func initPlaylist(r *gin.RouterGroup) {
	r.GET("/playlist", getPlaylists)
	r.GET("/playlist/:id", getPlaylist)
	r.GET("/playlist/:id/download", downloadPlaylist)
	r.GET("/playlist/:id/xspf", exportXSPF)
	r.GET("/playlist/:id/songs", getSongsForPlaylist)
	r.POST("/playlist/:id/songs", addSongsToPlaylist)
	r.PUT("/playlist/:id/songs", setSongsOfPlaylist)
	r.DELETE("/playlist/:id/songs", removeSongsFromPlaylist)
	r.POST("/playlist", createPlaylist)
	r.PUT("/playlist", updatePlaylist)
	r.DELETE("/playlist/:id", deletePlaylist)
}

func getPlaylists(c *gin.Context) {
	counterPlaylist.Add("GET /", 1)
	u, err := principal(c)
	if err != nil {
		respondWithError(http.StatusUnauthorized, "unauthorized", c)
		return
	}
	values := c.Request.URL.Query()
	kind := ""
	if k := values.Get("kind"); k != "" {
		kind = k
	}
	paging := extractPagingFromRequest(c)
	playlists, total, err := databaseAccess.PlaylistManager.FindAllPlaylistsOfKind(u.Id, kind, paging)
	if err == nil {
		playlistCollection := model.PlaylistCollection{Playlists: playlists, Paging: paging, Total: total}
		c.JSON(http.StatusOK, playlistCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read playlists", c)
}

func getPlaylist(c *gin.Context) {
	counterPlaylist.Add("GET /:id", 1)
	u, err := principal(c)
	if err != nil {
		respondWithError(http.StatusUnauthorized, "unauthorized", c)
		return
	}
	id := c.Param("id")
	playlist, err := databaseAccess.PlaylistManager.FindPlaylistById(id, u.Id)
	if err != nil {
		respondWithError(http.StatusNotFound, "playlist not found", c)
		return
	}
	c.JSON(http.StatusOK, playlist)
}

func getSongsForPlaylist(c *gin.Context) {
	counterPlaylist.Add("GET /:id/songs", 1)
	u, err := principal(c)
	if err != nil {
		respondWithError(http.StatusUnauthorized, "unauthorized", c)
		return
	}
	id := c.Param("id")
	playlist, err := databaseAccess.PlaylistManager.FindPlaylistById(id, u.Id)
	if err != nil {
		respondWithError(http.StatusNotFound, "playlist not found", c)
		return
	}

	var songs []*model.Song

	paging := extractPagingFromRequest(c)
	var total int
	if playlist.Query != "" {
		songs, total, err = databaseAccess.SongManager.FindSongsByPlaylistQuery(playlist.Query, paging)
	} else {
		songs, total, err = databaseAccess.SongManager.FindSongsByPlaylist(playlist.Id, paging)
	}
	if err == nil {
		songCollection := model.SongCollection{Songs: songs, Description: "Playlist: " + playlist.Name, Paging: paging, Total: total}
		c.JSON(http.StatusOK, songCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read songs of playlist", c)
}

func createPlaylist(c *gin.Context) {
	counterPlaylist.Add("POST /:id", 1)
	u, err := principal(c)
	if err != nil {
		respondWithError(http.StatusUnauthorized, "unauthorized", c)
		return
	}
	playlist := &model.Playlist{}
	playlist.User = *u
	err = c.BindJSON(playlist)
	if err != nil {
		log.Warn("cannot decode request", err)
		respondWithError(http.StatusBadRequest, "bad request", c)
		return
	}
	playlist, err = databaseAccess.PlaylistManager.CreatePlaylist(*playlist)
	if err != nil {
		respondWithError(http.StatusBadRequest, "bad request", c)
		return
	}
	c.JSON(http.StatusCreated, playlist)
}

func updatePlaylist(c *gin.Context) {
	counterPlaylist.Add("PUT /:id", 1)
	u, err := principal(c)
	if err != nil {
		respondWithError(http.StatusUnauthorized, "unauthorized", c)
		return
	}
	playlist := &model.Playlist{}
	playlist.User = *u
	err = c.BindJSON(playlist)
	if err != nil {
		log.Warn("cannot decode request", err)
		respondWithError(http.StatusBadRequest, "bad request", c)
		return
	}
	playlist, err = databaseAccess.PlaylistManager.UpdatePlaylist(*playlist)
	if err != nil {
		respondWithError(http.StatusBadRequest, "bad request", c)
		return
	}
	c.JSON(http.StatusOK, playlist)
}

func deletePlaylist(c *gin.Context) {
	counterPlaylist.Add("DELETE /:id", 1)
	u, err := principal(c)
	if err != nil {
		respondWithError(http.StatusUnauthorized, "unauthorized", c)
		return
	}
	id := c.Param("id")
	if databaseAccess.PlaylistManager.DeletePlaylist(id, u.Id) != nil {
		respondWithError(http.StatusBadRequest, "cannot delete playlist", c)
		return
	}
	c.JSON(http.StatusOK, "")
}

func addSongsToPlaylist(c *gin.Context) {
	counterPlaylist.Add("POST /:id/songs", 1)
	u, err := principal(c)
	if err != nil {
		respondWithError(http.StatusUnauthorized, "unauthorized", c)
		return
	}
	id := c.Param("id")
	_, err = databaseAccess.PlaylistManager.FindPlaylistById(id, u.Id)
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
	addedSongs := databaseAccess.PlaylistManager.AddSongsToPlaylist(id, songIdsToAdd)
	c.JSON(http.StatusOK, gin.H{"added": addedSongs})
}

func removeSongsFromPlaylist(c *gin.Context) {
	counterPlaylist.Add("DELETE /:id/songs", 1)
	u, err := principal(c)
	if err != nil {
		respondWithError(http.StatusUnauthorized, "unauthorized", c)
		return
	}
	id := c.Param("id")
	_, err = databaseAccess.PlaylistManager.FindPlaylistById(id, u.Id)
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
	removedSongs := databaseAccess.PlaylistManager.RemoveSongsFromPlaylist(id, songIdsToRemove)
	c.JSON(http.StatusOK, gin.H{"removed": removedSongs})
}

func setSongsOfPlaylist(c *gin.Context) {
	counterPlaylist.Add("PUT /:id/songs", 1)
	u, err := principal(c)
	if err != nil {
		respondWithError(http.StatusUnauthorized, "unauthorized", c)
		return
	}
	id := c.Param("id")
	_, err = databaseAccess.PlaylistManager.FindPlaylistById(id, u.Id)
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
	removedSongs, addedSongs := databaseAccess.PlaylistManager.SetSongsOfPlaylist(id, songIdsToSet)
	c.JSON(http.StatusOK, gin.H{"removed": removedSongs, "added": addedSongs})
}

func downloadPlaylist(c *gin.Context) {
	counterPlaylist.Add("GET /:id/download", 1)
	u, err := principal(c)
	if err != nil {
		respondWithError(http.StatusUnauthorized, "unauthorized", c)
		return
	}
	id := c.Param("id")
	playlist, err := databaseAccess.PlaylistManager.FindPlaylistById(id, u.Id)
	if err != nil {
		respondWithError(http.StatusNotFound, "playlist not found", c)
		return
	}

	var songs []*model.Song

	paging := extractPagingFromRequest(c)
	if playlist.Query != "" {
		songs, _, err = databaseAccess.SongManager.FindSongsByPlaylistQuery(playlist.Query, paging)
	} else {
		songs, _, err = databaseAccess.SongManager.FindSongsByPlaylist(playlist.Id, paging)
	}
	if err == nil {
		if len(songs) > 0 {
			sendSongsAsZip(c, songs, playlist.Name+".zip")
		}
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read songs of playlist", c)
}

func exportXSPF(c *gin.Context) {
	counterPlaylist.Add("GET /:id/xspf", 1)
	u, err := principal(c)
	if err != nil {
		respondWithError(http.StatusUnauthorized, "unauthorized", c)
		return
	}
	id := c.Param("id")
	playlist, err := databaseAccess.PlaylistManager.FindPlaylistById(id, u.Id)
	if err != nil {
		respondWithError(http.StatusNotFound, "playlist not found", c)
		return
	}

	var songs []*model.Song

	paging := extractPagingFromRequest(c)
	if playlist.Query != "" {
		songs, _, err = databaseAccess.SongManager.FindSongsByPlaylistQuery(playlist.Query, paging)
	} else {
		songs, _, err = databaseAccess.SongManager.FindSongsByPlaylist(playlist.Id, paging)
	}
	if err == nil {
		c.Header("Content-Type", "application/xspf+xml")
		c.Header("Content-Disposition", fmt.Sprintf("attachment; filename=\"%s.xspf\"", playlist.Name))
		exchange.ExportXSPF(playlist, songs, c.Writer)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read songs of playlist", c)
}
