package model

type Album struct {
	Id    int64  `json:"albumId,omitempty"`
	Title string `json:"title,omitempty"`
	Path  string `json:"path,omitempty"`
}

type AlbumCollection struct {
	Albums []*Album `json:"albums,omitempty"`
	Paging
}
