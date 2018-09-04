package model

type Album struct {
	Id    string `json:"albumId,omitempty" bson:"_id,omitempty"`
	Title string `json:"title,omitempty"`
	Path  string `json:"-"`
}

type AlbumCollection struct {
	Albums []*Album `json:"albums,omitempty"`
	Paging
}
