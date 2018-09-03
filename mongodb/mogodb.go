package mongodb

import (
	"errors"
	"github.com/globalsign/mgo"
	"go2music/service"
)

type MongoDB struct {
	mgo.Database
}

var database MongoDB

func New() (*MongoDB, error) {
	c := service.Configuration()
	session, err := mgo.Dial(c.Database.Url)
	if err != nil {
		return nil, errors.New("unsable to open MongoDB database :" + c.Database.Url)
	}
	mongoDB := session.DB(c.Database.Schema)
	database = MongoDB{*mongoDB}
	database.initializeAlbum()
	return &database, nil
}
