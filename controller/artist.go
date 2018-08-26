package controller

import (
	"github.com/gorilla/mux"
	"go2music/model"
	"go2music/service"
	"net/http"
	"strconv"
)

func GetArtists(w http.ResponseWriter, r *http.Request) {
	artists, err := service.FindAllArtists()
	if err == nil {
		artistCollection := model.ArtistCollection{Artists: artists}
		respondWithJSON(w, http.StatusOK, artistCollection)
		return
	}
	respondWithError(w, http.StatusInternalServerError, "Cound not read artists")
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
		respondWithError(w, http.StatusNotFound, "artist not found")
		return
	}
	respondWithJSON(w, http.StatusOK, artist)
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
		respondWithJSON(w, http.StatusOK, songs)
		return
	}
	respondWithError(w, http.StatusInternalServerError, "Cound not read songs")
}
