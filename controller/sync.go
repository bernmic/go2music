package controller

import (
	"expvar"
	"go2music/database"
	"go2music/model"
	"go2music/thirdparty"
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
	r.POST("/sync/lastfm", syncLastFM)
}

func syncLastFM(c *gin.Context) {
	go SyncMbIdsWithLastFM()
	c.JSON(http.StatusOK, gin.H{"sync": "started"})
}

func getSyncInfo(c *gin.Context) {
	counterSync.Add("GET /", 1)
	c.JSON(http.StatusOK, database.GetSyncState())
}

func startSync(c *gin.Context) {
	go database.SyncWithFilesystem(databaseAccess)
	c.JSON(http.StatusOK, database.GetSyncState())
}

func getDanglingSongs(c *gin.Context) {
	syncStatus := database.GetSyncState()
	c.JSON(http.StatusOK, gin.H{"dangling_songs": syncStatus.DanglingSongs})
}

func removeDanglingSongs(c *gin.Context) {
	_, err := database.RemoveDanglingSongs(databaseAccess.SongManager)
	if err != nil {
		log.Errorf("Error removing dangling songs: %v", err)
		respondWithError(http.StatusInternalServerError, "Error removing dangling songs", c)
		return
	}
	c.JSON(http.StatusOK, database.GetSyncState())
}

func removeDanglingSong(c *gin.Context) {
	id := c.Param("id")
	err := database.RemoveDanglingSong(id, databaseAccess.SongManager)
	if err != nil {
		log.Warnf("Error removing dangling song: %v", err)
		respondWithError(http.StatusInternalServerError, "Error removing dangling song", c)
		return
	}
	c.JSON(http.StatusOK, database.GetSyncState())
}

func removeEmptyAlbums(c *gin.Context) {
	for _, id := range database.GetSyncState().EmptyAlbums {
		err := databaseAccess.AlbumManager.DeleteAlbum(id)
		if err == nil {
			delete(database.GetSyncState().EmptyAlbums, id)
		}
	}
	c.JSON(http.StatusOK, database.GetSyncState())
}

func setAlbumTitleToFoldername(c *gin.Context) {
	id := c.Param("id")
	err := database.SetAlbumTitleToFoldername(id, databaseAccess.AlbumManager)
	if err != nil {
		log.Warnf("Error setting title for album: %v", err)
		respondWithError(http.StatusInternalServerError, "Error setting title for album", c)
		return
	}
	c.JSON(http.StatusOK, database.GetSyncState())
}

func SyncMbIdsWithLastFM() {
	log.Info("Start syncing Mbid's with LastFM")
	artists, _, err := databaseAccess.ArtistManager.FindAllArtists("", model.Paging{
		Page:      0,
		Size:      0,
		Sort:      "",
		Direction: "",
	})

	if err != nil {
		log.Errorf("Error getting artists for LastFM sync: %v", err)
		return
	}
	for _, artist := range artists {
		if artist.Mbid == "" {
			info, err := thirdparty.GetArtistInfo(artist.Name)
			if err == nil && info.Mbid != "" {
				artist.Mbid = info.Mbid
				_, err = databaseAccess.ArtistManager.UpdateArtist(*artist)
				if err != nil {
					log.Errorf("error syncing artist with MB: %v", err)
				}
			}
		}
	}
	log.Info("Finished syncing Mbid's with LastFM")
}
