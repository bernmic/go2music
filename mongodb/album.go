package mongodb

import (
	"github.com/globalsign/mgo/bson"
	"go2music/model"
)

func (db *MongoDB) initializeAlbum() {
}

func (db *MongoDB) CreateAlbum(album model.Album) (model.Album, error) {
	album.Id = bson.NewObjectId().Hex()
	err := db.C(COLLECTION_ALBUM).Insert(album)
	return album, err
}

func (db *MongoDB) CreateIfNotExistsAlbum(album model.Album) (model.Album, error) {
	err := db.C(COLLECTION_ALBUM).Insert(album)
	return album, err
}

func (db *MongoDB) UpdateAlbum(album model.Album) (model.Album, error) {
	err := db.C(COLLECTION_ALBUM).UpdateId(album.Id, &album)
	return album, err
}

func (db *MongoDB) DeleteAlbum(id string) error {
	var album model.Album
	err := db.C(COLLECTION_ALBUM).FindId(bson.ObjectIdHex(id)).One(&album)
	if err == nil {
		err = db.C(COLLECTION_ALBUM).Remove(&album)
	}
	return err
}

func (db *MongoDB) FindAlbumById(id string) (model.Album, error) {
	var album model.Album
	err := db.C(COLLECTION_ALBUM).FindId(bson.ObjectIdHex(id)).One(&album)
	return album, err
}

func (db *MongoDB) FindAlbumByPath(path string) (model.Album, error) {
	var album model.Album
	err := db.C(COLLECTION_ALBUM).Find(bson.M{"path": path}).One(&album)
	return album, err
}

func (db *MongoDB) FindAllAlbums() ([]model.Album, error) {
	var albums []model.Album
	err := db.C(COLLECTION_ALBUM).Find(bson.M{}).All(&albums)
	return albums, err
}
