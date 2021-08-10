package model

import "go2music/thirdparty"

// Artist is the representation of an artist with its name
type Artist struct {
	Id   string                       `json:"artistId,omitempty"`
	Name string                       `json:"name,omitempty"`
	Info *thirdparty.LastfmArtistInfo `json:"info,omitempty"`
}

// ArtistCollection is a list of artists with paging informations
type ArtistCollection struct {
	Artists []*Artist `json:"artists,omitempty"`
	Paging  Paging    `json:"paging,omitempty"`
	Total   int       `json:"total,omitempty"`
}
