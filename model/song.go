package model

// Song is the representation of a song
type Song struct {
	Id            string  `json:"songId,omitempty"`
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
	Mbid          string  `json:"mbid,omitempty"`
	PlayCount     int     `json:"playCount,omitempty"`
}

// SongCollection is a list of songs with paging informations
type SongCollection struct {
	Songs       []*Song `json:"songs,omitempty"`
	Description string  `json:"description,omitempty"`
	Paging      Paging  `json:"paging,omitempty"`
	Total       int     `json:"total,omitempty"`
}

// UserSong contains the user specific informations of songs
type UserSong struct {
	UserId     string `json:"userId"`
	SongId     string `json:"songId"`
	Rating     int    `json:"rating"`
	PlayCount  int    `json:"playCount"`
	LastPlayed int64  `json:"lastPlayed"`
}
