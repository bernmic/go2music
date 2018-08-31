package main

import (
	"go2music/controller"
	"go2music/service"
)

func main() {
	service.InitializeDatabase()
	controller.Run()
}
