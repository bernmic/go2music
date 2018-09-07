package database

import "go2music/model"

type PlaylistManager interface {
	CreatePlaylist(playlist model.Playlist) (*model.Playlist, error)
	CreateIfNotExistsPlaylist(playlist model.Playlist) (*model.Playlist, error)
	UpdatePlaylist(playlist model.Playlist) (*model.Playlist, error)
	DeletePlaylist(id string, user_id string) error
	FindPlaylistById(id string, user_id string) (*model.Playlist, error)
	FindPlaylistByName(name string, user_id string) (*model.Playlist, error)
	FindAllPlaylists(user_id string) ([]*model.Playlist, error)
}
