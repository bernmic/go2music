package model

type Song struct {
	Id            int64   `json:"songId,omitempty"`
	Path          string  `json:"-"`
	Title         string  `json:"title,omitempty"`
	Artist        *Artist `json:"artist"`
	Album         *Album  `json:"album"`
	Genre         string  `json:"genre"`
	Track         int     `json:"track"`
	YearPublished string  `json:"yearPublished"`
	Bitrate       int     `json:"bitrate"`
	Samplerate    int     `json:"sampleRate"`
	Duration      int     `json:"duration"`
	Mode          string  `json:"mode"`
	Vbr           bool    `json:"vbr"`
	Added         int64   `json:"added"`
	Filedate      int64   `json:"filedate"`
	Rating        int     `json:"rating"`
}

type SongCollection struct {
	Songs  []*Song `json:"songs,omitempty"`
	Paging Paging  `json:"paging,omitempty"`
}

type SongManager interface {
	CreateSong(song Song) (*Song, error)
	UpdateSong(song Song) (*Song, error)
	DeleteSong(id int64) error
	SongExists(path string) bool
	FindOneSong(id int64) (*Song, error)
	FindAllSongs() ([]*Song, error)
	FindSongsByAlbumId(findAlbumId int64) ([]*Song, error)
	FindSongsByArtistId(findArtistId int64) ([]*Song, error)
	FindSongsByPlaylistQuery(query string) ([]*Song, error)
	GetCoverForSong(song *Song) ([]byte, string, error)
}
