package controller

import (
	"encoding/json"
	"go2music/service"
	"log"
	"net/http"
)

func Authenticate(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	authHeader := r.Header.Get("Authentication")
	if len(authHeader) == 0 || !service.AuthenticateRequest(authHeader) {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	token, err := service.GenerateJWT()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(token); err != nil {
		panic(err)
	}
}

func AuthMiddeware(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	b := service.AuthenticateJWT(r.Header)
	if b {
		log.Println("Before handler - OK")
	} else {
		log.Println("Before handler - NOK")
	}
	next(w, r)
	log.Println("After handler")
}
