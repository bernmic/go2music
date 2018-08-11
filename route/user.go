package route

import (
	"github.com/gorilla/mux"
	"go2music/controller"
)

func SetupUserRoutes(router *mux.Router) *mux.Router {
	userRouter := router.PathPrefix("/api/user").Subrouter()
	userRouter.HandleFunc("", controller.GetUsers).Methods("GET")
	userRouter.HandleFunc("/{id}", controller.GetUser).Methods("GET")
	userRouter.HandleFunc("", controller.CreateUser).Methods("POST")
	userRouter.HandleFunc("", controller.UpdateUser).Methods("PUT")
	userRouter.HandleFunc("/{id}", controller.DeleteUser).Methods("DELETE")
	return router
}
