package model

type Artist struct {
	Id   int64  `json:"artistId,omitempty"`
	Name string `json:"name,omitempty"`
}

type ArtistCollection struct {
	Artists []*Artist `json:"artists,omitempty"`
	Paging
}

type ArtistManager interface {
	CreateArtist(artist Artist) (*Artist, error)
	CreateIfNotExistsArtist(artist Artist) (*Artist, error)
	UpdateArtist(artist Artist) (*Artist, error)
	DeleteArtist(id int64) error
	FindArtistById(id int64) (*Artist, error)
	FindArtistByName(name string) (*Artist, error)
	FindAllArtists() ([]*Artist, error)
}
