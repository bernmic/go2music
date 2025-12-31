package mongodb

import (
	"context"
	"go2music/model"
	"time"

	"github.com/rs/xid"
	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func (db *MongoDB) CreateSong(song model.Song) (*model.Song, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	song.Id = xid.New().String()
	_, err := db.UsersCollection.InsertOne(ctx, song)
	if err != nil {
		return nil, err
	}
	return &song, nil
}

func (db *MongoDB) CreateSongs(songs []*model.Song) ([]*model.Song, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	for i := 0; i < len(songs); i++ {
		songs[i].Id = xid.New().String()
	}
	_, err := db.SongsCollection.InsertMany(ctx, songs)
	if err != nil {
		return nil, err
	}
	return songs, nil
}

func (db *MongoDB) UpdateSong(song model.Song) (*model.Song, error) {
	log.Fatalf("update song not implemented")
	return &song, nil
}

func (db *MongoDB) DeleteSong(id string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	dr, err := db.SongsCollection.DeleteOne(ctx, bson.D{{"Id", id}})
	if err != nil {
		return err
	}
	if dr.DeletedCount != 1 {
		log.Warnf("expected to delete 1 song, deleted %d", dr.DeletedCount)
	}
	return nil
}

func (db *MongoDB) SongExists(path string) bool {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	result := model.Song{}
	err := db.SongsCollection.FindOne(ctx, bson.D{{"path", path}}).Decode(&result)
	if err != nil {
		return false
	}
	return true
}

func (db *MongoDB) FindOneSong(id string) (*model.Song, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	result := model.Song{}
	err := db.SongsCollection.FindOne(ctx, bson.D{{"id", id}}).Decode(&result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func (db *MongoDB) FindAllSongs(filter string, paging model.Paging) ([]*model.Song, int, error) {
	filterMap := make(map[string]string)
	if filter != "" {
		// add meaningful filter like title, artistName or albumTitle
		filterMap["title"] = filter
	}
	return db.findSongsWithFilter(filterMap, paging)
}

func (db *MongoDB) FindSongsByAlbumId(albumId string, paging model.Paging) ([]*model.Song, int, error) {
	filterMap := make(map[string]string)
	filterMap["album.id"] = albumId
	return db.findSongsWithFilter(filterMap, paging)
}

func (db *MongoDB) FindSongsByArtistId(artistId string, paging model.Paging) ([]*model.Song, int, error) {
	filterMap := make(map[string]string)
	filterMap["artist.id"] = artistId
	return db.findSongsWithFilter(filterMap, paging)
}

func (db *MongoDB) FindSongsByPlaylist(playlistId string, paging model.Paging) ([]*model.Song, int, error) {
	log.Fatalf("FindSongsByPlaylist not implemented")
	return nil, 0, nil
}

func (db *MongoDB) FindSongsByPlaylistQuery(query string, paging model.Paging) ([]*model.Song, int, error) {
	log.Fatalf("FindSongsByPlaylistQuery not implemented")
	return nil, 0, nil
}

func (db *MongoDB) FindSongsByYear(year string, paging model.Paging) ([]*model.Song, int, error) {
	filterMap := make(map[string]string)
	filterMap["yearpublished"] = year
	return db.findSongsWithFilter(filterMap, paging)
}

func (db *MongoDB) FindSongsByGenre(genre string, paging model.Paging) ([]*model.Song, int, error) {
	filterMap := make(map[string]string)
	filterMap["genre"] = genre
	return db.findSongsWithFilter(filterMap, paging)
}

func (db *MongoDB) GetCoverForSong(song *model.Song) ([]byte, string, error) {
	log.Fatalf("GetCoverForSong not implemented")
	return nil, "", nil
}

func (db *MongoDB) SongPlayed(song *model.Song, user *model.User) bool {
	log.Fatalf("SongPlayed not implemented")
	return false
}

func (db *MongoDB) GetAllSongIdsAndPaths() (map[string]string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	findOptions := options.Find().SetProjection(bson.D{{"id", 1}, {"path", 1}})
	cur, err := db.SongsCollection.Find(ctx, bson.D{}, findOptions)
	if err != nil {
		return nil, err
	}
	defer func() {
		err := cur.Close(ctx)
		if err != nil {
			log.Warning("failed to close cursor")
		}
	}()
	results := make(map[string]string)
	for cur.Next(ctx) {
		var result bson.M
		if err := cur.Decode(&result); err != nil {
			return nil, err
		}
		results[result["id"].(string)] = result["path"].(string)
	}

	return results, nil
}

func (db *MongoDB) findSongsWithFilter(filterMap map[string]string, paging model.Paging) ([]*model.Song, int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	findOptions := options.Find()
	findOptions.SetSort(buildSort(paging))
	pageSize := int64(paging.Size)
	if pageSize == 0 {
		pageSize = int64(10)
	}
	if pageSize >= 0 {
		findOptions.SetLimit(pageSize)
		findOptions.SetSkip(pageSize * int64(paging.Page))
	}
	cur, err := db.SongsCollection.Find(ctx, buildFilter(filterMap), findOptions)
	if err != nil {
		return nil, 0, err
	}
	defer func() {
		err := cur.Close(ctx)
		if err != nil {
			log.Warning("failed to close cursor")
		}
	}()
	songs := make([]*model.Song, 0)
	for cur.Next(ctx) {
		var result model.Song
		if err := cur.Decode(&result); err != nil {
			return nil, 0, err
		}
		songs = append(songs, &result)
	}
	if err := cur.Err(); err != nil {
		return nil, 0, err
	}
	return songs, len(songs), nil
}
