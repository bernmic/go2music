package model

type Info struct {
	SongCount          int     `json:"songCount,omitempty"`
	AlbumCount         int     `json:"albumCount,omitempty"`
	ArtistCount        int     `json:"artistCount,omitempty"`
	PlaylistCount      int     `json:"playlistCount,omitempty"`
	UserCount          int     `json:"userCount,omitempty"`
	SongsRecentlyAdded []*Song `json:"songsRecentlyAdded,omitempty"`
}
