package controller

import (
	"expvar"
	"go2music/fs"
	"net/http"

	log "github.com/sirupsen/logrus"

	"github.com/gin-gonic/gin"
)

var (
	counterSync = expvar.NewMap("sync")
)

func initSync(r *gin.RouterGroup) {
	r.GET("/sync", getSyncInfo)
	r.POST("/sync", startSync)
	r.GET("/sync/dangling", getDanglingSongs)
	r.DELETE("/sync/dangling", removeDanglingSongs)
	r.DELETE("/sync/dangling/:id", removeDanglingSong)
	r.DELETE("/sync/emptyalbums", removeEmptyAlbums)
	r.PUT("/sync/album/:id", setAlbumTitleToFoldername)
}

func getSyncInfo(c *gin.Context) {
	counterSync.Add("GET /", 1)
	c.JSON(http.StatusOK, fs.GetSyncState())
}

func startSync(c *gin.Context) {
	go fs.SyncWithFilesystem(databaseAccess)
	c.JSON(http.StatusOK, fs.GetSyncState())
}

func getDanglingSongs(c *gin.Context) {
	syncStatus := fs.GetSyncState()
	c.JSON(http.StatusOK, gin.H{"dangling_songs": syncStatus.DanglingSongs})
}

func removeDanglingSongs(c *gin.Context) {
	_, err := fs.RemoveDanglingSongs(databaseAccess.SongManager)
	if err != nil {
		respondWithError(http.StatusInternalServerError, "Error removing dangling songs", c)
		return
	}
	c.JSON(http.StatusOK, fs.GetSyncState())
}

func removeDanglingSong(c *gin.Context) {
	id := c.Param("id")
	err := fs.RemoveDanglingSong(id, databaseAccess.SongManager)
	if err != nil {
		log.Warnf("Error removing dangling song: %v", err)
		respondWithError(http.StatusInternalServerError, "Error removing dangling song", c)
		return
	}
	c.JSON(http.StatusOK, fs.GetSyncState())
}

func removeEmptyAlbums(c *gin.Context) {
	for id, _ := range fs.GetSyncState().EmptyAlbums {
		err := databaseAccess.AlbumManager.DeleteAlbum(id)
		if err == nil {
			delete(fs.GetSyncState().EmptyAlbums, id)
		}
	}
	c.JSON(http.StatusOK, fs.GetSyncState())
}

func setAlbumTitleToFoldername(c *gin.Context) {
	id := c.Param("id")
	err := fs.SetAlbumTitleToFoldername(id, databaseAccess.AlbumManager)
	if err != nil {
		log.Warnf("Error setting title for album: %v", err)
		respondWithError(http.StatusInternalServerError, "Error setting title for album", c)
		return
	}
	c.JSON(http.StatusOK, fs.GetSyncState())
}
