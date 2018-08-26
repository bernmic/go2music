package controller

import (
	"github.com/gorilla/mux"
	"go2music/model"
	"go2music/service"
	"io"
	"net/http"
	"os"
	"strconv"
)

func GetSongs(w http.ResponseWriter, r *http.Request) {
	songs, err := service.FindAllSongs()
	if err == nil {
		songCollection := model.SongCollection{Songs: songs, Paging: model.Paging{Page: 1, Size: len(songs)}}
		respondWithJSON(w, http.StatusOK, songCollection)
		return
	}
	respondWithError(w, http.StatusInternalServerError, "Cound not read songs")
}

func GetSong(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid song ID")
		return
	}
	song, err := service.FindOneSong(int64(id))
	if err != nil {
		respondWithError(w, http.StatusNotFound, "song not found")
		return
	}
	respondWithJSON(w, http.StatusOK, song)
}

func StreamSong(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid song ID")
		return
	}
	song, err := service.FindOneSong(int64(id))
	if err != nil {
		respondWithError(w, http.StatusNotFound, "song not found")
		return
	}
	file, err := os.Open(song.Path)
	defer file.Close() //Close after function return
	if err != nil {
		//File not found, send 404
		respondWithError(w, http.StatusNotFound, "song file not found")
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

	//Send the headers
	w.Header().Set("Content-Disposition", "attachment; filename="+song.Path)
	w.Header().Set("Content-Type", fileContentType)
	w.Header().Set("Content-Length", fileSize)

	//Send the file
	//We read 512 bytes from the file already so we reset the offset back to 0
	file.Seek(0, 0)
	io.Copy(w, file) //'Copy' the file to the client

}

func GetCover(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid song ID")
		return
	}
	song, err := service.FindOneSong(int64(id))
	if err != nil {
		respondWithError(w, http.StatusNotFound, "song not found")
		return
	}
	image, mimetype, err := service.GetCoverForSong(song)

	if image != nil {
		w.Header().Set("Content-Type", mimetype)
		w.Header().Set("Content-Length", strconv.Itoa(len(image)))

		_, err = w.Write(image)
	}
}
