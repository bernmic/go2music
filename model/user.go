package model

type User struct {
	Id       int64  `json:"id,omitempty"`
	Username string `json:"username,omitempty"`
	Password string `json:"password,omitempty"`
	Role     string `json:"role,omitempty"`
	Email    string `json:"email,omitempty"`
}
