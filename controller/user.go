package controller

import (
	"github.com/gorilla/mux"
	"go2music/service"
	"net/http"
	"strconv"
)

func GetUsers(w http.ResponseWriter, r *http.Request) {
	users, err := service.FindAllUsers()
	if err == nil {
		respondWithJSON(w, 200, users)
		return
	}
	respondWithError(w, 500, "Cound not read users")
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid user ID")
		return
	}
	user, err := service.FindUserById(int64(id))
	if err != nil {
		respondWithError(w, 404, "user not found")
		return
	}
	respondWithJSON(w, 200, user)
}
