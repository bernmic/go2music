package database

import "go2music/model"

type SongManager interface {
	CreateSong(song model.Song) (*model.Song, error)
	UpdateSong(song model.Song) (*model.Song, error)
	DeleteSong(id string) error
	SongExists(path string) bool
	FindOneSong(id string) (*model.Song, error)
	FindAllSongs(paging model.Paging) ([]*model.Song, error)
	FindSongsByAlbumId(findAlbumId string) ([]*model.Song, error)
	FindSongsByArtistId(findArtistId string) ([]*model.Song, error)
	FindSongsByPlaylist(playlistId string) ([]*model.Song, error)
	FindSongsByPlaylistQuery(query string) ([]*model.Song, error)
	GetCoverForSong(song *model.Song) ([]byte, string, error)
}
