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
