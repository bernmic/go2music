package model

type Song struct {
	Id         int64          `json:"id,omitempty"`
	Path       string         `json:"path,omitempty"`
	Title      string         `json:"title,omitempty"`
	Artist     *Artist        `json:"artist"`
	Album      *Album         `json:"album"`
	Genre      JsonNullString `json:"genre"`
	Track      JsonNullInt64  `json:"track"`
	Year       JsonNullString `json:"year"`
	Bitrate    int            `json:"bitrate"`
	Samplerate int            `json:"samplerate"`
	Duration   int            `json:"duration"`
	Mode       string         `json:"mode"`
	CbrVbr     string         `json:"cbrvbr"`
}
