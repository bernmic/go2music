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
