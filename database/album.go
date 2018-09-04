package database

import "go2music/model"

type AlbumManager interface {
	CreateAlbum(album model.Album) (model.Album, error)
	CreateIfNotExistsAlbum(album model.Album) (model.Album, error)
	UpdateAlbum(album model.Album) (model.Album, error)
	DeleteAlbum(id string) error
	FindAlbumById(id string) (model.Album, error)
	FindAlbumByPath(path string) (model.Album, error)
	FindAllAlbums() ([]model.Album, error)
}
