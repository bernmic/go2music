package controller

import (
	"expvar"
	"go2music/assets"
	"go2music/model"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

var (
	counterSong = expvar.NewMap("song")
)

func initSong(r *gin.RouterGroup) {
	r.GET("/song", getSongs)
	r.GET("/song/:id", getSong)
	r.GET("/song/:id/cover", getCover)
	r.GET("/song/:id/cover/:size", getCover)
	r.GET("/song/:id/stream", streamSong)
	r.POST("/song/:id/rate/:rating", rateSong)
}

func getSongs(c *gin.Context) {
	counterSong.Add("GET /", 1)
	paging := extractPagingFromRequest(c)
	filter := extractFilterFromRequest(c)
	songs, total, err := databaseAccess.SongManager.FindAllSongs(filter, paging)
	if err == nil {
		songCollection := model.SongCollection{Songs: songs, Paging: paging, Total: total}
		c.JSON(http.StatusOK, songCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read songs", c)
}

func getSong(c *gin.Context) {
	counterSong.Add("GET /:id", 1)
	id := c.Param("id")
	song, err := databaseAccess.SongManager.FindOneSong(id)
	if err != nil {
		respondWithError(http.StatusNotFound, "song not found", c)
		return
	}
	c.JSON(http.StatusOK, song)
}

func streamSong(c *gin.Context) {
	counterSong.Add("GET /:id/stream", 1)
	id := c.Param("id")
	song, err := databaseAccess.SongManager.FindOneSong(id)
	if err != nil {
		respondWithError(http.StatusNotFound, "song not found", c)
		return
	}
	file, err := os.Open(song.Path)
	defer func() {
		err := file.Close()
		if err != nil {
			log.Errorf("error closing file in stream: %v", err)
		}
	}() //Close after function return
	if err != nil {
		//File not found, send 404
		respondWithError(http.StatusNotFound, "song file not found", c)
		return
	}
	//Get the Content-Type of the file
	//Create a buffer to store the header of the file in
	fileHeader := make([]byte, 512)
	//Copy the headers into the fileHeader buffer
	_, err = file.Read(fileHeader)
	if err != nil {
		log.Errorf("error reading file header for streaming: %v", err)
		respondWithError(http.StatusInternalServerError, "internal error", c)
	}
	//Get content type of file
	fileContentType := http.DetectContentType(fileHeader)

	//Get the file size
	fileStat, _ := file.Stat()                         //Get info from file
	fileSize := strconv.FormatInt(fileStat.Size(), 10) //Get file size as a string

	//Send the headers
	c.Header("Content-Disposition", "attachment; filename=\""+song.Path+"\"")
	c.Header("Content-Type", fileContentType)
	c.Header("Content-Length", fileSize)
	c.Header("Cache-Control", "no-cache")
	c.File(song.Path)

	u, err := principal(c)
	if err != nil {
		respondWithError(http.StatusUnauthorized, "unknown user", c)
		return
	}
	go databaseAccess.SongManager.SongPlayed(song, u)
}

func rateSong(c *gin.Context) {
	counterSong.Add("GET /:id/rate/:rating", 1)
	id := c.Param("id")
	rating, err := strconv.Atoi(c.Param("rating"))
	if err != nil {
		respondWithError(400, "rating must be an integer between 0 and 255", c)
		return
	}

	song, err := databaseAccess.SongManager.FindOneSong(id)
	if err != nil {
		respondWithError(http.StatusNotFound, "song not found", c)
		return
	}
	song.Rating = rating
	song, err = databaseAccess.SongManager.UpdateSong(*song)
	if err != nil {
		respondWithError(http.StatusInternalServerError, "Cannot save song", c)
		return
	}
	c.JSON(http.StatusOK, song)
}

func getCover(c *gin.Context) {
	counterSong.Add("GET /:id/cover", 1)
	id := c.Param("id")
	s := c.Param("size")
	size := CoverSize
	var err error
	if s != "" {
		size, err = strconv.Atoi(s)
		if err != nil {
			respondWithError(http.StatusBadRequest, "Invalid size parameter", c)
			return
		}
	}
	song, err := databaseAccess.SongManager.FindOneSong(id)
	if err != nil {
		respondWithError(http.StatusNotFound, "song not found", c)
		return
	}
	imageBytes, mimetype, err := databaseAccess.SongManager.GetCoverForSong(song)
	if err != nil {
		f, err := assets.FrontendAssets.Open("/assets/img/defaultAlbum.png")
		if err == nil {
			defer func() {
				err := f.Close()
				if err != nil {
					log.Errorf("error closing file in getCover: %v", err)
				}
			}() //Close after function return
			image, err := ioutil.ReadAll(f)
			if err == nil {
				c.Header("Content-Type", "image/png")
				c.Header("Content-Length", strconv.Itoa(len(image)))
				c.Data(http.StatusOK, "image/png", image)
				return
			}
		}

		respondWithError(http.StatusNotFound, "no cover for song found", c)
		return
	}

	imageBytes, mimetype, err = resizeCover(imageBytes, mimetype, size)
	if err != nil {
		log.Infof("Error dedoding cover of %s: %v", song.Path, err)
		respondWithError(http.StatusInternalServerError, "cannot decode image", c)
		return
	}
	if imageBytes != nil {
		c.Header("Content-Type", mimetype)
		c.Header("Content-Length", strconv.Itoa(len(imageBytes)))
		c.Data(http.StatusOK, mimetype, imageBytes)
	}
}
