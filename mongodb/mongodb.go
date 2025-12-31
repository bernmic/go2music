package mongodb

import (
	"go2music/configuration"
	"go2music/model"
	"strings"

	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type MongoDB struct {
	Client              *mongo.Client
	SongsCollection     *mongo.Collection
	UsersCollection     *mongo.Collection
	PlaylistsCollection *mongo.Collection
}

func NewMongoDB() (*MongoDB, error) {
	c := configuration.Configuration(false)
	db := MongoDB{}
	db.Client, _ = mongo.Connect(options.Client().ApplyURI(c.Database.Url))
	db.SongsCollection = db.Client.Database(c.Database.Schema).Collection("songs")
	db.UsersCollection = db.Client.Database(c.Database.Schema).Collection("users")
	db.PlaylistsCollection = db.Client.Database(c.Database.Schema).Collection("playlists")
	_, cnt, err := db.FindAllUsers("", model.Paging{})
	if err != nil {
		log.Error("Could not access users collection: %s", err)
		return nil, err
	}
	if cnt == 0 {
		// users collection is empty. set up default users
		_, err = db.CreateUser(model.User{Username: "user", Password: "user", Role: "user", Email: "user@example.com"})
		if err != nil {
			log.Errorf("Error adding user 'user': %v", err)
		}
		_, err = db.CreateUser(model.User{Username: "admin", Password: "admin", Role: "admin", Email: "admin@example.com"})
		if err != nil {
			log.Errorf("Error adding user 'admin': %v", err)
		}
		_, err = db.CreateUser(model.User{Username: "guest", Password: "guest", Role: "guest", Email: "guest@example.com"})
		if err != nil {
			log.Errorf("Error adding user 'guest': %v", err)
		}
		_, err = db.CreateUser(model.User{Username: "editor", Password: "editor", Role: "editor", Email: "editor@example.com"})
		if err != nil {
			log.Errorf("Error adding user 'editor': %v", err)
		}
	}
	return &db, nil
}

// -------------------------------------------------
// utils for mongodb
// -------------------------------------------------

func buildSort(paging model.Paging) bson.D {
	sort := bson.D{}
	if paging.Sort == "" {
		return sort
	}
	sortItems := strings.Split(paging.Sort, ",")
	sortDir := 1
	if paging.Direction == "desc" {
		sortDir = -1
	}
	for _, sortItem := range sortItems {
		if sortItem == "Imdb" {
			sortItem = "ProviderIds.Tmdb"
		}
		sort = append(sort, bson.E{Key: sortItem, Value: sortDir})
	}
	return sort
}

func buildFilter(filterMap map[string]string) bson.M {
	filter := bson.M{}
	for k, v := range filterMap {
		if k == "all" {
			filter["title"] = bson.Regex{Pattern: v, Options: "i"}
		} else {
			filter[k] = bson.Regex{Pattern: v, Options: "i"}
		}
	}
	return filter
}
