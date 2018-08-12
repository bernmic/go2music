package model

type Song struct {
	Id            int64          `json:"id,omitempty"`
	Path          string         `json:"path,omitempty"`
	Title         string         `json:"title,omitempty"`
	Artist        *Artist        `json:"artist"`
	Album         *Album         `json:"album"`
	Genre         JsonNullString `json:"genre"`
	Track         JsonNullInt64  `json:"track"`
	YearPublished JsonNullString `json:"yearPublished"`
	Bitrate       int            `json:"bitrate"`
	Samplerate    int            `json:"sampleRate"`
	Duration      int            `json:"duration"`
	Mode          string         `json:"mode"`
	CbrVbr        string         `json:"cbrvbr"`
	Added         int64          `json:"added"`
	Filedate      int64          `json:"filedate"`
	Rating        int            `json:"rating"`
}
