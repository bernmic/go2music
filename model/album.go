package model

type Album struct {
	Id    int64  `json:"id,omitempty"`
	Title string `json:"title,omitempty"`
	Path  string `json:"path,omitempty"`
}
