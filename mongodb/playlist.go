package mongodb

import (
	"go2music/model"

	log "github.com/sirupsen/logrus"
)

func (db *MongoDB) CreatePlaylist(playlist model.Playlist) (*model.Playlist, error) {
	log.Fatalf("CreatePlaylist not implemented")
	return &playlist, nil
}

func (db *MongoDB) CreateIfNotExistsPlaylist(playlist model.Playlist) (*model.Playlist, error) {
	log.Fatalf("CreateIfNotExistsPlaylist not implemented")
	return &playlist, nil
}

func (db *MongoDB) UpdatePlaylist(playlist model.Playlist) (*model.Playlist, error) {
	log.Fatalf("UpdatePlaylist not implemented")
	return &playlist, nil
}

func (db *MongoDB) DeletePlaylist(id string, userId string) error {
	log.Fatalf("DeletePlaylist not implemented")
	return nil
}

func (db *MongoDB) FindPlaylistById(id string, userId string) (*model.Playlist, error) {
	log.Fatalf("FindPlaylistById not implemented")
	return nil, nil
}

func (db *MongoDB) FindPlaylistByName(name string, userId string) (*model.Playlist, error) {
	log.Fatalf("FindPlaylistByName not implemented")
	return nil, nil
}

func (db *MongoDB) FindAllPlaylistsOfKind(userId string, kind string, paging model.Paging) ([]*model.Playlist, int, error) {
	log.Fatalf("FindAllPlaylistsOfKind not implemented")
	return nil, 0, nil
}

func (db *MongoDB) AddSongsToPlaylist(playlistId string, songIds []string) int {
	log.Fatalf("AddSongsToPlaylist not implemented")
	return 0
}

func (db *MongoDB) RemoveSongsFromPlaylist(playlistId string, songIds []string) int {
	log.Fatalf("RemoveSongsFromPlaylist not implemented")
	return 0
}

func (db *MongoDB) SetSongsOfPlaylist(playlistId string, songIds []string) (int, int) {
	log.Fatalf("SetSongsOfPlaylist not implemented")
	return 0, 0
}
