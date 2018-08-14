package controller

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"go2music/model"
	"go2music/service"
	"log"
	"net/http"
	"strconv"
)

func GetPlaylists(w http.ResponseWriter, r *http.Request) {
	playlists, err := service.FindAllPlaylists()
	if err == nil {
		playlistCollection := model.PlaylistCollection{Playlists: playlists}
		respondWithJSON(w, 200, playlistCollection)
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

func CreatePlaylist(w http.ResponseWriter, r *http.Request) {
	playlist := &model.Playlist{}
	err := json.NewDecoder(r.Body).Decode(playlist)
	if err != nil {
		log.Println("WARN cannot decode request", err)
		respondWithError(w, http.StatusBadRequest, "bad request")
		return
	}
	playlist, err = service.CreatePlaylist(*playlist)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "bad request")
		return
	}
	respondWithJSON(w, http.StatusCreated, playlist)
}

func UpdatePlaylist(w http.ResponseWriter, r *http.Request) {
	playlist := &model.Playlist{}
	err := json.NewDecoder(r.Body).Decode(playlist)
	if err != nil {
		log.Println("WARN cannot decode request", err)
		respondWithError(w, http.StatusBadRequest, "bad request")
		return
	}
	playlist, err = service.UpdatePlaylist(*playlist)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "bad request")
		return
	}
	respondWithJSON(w, http.StatusOK, playlist)
}

func DeletePlaylist(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid playlist ID")
		return
	}
	if service.DeletePlaylist(int64(id)) != nil {
		respondWithError(w, http.StatusBadRequest, "cannot delete playlist")
		return
	}
	respond(w, http.StatusOK)
}
