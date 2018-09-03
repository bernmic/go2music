package main

import (
	"fmt"
	"go2music/mongodb"
	"go2music/service"
	"os"
)

func main() {
	c := service.Configuration()
	c.Database.Url = "localhost"
	db, err := mongodb.New()
	if err != nil {
		fmt.Println("no database access")
		os.Exit(1)
	}
	fmt.Println("MUH" + db.Name)
}
