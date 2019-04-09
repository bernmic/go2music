package database

import "go2music/model"

type AlbumManager interface {
	CreateAlbum(album model.Album) (*model.Album, error)
	CreateIfNotExistsAlbum(album model.Album) (*model.Album, error)
	UpdateAlbum(album model.Album) (*model.Album, error)
	DeleteAlbum(id string) error
	FindAlbumById(id string) (*model.Album, error)
	FindAlbumByPath(path string) (*model.Album, error)
	FindAllAlbums(filter string, paging model.Paging, titleMode string) ([]*model.Album, int, error)
	FindAlbumsForArtist(artistId string) ([]*model.Album, error)
	FindAlbumsWithoutSongs() ([]*model.Album, error)
}
