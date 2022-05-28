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

const (
	SqlUserExists = "SELECT 1 FROM guser LIMIT 1"
	SqlUserCreate = `
	CREATE TABLE IF NOT EXISTS
		guser (
			id varchar(32), 
			username varchar(255) NOT NULL, 
			password varchar(255) NOT NULL, 
			role varchar(255) NOT NULL, 
			email varchar(255) NOT NULL, 
			PRIMARY KEY (id)
		);`
	SqlUserIndexName = "CREATE UNIQUE INDEX guser_username ON guser (username)"
	SqlUserCount     = "SELECT count(*) c FROM guser"
	SqlUserInsert    = "INSERT INTO guser (id,username,password,role,email) VALUES(?,?,?,?,?)"
	SqlUserUpdate    = "UPDATE guser SET username=?, password=?, role=?, email=? WHERE id=?"
	SqlUserDelete    = "DELETE FROM guser WHERE id=?"
	SqlUserById      = "SELECT id, username, password, role, email FROM guser WHERE id=?"
	SqlUserByName    = "SELECT id, username, password, role, email FROM guser WHERE username=?"
	SqlUserAll       = "SELECT id, username, password, role, email FROM guser"
)
