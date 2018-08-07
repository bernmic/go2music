package controller

import (
	"github.com/gorilla/mux"
	"go2music/service"
	"net/http"
	"strconv"
)

func GetPlaylists(w http.ResponseWriter, r *http.Request) {
	playlists, err := service.FindAllPlaylists()
	if err == nil {
		respondWithJSON(w, 200, playlists)
		return
	}
	respondWithError(w, 500, "Cound not read playlists")
}

func GetPlaylist(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid playlist ID")
		return
	}
	playlist, err := service.FindPlaylistById(int64(id))
	if err != nil {
		respondWithError(w, 404, "playlist not found")
		return
	}
	respondWithJSON(w, 200, playlist)
}

func GetSongsForPlaylist(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid playlist ID")
		return
	}
	playlist, err := service.FindPlaylistById(int64(id))
	if err != nil {
		respondWithError(w, 404, "playlist not found")
		return
	}

	songs, err := service.FindSongsByPlaylistQuery(playlist.Query)
	if err == nil {
		respondWithJSON(w, 200, songs)
		return
	}
	respondWithError(w, 500, "Cound not read songs of playlist")
}
