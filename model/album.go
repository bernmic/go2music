package model

// Album is the representation of a music album
//
// It contains a title and the filesystem path to the songs
//
// swagger:model
type Album struct {
	// Id of the album
	Id string `json:"albumId,omitempty"`
	// Title of the album
	Title string `json:"title,omitempty"`
	// Path to the song files
	Path string `json:"-"`
}

// AlbumCollection is a trunc of albums with paging informations
//
// swagger:response AlbumCollection
type AlbumCollection struct {
	// Albums List of albums in this trunc
	Albums []*Album `json:"albums,omitempty"`
	// Paging of this trunc
	Paging Paging `json:"paging,omitempty"`
	// Total number of all albums
	Total int `json:"total,omitempty"`
}
