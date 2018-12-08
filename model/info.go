package model

type Info struct {
	SongCount           int      `json:"songCount,omitempty"`
	AlbumCount          int      `json:"albumCount,omitempty"`
	ArtistCount         int      `json:"artistCount,omitempty"`
	PlaylistCount       int      `json:"playlistCount,omitempty"`
	UserCount           int      `json:"userCount,omitempty"`
	SongsRecentlyAdded  []*Song  `json:"songsRecentlyAdded,omitempty"`
	SongsRecentlyPlayed []*Song  `json:"songsRecentlyPlayed,omitempty"`
	SongsMostPlayed     []*Song  `json:"songsMostPlayed,omitempty"`
	AlbumsRecentlyAdded []*Album `json:"albumsRecentlyAdded,omitempty"`
}
