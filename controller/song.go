package controller

import (
	"expvar"
	"github.com/gin-gonic/gin"
	"go2music/model"
	"net/http"
	"os"
	"strconv"
)

var (
	counterSong = expvar.NewMap("song")
)

func initSong(r *gin.RouterGroup) {
	r.GET("/song", GetSongs)
	r.GET("/song/:id", GetSong)
	r.GET("/song/:id/cover", GetCover)
	r.GET("/song/:id/stream", StreamSong)
}

func GetSongs(c *gin.Context) {
	counterSong.Add("GET /", 1)
	songs, err := songManager.FindAllSongs()
	if err == nil {
		songCollection := model.SongCollection{Songs: songs, Paging: model.Paging{Page: 1, Size: len(songs)}}
		c.JSON(http.StatusOK, songCollection)
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read songs", c)
}

func GetSong(c *gin.Context) {
	counterSong.Add("GET /:id", 1)
	id := c.Param("id")
	song, err := songManager.FindOneSong(id)
	if err != nil {
		respondWithError(http.StatusNotFound, "song not found", c)
		return
	}
	c.JSON(http.StatusOK, song)
}

func StreamSong(c *gin.Context) {
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

	file.Close()

	//Send the headers
	c.Header("Content-Disposition", "attachment; filename="+song.Path)
	c.Header("Content-Type", fileContentType)
	c.Header("Content-Length", fileSize)
	c.File(song.Path)
	//Send the file
	//We read 512 bytes from the file already so we reset the offset back to 0
	//file.Seek(0, 0)
	//io.Copy(c.Writer, file) //'Copy' the file to the client
}

func GetCover(c *gin.Context) {
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
