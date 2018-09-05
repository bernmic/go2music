package mongodb

import (
	"github.com/globalsign/mgo/bson"
	"go2music/model"
)

type albumInternal struct {
	Id    bson.ObjectId `bson:"_id"`
	Title string
	Path  string
}

func (db *MongoDB) initializeAlbum() {
}

func (db *MongoDB) CreateAlbum(album model.Album) (model.Album, error) {
	ai := toInternal(album)
	//ai.Id = bson.NewObjectId()
	err := db.C(COLLECTION_ALBUM).Insert(album)
	return fromInternal(ai, err)
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
	var album albumInternal
	err := db.C(COLLECTION_ALBUM).FindId(bson.ObjectIdHex(id)).One(&album)
	return fromInternal(album, err)
}

func (db *MongoDB) FindAlbumByPath(path string) (model.Album, error) {
	var album model.Album
	err := db.C(COLLECTION_ALBUM).Find(bson.M{"path": path}).One(&album)
	return album, err
}

func (db *MongoDB) FindAllAlbums() ([]model.Album, error) {
	var ai []albumInternal
	err := db.C(COLLECTION_ALBUM).Find(bson.M{}).All(&ai)
	var albums []model.Album
	if err == nil {
		for _, a := range ai {
			al, _ := fromInternal(a, nil)
			albums = append(albums, al)
		}
	}
	return albums, err
}

func toInternal(album model.Album) albumInternal {
	var ai albumInternal
	if album.Id == "" {
		ai = albumInternal{bson.NewObjectId(), album.Title, album.Path}

	} else {
		ai = albumInternal{bson.ObjectIdHex(album.Id), album.Title, album.Path}
	}
	return ai
}

func fromInternal(album albumInternal, err error) (model.Album, error) {
	if err != nil {
		return model.Album{}, err
	}
	ae := model.Album{album.Id.Hex(), album.Title, album.Path}
	return ae, nil
}
