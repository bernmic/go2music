package model

type User struct {
	Id       int64  `json:"id,omitempty"`
	Username string `json:"username,omitempty"`
	Password string `json:"-"`
	Role     string `json:"role,omitempty"`
	Email    string `json:"email,omitempty"`
}

type UserManager interface {
	CreateUser(user User) (*User, error)
	CreateIfNotExistsUser(user User) (*User, error)
	UpdateUser(user User) (*User, error)
	DeleteUser(id int64) error
	FindUserById(id int64) (*User, error)
	FindUserByUsername(name string) (*User, error)
	FindAllUsers() ([]*User, error)
}
