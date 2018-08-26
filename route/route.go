package route

import (
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"go2music/controller"
	"log"
	"net/http"
	"os"
)

func Init() *mux.Router {
	router := mux.NewRouter()
	// add authenticate endpoint
	router.HandleFunc("/api/authenticate", controller.Authenticate).Methods("POST")
	router.HandleFunc("/token", controller.Authenticate).Methods("GET")
	fs := http.FileServer(http.Dir("./static"))
	router.Handle("/", fs)
	router.Handle("/{.*}", fs)

	// only admins are allowed to see users
	adminRouter := mux.NewRouter()
	adminRouter = SetupUserRoutes(adminRouter)
	adminMiddleware := negroni.New(negroni.HandlerFunc(controller.AdminMiddeware), negroni.Wrap(adminRouter))
	router.PathPrefix("/api/user").Handler(adminMiddleware)

	// protect API
	authRouter := mux.NewRouter()
	authRouter = SetupAlbumRoutes(authRouter)
	authRouter = SetupArtistRoutes(authRouter)
	authRouter = SetupSongRoutes(authRouter)
	authRouter = SetupPlaylistRoutes(authRouter)
	authMiddleware := negroni.New(negroni.HandlerFunc(controller.AuthMiddeware), negroni.Wrap(authRouter))
	router.PathPrefix("/api").Handler(authMiddleware)

	return router
}

func Run(addr string) {
	log.Println("INFO Start Router on port " + addr)
	r := Init()
	logger := negroni.NewLogger()
	logger.ALogger = log.New(os.Stdout, "", 0)
	logger.SetFormat("{{.StartTime}} INFO {{.Status}} | {{.Duration}} | {{.Hostname}} | {{.Method}} {{.Path}}")
	logger.SetDateFormat("2006-01-02 15:04:05")
	n := negroni.New(negroni.NewRecovery(), logger)
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"POST", "GET", "OPTIONS", "PUT", "DELETE"},
		AllowedHeaders: []string{"Accept", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization"},
	})
	n.Use(c)
	n.UseHandler(r)
	n.Run(addr)
}
