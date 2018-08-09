package main

import (
	"fmt"
	"go2music/route"
	"go2music/service"
)

func main() {
	service.InitializeDatabase()
	serveraddress := fmt.Sprintf(":%d", service.GetConfiguration().Server.Port)
	route.Run(serveraddress)
}
