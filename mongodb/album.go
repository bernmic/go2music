package mongodb

import (
	"context"
	"go2music/model"
	"time"

	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func (db *MongoDB) CreateAlbum(album model.Album) (*model.Album, error) {
	return &album, nil
}

func (db *MongoDB) CreateIfNotExistsAlbum(album model.Album) (*model.Album, error) {
	// log.Fatalf("CreateIfNotExistsAlbum not implemented")
	return &album, nil
}

func (db *MongoDB) UpdateAlbum(album model.Album) (*model.Album, error) {
	log.Fatalf("UpdateAlbum not implemented")
	return &album, nil
}

func (db *MongoDB) DeleteAlbum(id string) error {
	log.Fatalf("DeleteAlbum not implemented")
	return nil
}

func (db *MongoDB) FindAlbumById(id string) (*model.Album, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	result := model.Song{}
	err := db.SongsCollection.FindOne(ctx, bson.D{{"album.id", id}}).Decode(&result)
	if err != nil {
		log.Warnf("album not found: %s", id)
		return nil, err
	}
	return result.Album, nil
}

func (db *MongoDB) FindAlbumByPath(path string) (*model.Album, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	result := model.Song{}
	err := db.SongsCollection.FindOne(ctx, bson.D{{"album.path", path}}).Decode(&result)
	if err != nil {
		log.Warnf("album not found: %s", path)
		return nil, err
	}
	return result.Album, nil
}

type AlbumID struct {
	Id model.Album `json:"ID,omitempty" bson:"_id"`
}

func (db *MongoDB) FindAllAlbums(filter string, paging model.Paging, titleMode string) ([]*model.Album, int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	findOptions := options.Find().SetProjection(bson.D{{"album", 1}})
	findOptions.SetSort(buildSort(paging))
	pageSize := int64(paging.Size)
	if pageSize == 0 {
		pageSize = int64(10)
	}
	if pageSize >= 0 {
		findOptions.SetLimit(pageSize)
		findOptions.SetSkip(pageSize * int64(paging.Page))
	}
	filterMap := make(map[string]string)
	if filter != "" {
		// add meaningful filter like title, artistName or albumTitle
		filterMap["album.title"] = filter
	}
	matchStage := bson.D{{"$match", buildFilter(filterMap)}}
	groupStage := bson.D{{"$group", bson.D{{"_id", bson.D{{"id", "$album.id"}, {"title", "$album.title"}, {"path", "$album.path"}, {"mbid", "$album.mbid"}, {"info", "$album.info"}}}}}}
	sortStage := bson.D{{"$sort", bson.D{{"_id.title", 1}}}}
	cur, err := db.SongsCollection.Aggregate(ctx, mongo.Pipeline{matchStage, groupStage, sortStage})
	if err != nil {
		return nil, 0, err
	}
	defer func() {
		err := cur.Close(ctx)
		if err != nil {
			log.Warning("failed to close cursor")
		}
	}()
	albums := make([]*model.Album, 0)
	for cur.Next(ctx) {
		var a AlbumID
		if err := cur.Decode(&a); err != nil {
			return nil, 0, err
		}
		albums = append(albums, &a.Id)
	}
	if err := cur.Err(); err != nil {
		return nil, 0, err
	}
	return albums, len(albums), nil
}

func (db *MongoDB) FindAlbumsForArtist(artistId string) ([]*model.Album, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	filterMap := make(map[string]string)
	filterMap["artist.id"] = artistId
	matchStage := bson.D{{"$match", buildFilter(filterMap)}}
	groupStage := bson.D{{"$group", bson.D{{"_id", bson.D{{"id", "$album.id"}, {"title", "$album.title"}, {"path", "$album.path"}, {"mbid", "$album.mbid"}, {"info", "$album.info"}}}}}}
	sortStage := bson.D{{"$sort", bson.D{{"_id.title", 1}}}}
	cur, err := db.SongsCollection.Aggregate(ctx, mongo.Pipeline{matchStage, groupStage, sortStage})
	if err != nil {
		return nil, err
	}
	defer func() {
		err := cur.Close(ctx)
		if err != nil {
			log.Warning("failed to close cursor")
		}
	}()
	albums := make([]*model.Album, 0)
	for cur.Next(ctx) {
		var a AlbumID
		if err := cur.Decode(&a); err != nil {
			return nil, err
		}
		albums = append(albums, &a.Id)
	}
	if err := cur.Err(); err != nil {
		return nil, err
	}
	return albums, nil
}

func (db *MongoDB) FindAlbumsWithoutSongs() ([]*model.Album, error) {
	//log.Fatalf("FindAlbumsWithoutSongs not implemented")
	// cannot happen because album is embedded in song
	return nil, nil
}

func (db *MongoDB) FindAlbumsWithoutTitle() ([]*model.Album, error) {
	// todo
	log.Errorf("FindAlbumsWithoutTitle not implemented")
	return nil, nil
}
