package database

import "go2music/model"

type PlaylistManager interface {
	CreatePlaylist(playlist model.Playlist) (*model.Playlist, error)
	CreateIfNotExistsPlaylist(playlist model.Playlist) (*model.Playlist, error)
	UpdatePlaylist(playlist model.Playlist) (*model.Playlist, error)
	DeletePlaylist(id string) error
	FindPlaylistById(id string) (*model.Playlist, error)
	FindPlaylistByName(name string) (*model.Playlist, error)
	FindAllPlaylists() ([]*model.Playlist, error)
}
