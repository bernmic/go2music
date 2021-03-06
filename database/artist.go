package database

import "go2music/model"

// ArtistManager defines all database functions for artists
type ArtistManager interface {
	CreateArtist(artist model.Artist) (*model.Artist, error)
	CreateIfNotExistsArtist(artist model.Artist) (*model.Artist, error)
	UpdateArtist(artist model.Artist) (*model.Artist, error)
	DeleteArtist(id string) error
	FindArtistById(id string) (*model.Artist, error)
	FindArtistByName(name string) (*model.Artist, error)
	FindAllArtists(filter string, paging model.Paging) ([]*model.Artist, int, error)
	FindArtistsWithoutName() ([]*model.Artist, error)
}
