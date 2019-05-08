package database

import "go2music/model"

// UserManager defines all database functions for users
type UserManager interface {
	CreateUser(user model.User) (*model.User, error)
	CreateIfNotExistsUser(user model.User) (*model.User, error)
	UpdateUser(user model.User) (*model.User, error)
	DeleteUser(id string) error
	FindUserById(id string) (*model.User, error)
	FindUserByUsername(name string) (*model.User, error)
	FindAllUsers(filter string, paging model.Paging) ([]*model.User, int, error)
}
