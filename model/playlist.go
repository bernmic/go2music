package model

// Playlist is the representation of a playlist with songs.
// A playlist can be static or dynamic. A dynamic playlist has a query.
// A playlist is always bound to an user.
type Playlist struct {
	Id    string `json:"playlistId,omitempty"`
	Name  string `json:"name,omitempty"`
	Query string `json:"query,omitempty"`
	User  User   `json:"-"`
}

// PlaylistCollection is a list of playlist with paging informations
type PlaylistCollection struct {
	Playlists []*Playlist `json:"playlists,omitempty"`
	Paging    Paging      `json:"paging,omitempty"`
	Total     int         `json:"total,omitempty"`
}
