package model

type Paging struct {
	Page      int    `json:"page,omitempty"`
	Size      int    `json:"size,omitempty"`
	Sort      string `json:"sort"`
	Direction string `json:"direction"`
}
