package model

type Playlist struct {
	Id    string `json:"playlistId,omitempty"`
	Name  string `json:"name,omitempty"`
	Query string `json:"query,omitempty"`
	User  User   `json:"-"`
}

type PlaylistCollection struct {
	Playlists []*Playlist `json:"playlists,omitempty"`
	Paging
}
