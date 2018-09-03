package mongodb

import (
	"github.com/globalsign/mgo/bson"
	log "github.com/sirupsen/logrus"
	"go2music/model"
	"strconv"
)

const (
	COLLECTION = "album"
)

func (db *MongoDB) initializeAlbum() {
}

func (db *MongoDB) CreateAlbum(album model.Album) (*model.Album, error) {
	err := db.C(COLLECTION).Insert(album)
	return &album, err
}

func (db *MongoDB) CreateIfNotExistsAlbum(album model.Album) (*model.Album, error) {
	err := db.C(COLLECTION).Insert(album)
	return &album, err
}

func (db *MongoDB) UpdateAlbum(album model.Album) (*model.Album, error) {
	err := db.C(COLLECTION).UpdateId(album.Id, &album)
	return nil, err
}

func (db *MongoDB) DeleteAlbum(id int64) error {
	var album model.Album
	err := db.C(COLLECTION).FindId(bson.ObjectIdHex(strconv.FormatInt(id, 10))).One(&album)
	if err == nil {
		err = db.C(COLLECTION).Remove(&album)
	}
	return err
}

func (db *MongoDB) FindAlbumById(id int64) (*model.Album, error) {
	var album model.Album
	err := db.C(COLLECTION).FindId(bson.ObjectIdHex(strconv.FormatInt(id, 10))).One(&album)
	return &album, err
}

func (db *MongoDB) FindAlbumByPath(path string) (*model.Album, error) {
	log.Info("Not implemented yet")
	return nil, nil
}

func (db *MongoDB) FindAllAlbums() ([]*model.Album, error) {
	albums := make([]*model.Album, 0)
	err := db.C(COLLECTION).Find(bson.M{}).All(albums)
	return albums, err
}
