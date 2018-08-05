package route

import (
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

func Init() *mux.Router {
	router := mux.NewRouter()
	router = SetupAlbumRoutes(router)
	router = SetupArtistRoutes(router)
	router = SetupSongRoutes(router)
	fs := http.FileServer(http.Dir("static"))
	router.Handle("/", fs)
	return router
}

func Run(addr string) {
	log.Print("Start Router on port " + addr)
	log.Fatal(http.ListenAndServe(addr, Init()))
}
