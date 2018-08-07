package route

import (
	"github.com/gorilla/mux"
	"go2music/controller"
)

func SetupArtistRoutes(router *mux.Router) *mux.Router {
	artistRouter := router.PathPrefix("/api/artist").Subrouter()
	artistRouter.HandleFunc("", controller.GetArtists).Methods("GET")
	artistRouter.HandleFunc("/{id}", controller.GetArtist).Methods("GET")
	artistRouter.HandleFunc("/{id}/songs", controller.GetSongForArtist).Methods("GET")
	return router
}
