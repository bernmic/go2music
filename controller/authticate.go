package controller

import (
	"encoding/json"
	"go2music/service"
	"log"
	"net/http"
)

func Authenticate(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	authHeader := r.Header.Get("Authorization")
	user, err := service.AuthenticateRequest(authHeader)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	token, err := service.GenerateJWT(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(map[string]string{"token": token}); err != nil {
		panic(err)
	}
}

func AuthMiddeware(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	bearer := r.URL.Query().Get("bearer")
	if bearer != "" {
		r.Header.Set("Authorization", "Bearer "+bearer)
	}
	username, b := service.AuthenticateJWT(r.Header)
	if b {
		user, err := service.GetPrincipal(username)
		if err == nil && (user.Role == service.UserRole || user.Role == service.AdminRole) {
			log.Println("INFO Authorization OK - " + username + " with role " + user.Role)
			next(w, r)
			return
		}
	}
	respondWithError(w, 401, "Unauthorized")
}

func AdminMiddeware(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	username, b := service.AuthenticateJWT(r.Header)
	if b {
		user, err := service.GetPrincipal(username)
		if err == nil && user.Role == service.AdminRole {
			log.Println("INFO Authorization OK - " + username + " with role " + user.Role)
			next(w, r)
			return
		}
	}
	respondWithError(w, 401, "Unauthorized")
}
