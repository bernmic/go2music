package database

import "go2music/model"

type UserManager interface {
	CreateUser(user model.User) (*model.User, error)
	CreateIfNotExistsUser(user model.User) (*model.User, error)
	UpdateUser(user model.User) (*model.User, error)
	DeleteUser(id string) error
	FindUserById(id string) (*model.User, error)
	FindUserByUsername(name string) (*model.User, error)
	FindAllUsers() ([]*model.User, error)
}
