package database

import "go2music/model"

type SongManager interface {
	CreateSong(song model.Song) (*model.Song, error)
	UpdateSong(song model.Song) (*model.Song, error)
	DeleteSong(id string) error
	SongExists(path string) bool
	FindOneSong(id string) (*model.Song, error)
	FindAllSongs(filter string, paging model.Paging) ([]*model.Song, int, error)
	FindSongsByAlbumId(findAlbumId string, paging model.Paging) ([]*model.Song, int, error)
	FindSongsByArtistId(findArtistId string, paging model.Paging) ([]*model.Song, int, error)
	FindSongsByPlaylist(playlistId string, paging model.Paging) ([]*model.Song, int, error)
	FindSongsByPlaylistQuery(query string, paging model.Paging) ([]*model.Song, int, error)
	GetCoverForSong(song *model.Song) ([]byte, string, error)
}
