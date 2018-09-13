package model

type Artist struct {
	Id   string `json:"artistId,omitempty"`
	Name string `json:"name,omitempty"`
}

type ArtistCollection struct {
	Artists []*Artist `json:"artists,omitempty"`
	Paging  Paging    `json:"paging,omitempty"`
	Total   int       `json:"total,omitempty"`
}
