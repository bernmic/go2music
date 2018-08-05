package controller

import (
	"github.com/gorilla/mux"
	"go2music/service"
	"net/http"
	"strconv"
)

func GetAlbums(w http.ResponseWriter, r *http.Request) {
	albums, err := service.FindAllAlbums()
	if err == nil {
		respondWithJSON(w, 200, albums)
		return
	}
	respondWithError(w, 500, "Cound not read albums")
}

func GetAlbum(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid album ID")
		return
	}
	album, err := service.FindAlbumById(int64(id))
	if err != nil {
		respondWithError(w, 404, "album not found")
		return
	}
	respondWithJSON(w, 200, album)
}

func GetSongForAlbum(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid album ID")
		return
	}
	songs, err := service.FindSongsByAlbumId(id)
	if err == nil {
		respondWithJSON(w, 200, songs)
		return
	}
	respondWithError(w, 500, "Cound not read songs")
}

func GetCoverForAlbum(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid album ID")
		return
	}
	songs, err := service.FindSongsByAlbumId(id)
	if err != nil {
		respondWithError(w, 404, "album not found")
		return
	}
	if len(songs) > 0 {
		image, mimetype, _ := service.GetCoverForSong(songs[0])

		if image != nil {
			w.Header().Set("Content-Type", mimetype)
			w.Header().Set("Content-Length", strconv.Itoa(len(image)))

			_, err = w.Write(image)
		}
	}
	respondWithError(w, http.StatusNotFound, "No cover found")
}
