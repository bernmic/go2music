package model

// NameCount is a simple key/value
//
// Name is the key, Count the value as an int
//
// swagger:model
type NameCount struct {
	// Name of the entry
	Name string `json:"name,omitempty"`
	// Title of the album
	Count int64 `json:"count,omitempty"`
}
