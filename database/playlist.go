package database

import "go2music/model"

// PlaylistManager defines all database functions for playlists
type PlaylistManager interface {
	CreatePlaylist(playlist model.Playlist) (*model.Playlist, error)
	CreateIfNotExistsPlaylist(playlist model.Playlist) (*model.Playlist, error)
	UpdatePlaylist(playlist model.Playlist) (*model.Playlist, error)
	DeletePlaylist(id string, user_id string) error
	FindPlaylistById(id string, user_id string) (*model.Playlist, error)
	FindPlaylistByName(name string, user_id string) (*model.Playlist, error)
	FindAllPlaylistsOfKind(user_id string, kind string, paging model.Paging) ([]*model.Playlist, int, error)
	AddSongsToPlaylist(playlistId string, songIds []string) int
	RemoveSongsFromPlaylist(playlistId string, songIds []string) int
	SetSongsOfPlaylist(playlistId string, songIds []string) (int, int)
}
