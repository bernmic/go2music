package route

import (
	"github.com/gorilla/mux"
	"go2music/controller"
)

func SetupSongRoutes(router *mux.Router) *mux.Router {
	router.HandleFunc("/song", controller.GetSongs).Methods("GET")
	router.HandleFunc("/song/{id}", controller.GetSong).Methods("GET")
	router.HandleFunc("/song/{id}/stream", controller.StreamSong).Methods("GET")
	router.HandleFunc("/song/{id}/cover", controller.GetCover).Methods("GET")
	return router
}
