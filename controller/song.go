package controller

import (
	"expvar"
	"go2music/model"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
)

var (
	counterSong = expvar.NewMap("song")
)

func initSong(r *gin.RouterGroup) {
	r.GET("/song", getSongs)
	r.GET("/song/:id", getSong)
	r.GET("/song/:id/cover", getCover)
	r.GET("/song/:id/stream", streamSong)
	r.POST("/song/:id/rate/:rating", rateSong)
}

func getSongs(c *gin.Context) {
	counterSong.Add("GET /", 1)
	paging := extractPagingFromRequest(c)
	filter := extractFilterFromRequest(c)
	songs, total, err := songManager.FindAllSongs(filter, paging)
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
	song, err := songManager.FindOneSong(id)
	if err != nil {
		respondWithError(http.StatusNotFound, "song not found", c)
		return
	}
	c.JSON(http.StatusOK, song)
}

func streamSong(c *gin.Context) {
	counterSong.Add("GET /:id/stream", 1)
	id := c.Param("id")
	song, err := songManager.FindOneSong(id)
	if err != nil {
		respondWithError(http.StatusNotFound, "song not found", c)
		return
	}
	file, err := os.Open(song.Path)
	defer file.Close() //Close after function return
	if err != nil {
		//File not found, send 404
		respondWithError(http.StatusNotFound, "song file not found", c)
		return
	}
	//Get the Content-Type of the file
	//Create a buffer to store the header of the file in
	fileHeader := make([]byte, 512)
	//Copy the headers into the fileHeader buffer
	file.Read(fileHeader)
	//Get content type of file
	fileContentType := http.DetectContentType(fileHeader)

	//Get the file size
	fileStat, _ := file.Stat()                         //Get info from file
	fileSize := strconv.FormatInt(fileStat.Size(), 10) //Get file size as a string

	//file.Close()

	//Send the headers
	c.Header("Content-Disposition", "attachment; filename=\""+song.Path+"\"")
	c.Header("Content-Type", fileContentType)
	c.Header("Content-Length", fileSize)
	c.Header("Cache-Control", "no-cache")
	c.File(song.Path)

	u, ok := c.Get("principal")
	if !ok {
		respondWithError(http.StatusUnauthorized, "unknown user", c)
		return
	}
	user := *(u.(*model.User))
	go songManager.SongPlayed(song, &user)
}

func rateSong(c *gin.Context) {
	counterSong.Add("GET /:id/rate/:rating", 1)
	id := c.Param("id")
	rating, err := strconv.Atoi(c.Param("rating"))
	if err != nil {
		respondWithError(400, "rating must be an integer between 0 and 255", c)
		return
	}

	song, err := songManager.FindOneSong(id)
	if err != nil {
		respondWithError(http.StatusNotFound, "song not found", c)
		return
	}
	song.Rating = rating
	song, err = songManager.UpdateSong(*song)
	if err != nil {
		respondWithError(http.StatusInternalServerError, "Cannot save song", c)
		return
	}
	c.JSON(http.StatusOK, song)
}

func getCover(c *gin.Context) {
	counterSong.Add("GET /:id/cover", 1)
	id := c.Param("id")
	song, err := songManager.FindOneSong(id)
	if err != nil {
		respondWithError(http.StatusNotFound, "song not found", c)
		return
	}
	image, mimetype, err := songManager.GetCoverForSong(song)

	if image != nil {
		c.Header("Content-Type", mimetype)
		c.Header("Content-Length", strconv.Itoa(len(image)))
		c.Data(http.StatusOK, mimetype, image)
	}
}
