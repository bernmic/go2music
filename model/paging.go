package model

// Paging contains all attributes for a paging state
type Paging struct {
	Page      int    `json:"page,omitempty"`
	Size      int    `json:"size,omitempty"`
	Sort      string `json:"sort"`
	Direction string `json:"direction"`
}
