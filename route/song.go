package route

import (
	"github.com/gorilla/mux"
	"go2music/controller"
)

func SetupSongRoutes(router *mux.Router) *mux.Router {
	songRouter := router.PathPrefix("/api/song").Subrouter()
	songRouter.HandleFunc("", controller.GetSongs).Methods("GET")
	songRouter.HandleFunc("/{id}", controller.GetSong).Methods("GET")
	songRouter.HandleFunc("/{id}/stream", controller.StreamSong).Methods("GET")
	songRouter.HandleFunc("/{id}/cover", controller.GetCover).Methods("GET")
	return router
}
