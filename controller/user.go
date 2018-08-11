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

func GetUsers(w http.ResponseWriter, r *http.Request) {
	users, err := service.FindAllUsers()
	if err == nil {
		respondWithJSON(w, http.StatusOK, users)
		return
	}
	respondWithError(w, http.StatusInternalServerError, "Cound not read users")
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
		respondWithError(w, http.StatusNotFound, "user not found")
		return
	}
	respondWithJSON(w, http.StatusOK, user)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	user := &model.User{}
	err := json.NewDecoder(r.Body).Decode(user)
	if err != nil {
		log.Println("WARN cannot decode request", err)
		respondWithError(w, http.StatusBadRequest, "bad request")
		return
	}
	user, err = service.CreateUser(*user)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "bad request")
		return
	}
	respondWithJSON(w, http.StatusCreated, user)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	user := &model.User{}
	err := json.NewDecoder(r.Body).Decode(user)
	if err != nil {
		log.Println("WARN cannot decode request", err)
		respondWithError(w, http.StatusBadRequest, "bad request")
		return
	}
	user, err = service.UpdateUser(*user)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "bad request")
		return
	}
	respondWithJSON(w, http.StatusOK, user)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid user ID")
		return
	}
	if service.DeleteUser(int64(id)) != nil {
		respondWithError(w, http.StatusBadRequest, "cannot delete user")
		return
	}
	respond(w, http.StatusOK)
}
