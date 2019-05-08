package model

// User is the representation of an user
type User struct {
	Id       string `json:"id,omitempty"`
	Username string `json:"username,omitempty"`
	Password string `json:"-"`
	Role     string `json:"role,omitempty"`
	Email    string `json:"email,omitempty"`
}

// UserCollection is a list of users with paging informations
type UserCollection struct {
	Users  []*User `json:"users,omitempty"`
	Paging Paging  `json:"paging,omitempty"`
	Total  int     `json:"total,omitempty"`
}
