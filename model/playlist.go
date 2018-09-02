package model

type Playlist struct {
	Id    int64  `json:"playlistId,omitempty"`
	Name  string `json:"name,omitempty"`
	Query string `json:"query,omitempty"`
}

type PlaylistCollection struct {
	Playlists []*Playlist `json:"playlists,omitempty"`
	Paging
}

type PlaylistManager interface {
	CreatePlaylist(playlist Playlist) (*Playlist, error)
	CreateIfNotExistsPlaylist(playlist Playlist) (*Playlist, error)
	UpdatePlaylist(playlist Playlist) (*Playlist, error)
	DeletePlaylist(id int64) error
	FindPlaylistById(id int64) (*Playlist, error)
	FindPlaylistByName(name string) (*Playlist, error)
	FindAllPlaylists() ([]*Playlist, error)
}
