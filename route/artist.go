package route

import (
	"github.com/gorilla/mux"
	"go2music/controller"
)

func SetupArtistRoutes(router *mux.Router) *mux.Router {
	router.HandleFunc("/artist", controller.GetArtists).Methods("GET")
	router.HandleFunc("/artist/{id}", controller.GetArtist).Methods("GET")
	router.HandleFunc("/artist/{id}/songs", controller.GetSongForArtist).Methods("GET")
	return router
}
