package model

// Album is the representation of an artist with its name
type Artist struct {
	Id   string `json:"artistId,omitempty"`
	Name string `json:"name,omitempty"`
}

// AlbumCollection is a list of artists with paging informations
type ArtistCollection struct {
	Artists []*Artist `json:"artists,omitempty"`
	Paging  Paging    `json:"paging,omitempty"`
	Total   int       `json:"total,omitempty"`
}
