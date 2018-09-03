package model

type User struct {
	Id       string `json:"id,omitempty"`
	Username string `json:"username,omitempty"`
	Password string `json:"-"`
	Role     string `json:"role,omitempty"`
	Email    string `json:"email,omitempty"`
}
