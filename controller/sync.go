package controller

import (
	"expvar"
	"go2music/fs"
	"net/http"

	"github.com/gin-gonic/gin"
)

var (
	counterSync = expvar.NewMap("sync")
)

func initSync(r *gin.RouterGroup) {
	r.GET("/sync", getSyncInfo)
	r.POST("/sync", startSync)
	r.DELETE("/sync", removeDanglingSongs)
}

func getSyncInfo(c *gin.Context) {
	counterSync.Add("GET /", 1)
	c.JSON(http.StatusOK, fs.GetSyncState())
}

func startSync(c *gin.Context) {
	go fs.SyncWithFilesystem(albumManager, artistManager, songManager)
	c.JSON(http.StatusOK, gin.H{"message": "Sync started"})
}

func removeDanglingSongs(c *gin.Context) {
	count, err := fs.RemoveDanglingSongs(songManager)
	if err != nil {
		respondWithError(http.StatusInternalServerError, "Error removing dangling songs", c)
		return
	}
	c.JSON(http.StatusOK, gin.H{"items_deleted": count})
}
