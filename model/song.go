package model

type Song struct {
	Id            int64   `json:"songId,omitempty"`
	Path          string  `json:"path,omitempty"`
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
