package model

type Playlist struct {
	Id    int64  `json:"id,omitempty"`
	Name  string `json:"name,omitempty"`
	Query string `json:"query,omitempty"`
}
