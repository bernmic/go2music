package model

type User struct {
	Id       string `json:"id,omitempty"`
	Username string `json:"username,omitempty"`
	Password string `json:"-"`
	Role     string `json:"role,omitempty"`
	Email    string `json:"email,omitempty"`
}

type UserCollection struct {
	Users  []*User `json:"users,omitempty"`
	Paging Paging  `json:"paging,omitempty"`
	Total  int     `json:"total,omitempty"`
}
