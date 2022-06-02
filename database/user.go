package database

import (
	"fmt"
	"github.com/rs/xid"
	log "github.com/sirupsen/logrus"
	"go2music/model"
	"golang.org/x/crypto/bcrypt"
	"strings"
)

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

// CreateUser create a new user in the database
func (db *DB) CreateUser(user model.User) (*model.User, error) {
	user.Id = xid.New().String()
	password, _ := HashPassword(user.Password)
	_, err := db.Exec(
		db.Sanitizer(db.Stmt["sqlUserInsert"]),
		user.Id,
		user.Username,
		password,
		user.Role,
		user.Email)
	if err != nil {
		log.Error(err)
	}
	return &user, err
}

// CreateIfNotExistsUser create a new user in the database if the username is not found in the database
func (db *DB) CreateIfNotExistsUser(user model.User) (*model.User, error) {
	existingUser, findErr := db.FindUserByUsername(user.Username)
	if findErr == nil {
		return existingUser, findErr
	}
	password, _ := HashPassword(user.Password)
	user.Id = xid.New().String()
	_, err := db.Exec(
		db.Sanitizer(db.Stmt["sqlUserInsert"]),
		user.Id,
		user.Username,
		password,
		user.Role,
		user.Email)
	if err != nil {
		log.Error(err)
	}
	return &user, err
}

// UpdateUser update the given user in the database
func (db *DB) UpdateUser(user model.User) (*model.User, error) {
	_, err := db.Exec(
		db.Sanitizer(db.Stmt["sqlUserUpdate"]),
		user.Username,
		user.Password,
		user.Role,
		user.Email,
		user.Id)
	return &user, err
}

// DeleteUser delete the user with the id in the database
func (db *DB) DeleteUser(id string) error {
	_, err := db.Exec(db.Sanitizer(db.Stmt["sqlUserDelete"]), id)
	return err
}

// FindUserById get the user with the given id
func (db *DB) FindUserById(id string) (*model.User, error) {
	user := new(model.User)
	err := db.QueryRow(
		db.Sanitizer(db.Stmt["sqlUserById"]), id).Scan(
		&user.Id,
		&user.Username,
		&user.Password,
		&user.Role,
		&user.Email)
	if err != nil {
		return user, fmt.Errorf("error fínding user by id %s: %v", id, err)
	}
	return user, err
}

// FindUserByUsername get the user with the given username
func (db *DB) FindUserByUsername(name string) (*model.User, error) {
	user := new(model.User)
	err := db.QueryRow(
		db.Sanitizer(db.Stmt["sqlUserByName"]), name).Scan(
		&user.Id,
		&user.Username,
		&user.Password,
		&user.Role,
		&user.Email)
	if err != nil {
		return user, fmt.Errorf("error fínding user by username %s: %v", name, err)
	}
	return user, err
}

// FindAllUsers get all users which matches the optional filter and is in the given page
func (db *DB) FindAllUsers(filter string, paging model.Paging) ([]*model.User, int, error) {
	orderAndLimit, limit := createOrderAndLimitForUser(paging)
	whereClause := ""
	if filter != "" {
		whereClause = " WHERE LOWER(username) LIKE '%" + strings.ToLower(filter) + "%'"
		orderAndLimit = whereClause + orderAndLimit
	}
	rows, err := db.Query(db.Sanitizer(db.Stmt["sqlUserAll"]) + orderAndLimit)
	if err != nil {
		log.Error(err)
	}
	defer func() {
		err := rows.Close()
		if err != nil {
			log.Errorf("error closing rows in user: %v", err)
		}
	}()
	users := make([]*model.User, 0)
	for rows.Next() {
		user := new(model.User)
		err := rows.Scan(
			&user.Id,
			&user.Username,
			&user.Password,
			&user.Role,
			&user.Email)
		if err != nil {
			log.Error(err)
		}
		users = append(users, user)
	}
	if err = rows.Err(); err != nil {
		log.Error(err)
	}

	total := len(users)
	if limit {
		total = db.countRows(db.Sanitizer(db.Stmt["sqlUserCount"]) + whereClause)
	}

	return users, total, err
}

// HashPassword returns the hash of the given password
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// CheckPasswordHash checks if the given password leads to the given hash
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func createOrderAndLimitForUser(paging model.Paging) (string, bool) {
	s := ""
	l := false
	if paging.Sort != "" {
		switch paging.Sort {
		case "username":
			s += " ORDER BY username"
		case "role":
			s += " ORDER BY role"
		case "email":
			s += " ORDER BY email"
		}
		if s != "" {
			if paging.Direction == "asc" {
				s += " ASC"
			} else if paging.Direction == "desc" {
				s += " DESC"
			}
		}
	}
	if paging.Size > 0 {
		s += fmt.Sprintf(" LIMIT %d,%d", paging.Page*paging.Size, paging.Size)
		l = true
	}
	return s, l
}
