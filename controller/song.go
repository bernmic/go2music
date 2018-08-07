package controller

import (
	"fmt"
	"github.com/gorilla/mux"
	"go2music/service"
	"io"
	"net/http"
	"os"
	"strconv"
	"strings"
)

func GetSongs(w http.ResponseWriter, r *http.Request) {
	dumpRequestHeader(r)
	songs, err := service.FindAllSongs()
	if err == nil {
		respondWithJSON(w, 200, songs)
		return
	}
	respondWithError(w, 500, "Cound not read songs")
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
		respondWithError(w, 404, "song not found")
		return
	}
	respondWithJSON(w, 200, song)
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
		respondWithError(w, 404, "song not found")
		return
	}
	Openfile, err := os.Open(song.Path)
	defer Openfile.Close() //Close after function return
	if err != nil {
		//File not found, send 404
		respondWithError(w, 404, "song file not found")
		return
	}
	//Get the Content-Type of the file
	//Create a buffer to store the header of the file in
	FileHeader := make([]byte, 512)
	//Copy the headers into the FileHeader buffer
	Openfile.Read(FileHeader)
	//Get content type of file
	FileContentType := http.DetectContentType(FileHeader)

	//Get the file size
	FileStat, _ := Openfile.Stat()                     //Get info from file
	FileSize := strconv.FormatInt(FileStat.Size(), 10) //Get file size as a string

	//Send the headers
	w.Header().Set("Content-Disposition", "attachment; filename="+song.Path)
	w.Header().Set("Content-Type", FileContentType)
	w.Header().Set("Content-Length", FileSize)

	//Send the file
	//We read 512 bytes from the file already so we reset the offset back to 0
	Openfile.Seek(0, 0)
	io.Copy(w, Openfile) //'Copy' the file to the client

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
		respondWithError(w, 404, "song not found")
		return
	}
	image, mimetype, err := service.GetCoverForSong(song)

	if image != nil {
		w.Header().Set("Content-Type", mimetype)
		w.Header().Set("Content-Length", strconv.Itoa(len(image)))

		_, err = w.Write(image)
	}
}

func dumpRequestHeader(r *http.Request) {
	for name, headers := range r.Header {
		name = strings.ToLower(name)
		for _, h := range headers {
			fmt.Printf("%v: %v\n", name, h)
		}
	}
}
