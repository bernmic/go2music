package main

import (
	"fmt"
	"go2music/configuration"
	"go2music/model"
	"go2music/mongodb"
	"os"
)

func main() {
	c := configuration.Configuration()
	c.Database.Url = "localhost"
	db, err := mongodb.New()
	if err != nil {
		fmt.Println("no database access")
		os.Exit(1)
	}
	fmt.Println("MUH - " + db.Name)
	savedAlbum, err := db.CreateAlbum(model.Album{"", "Test Album", "/path/to/album"})
	fmt.Printf("savedAlbum = %v --- %v\n", savedAlbum, err)

	albums, err := db.FindAllAlbums()

	fmt.Println("Len = %d\n", len(albums))
	for _, album := range albums {
		fmt.Printf("%v\n", album)
	}

	findAlbum, err := db.FindAlbumById(savedAlbum.Id)
	fmt.Printf("findAlbum %s = %v --- %v\n", savedAlbum.Id, findAlbum, err)
}
