package route

import (
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
	"go2music/controller"
	"log"
	"net/http"
)

func Init() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/api/authenticate", controller.Authenticate).Methods("POST")
	fs := http.FileServer(http.Dir("static"))
	router.Handle("/", fs)

	authRouter := mux.NewRouter()
	authRouter = SetupAlbumRoutes(authRouter)
	authRouter = SetupArtistRoutes(authRouter)
	authRouter = SetupSongRoutes(authRouter)
	authRouter = SetupPlaylistRoutes(authRouter)
	an := negroni.New(negroni.HandlerFunc(controller.AuthMiddeware), negroni.Wrap(authRouter))
	router.PathPrefix("/api").Handler(an)

	return router
}

func Run(addr string) {
	log.Print("Start Router on port " + addr)
	r := Init()
	n := negroni.Classic()
	n.UseHandler(r)
	n.Run(addr)

	// log.Fatal(http.ListenAndServe(addr, Init()))
}
