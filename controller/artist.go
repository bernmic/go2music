package controller

import (
	"github.com/gorilla/mux"
	"go2music/service"
	"net/http"
	"strconv"
)

func GetArtists(w http.ResponseWriter, r *http.Request) {
	artists, err := service.FindAllArtists()
	if err == nil {
		respondWithJSON(w, 200, artists)
		return
	}
	respondWithError(w, 500, "Cound not read artists")
}

func GetArtist(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid artist ID")
		return
	}
	artist, err := service.FindArtistById(int64(id))
	if err != nil {
		respondWithError(w, 404, "artist not found")
		return
	}
	respondWithJSON(w, 200, artist)
}

func GetSongForArtist(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid artist ID")
		return
	}
	songs, err := service.FindSongsByArtistId(id)
	if err == nil {
		respondWithJSON(w, 200, songs)
		return
	}
	respondWithError(w, 500, "Cound not read songs")
}
