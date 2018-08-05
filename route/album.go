package route

import (
	"github.com/gorilla/mux"
	"go2music/controller"
)

func SetupAlbumRoutes(router *mux.Router) *mux.Router {
	router.HandleFunc("/album", controller.GetAlbums).Methods("GET")
	router.HandleFunc("/album/{id}", controller.GetAlbum).Methods("GET")
	return router
}
