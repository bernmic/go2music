package mongodb

import (
	"errors"
	"github.com/globalsign/mgo"
	"go2music/configuration"
	"go2music/service"
)

const (
	COLLECTION_ALBUM    = "album"
	COLLECTION_ARTIST   = "artist"
	COLLECTION_PLAYLIST = "playlist"
	COLLECTION_SONG     = "song"
	COLLECTION_USER     = "user"
)

type MongoDB struct {
	mgo.Database
}

var database MongoDB

func New() (*MongoDB, error) {
	c := configuration.Configuration()
	session, err := mgo.Dial(c.Database.Url)
	if err != nil {
		return nil, errors.New("unsable to open MongoDB database :" + c.Database.Url)
	}
	mongoDB := session.DB(c.Database.Schema)
	database = MongoDB{*mongoDB}
	database.initializeAlbum()
	return &database, nil
}
