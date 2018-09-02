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

type AlbumManager interface {
	CreateAlbum(album Album) (*Album, error)
	CreateIfNotExistsAlbum(album Album) (*Album, error)
	UpdateAlbum(album Album) (*Album, error)
	DeleteAlbum(id int64) error
	FindAlbumById(id int64) (*Album, error)
	FindAlbumByPath(path string) (*Album, error)
	FindAllAlbums() ([]*Album, error)
}
