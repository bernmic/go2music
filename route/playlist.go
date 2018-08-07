package route

import (
	"github.com/gorilla/mux"
	"go2music/controller"
)

func SetupPlaylistRoutes(router *mux.Router) *mux.Router {
	artistRouter := router.PathPrefix("/api/playlist").Subrouter()
	artistRouter.HandleFunc("", controller.GetPlaylists).Methods("GET")
	artistRouter.HandleFunc("/{id}", controller.GetPlaylist).Methods("GET")
	artistRouter.HandleFunc("/{id}/songs", controller.GetSongsForPlaylist).Methods("GET")
	return router
}
