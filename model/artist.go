package model

type Artist struct {
	Id   int64  `json:"artistId,omitempty"`
	Name string `json:"name,omitempty"`
}

type ArtistCollection struct {
	Artists []*Artist `json:"artists,omitempty"`
	Paging
}
