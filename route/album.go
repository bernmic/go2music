package route

import (
	"github.com/gorilla/mux"
	"go2music/controller"
)

func SetupAlbumRoutes(router *mux.Router) *mux.Router {
	albumRouter := router.PathPrefix("/api/album").Subrouter()
	albumRouter.HandleFunc("", controller.GetAlbums).Methods("GET")
	albumRouter.HandleFunc("/{id}", controller.GetAlbum).Methods("GET")
	albumRouter.HandleFunc("/{id}/songs", controller.GetSongForAlbum).Methods("GET")
	albumRouter.HandleFunc("/{id}/cover", controller.GetCoverForAlbum).Methods("GET")
	return router
}
