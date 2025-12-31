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

func (db *MongoDB) CreateArtist(artist model.Artist) (*model.Artist, error) {
	return &artist, nil
}

func (db *MongoDB) CreateIfNotExistsArtist(artist model.Artist) (*model.Artist, error) {
	// log.Fatalf("CreateIfNotExistsArtist not implemented")
	return &artist, nil
}

func (db *MongoDB) UpdateArtist(artist model.Artist) (*model.Artist, error) {
	log.Fatalf("UpdateArtist not implemented")
	return &artist, nil
}

func (db *MongoDB) DeleteArtist(id string) error {
	log.Fatalf("DeleteArtist not implemented")
	return nil
}

func (db *MongoDB) FindArtistById(id string) (*model.Artist, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	result := model.Song{}
	err := db.SongsCollection.FindOne(ctx, bson.D{{"artist.id", id}}).Decode(&result)
	if err != nil {
		log.Warnf("artist not found: %s", id)
		return nil, err
	}
	return result.Artist, nil
}

func (db *MongoDB) FindArtistByName(name string) (*model.Artist, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	result := model.Song{}
	err := db.SongsCollection.FindOne(ctx, bson.D{{"artist.name", name}}).Decode(&result)
	if err != nil {
		log.Warnf("artist not found: %s", name)
		return nil, err
	}
	return result.Artist, nil
}

type ArtistID struct {
	Id model.Artist `json:"ID,omitempty" bson:"_id"`
}

func (db *MongoDB) FindAllArtists(filter string, paging model.Paging) ([]*model.Artist, int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	findOptions := options.Find().SetProjection(bson.D{{"artist", 1}})
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
		filterMap["artist.name"] = filter
	}
	matchStage := bson.D{{"$match", buildFilter(filterMap)}}
	groupStage := bson.D{{"$group", bson.D{{"_id", bson.D{{"id", "$artist.id"}, {"name", "$artist.name"}, {"mbid", "$artist.mbid"}, {"info", "$artist.info"}}}}}}
	sortStage := bson.D{{"$sort", bson.D{{"_id.name", 1}}}}
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
	// artists := make([]*model.Artist, 0)
	artists := make([]*model.Artist, 0)
	for cur.Next(ctx) {
		var a ArtistID
		if err := cur.Decode(&a); err != nil {
			return nil, 0, err
		}
		artists = append(artists, &a.Id)
	}
	if err := cur.Err(); err != nil {
		return nil, 0, err
	}
	return artists, len(artists), nil
}

func (db *MongoDB) FindArtistsWithoutName() ([]*model.Artist, error) {
	// todo
	log.Errorf("FindArtistsWithoutName not implemented")
	return nil, nil
}
