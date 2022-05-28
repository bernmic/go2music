package mysql

import (
	"fmt"
	"github.com/rs/xid"
	log "github.com/sirupsen/logrus"
	"go2music/model"
	"golang.org/x/crypto/bcrypt"
	"strings"
)

const (
	sqlUserExists = "SELECT 1 FROM guser LIMIT 1"
	sqlUserCreate = `
	CREATE TABLE IF NOT EXISTS
		guser (
			id varchar(32), 
			username varchar(255) NOT NULL, 
			password varchar(255) NOT NULL, 
			role varchar(255) NOT NULL, 
			email varchar(255) NOT NULL, 
			PRIMARY KEY (id)
		);`
	sqlUserIndexName = "CREATE UNIQUE INDEX guser_username ON guser (username)"
	sqlUserCount     = "SELECT count(*) c FROM guser"
	sqlUserInsert    = "INSERT INTO guser (id,username,password,role,email) VALUES(?,?,?,?,?)"
	sqlUserUpdate    = "UPDATE guser SET username=?, password=?, role=?, email=? WHERE id=?"
	sqlUserDelete    = "DELETE FROM guser WHERE id=?"
	sqlUserById      = "SELECT id, username, password, role, email FROM guser WHERE id=?"
	sqlUserByName    = "SELECT id, username, password, role, email FROM guser WHERE username=?"
	sqlUserAll       = "SELECT id, username, password, role, email FROM guser"
)

func (db *DB) initializeUser() {
	_, err := db.Query(sqlUserExists)
	if err != nil {
		log.Print("Table guser does not exists. Creating now.")
		result, err := db.Exec(sqlUserCreate)
		if err != nil {
			log.Error("Error creating guser table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Infof("User Table successfully created....%v", result)
		}
		_, err = db.Exec(sqlUserIndexName)
		if err != nil {
			log.Error("Error creating user table index for username")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on username generated....")
		}
	}
	var count int64
	err = db.QueryRow(sanitizePlaceholder(sqlUserCount)).Scan(&count)
	if err != nil {
		log.Errorf("Error querying user count: %v", err)
	}
	if count == 0 {
		_, err = db.CreateUser(model.User{Username: "user", Password: "user", Role: "user", Email: "user@example.com"})
		if err != nil {
			log.Errorf("Error adding user 'user': %v", err)
		}
		_, err = db.CreateUser(model.User{Username: "admin", Password: "admin", Role: "admin", Email: "admin@example.com"})
		if err != nil {
			log.Errorf("Error adding user 'admin': %v", err)
		}
		_, err = db.CreateUser(model.User{Username: "guest", Password: "guest", Role: "guest", Email: "guest@example.com"})
		if err != nil {
			log.Errorf("Error adding user 'guest': %v", err)
		}
		_, err = db.CreateUser(model.User{Username: "editor", Password: "editor", Role: "editor", Email: "editor@example.com"})
		if err != nil {
			log.Errorf("Error adding user 'editor': %v", err)
		}
	}
}

// CreateUser create a new user in the database
func (db *DB) CreateUser(user model.User) (*model.User, error) {
	user.Id = xid.New().String()
	password, _ := HashPassword(user.Password)
	_, err := db.Exec(
		sanitizePlaceholder(sqlUserInsert),
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
		sanitizePlaceholder(sqlUserInsert),
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
		sanitizePlaceholder(sqlUserUpdate),
		user.Username,
		user.Password,
		user.Role,
		user.Email,
		user.Id)
	return &user, err
}

// DeleteUser delete the user with the id in the database
func (db *DB) DeleteUser(id string) error {
	_, err := db.Exec(sanitizePlaceholder(sqlUserDelete), id)
	return err
}

// FindUserById get the user with the given id
func (db *DB) FindUserById(id string) (*model.User, error) {
	user := new(model.User)
	err := db.QueryRow(
		sanitizePlaceholder(sqlUserById), id).Scan(
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
		sanitizePlaceholder(sqlUserByName), name).Scan(
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
	rows, err := db.Query(sanitizePlaceholder(sqlUserAll + orderAndLimit))
	if err != nil {
		log.Error(err)
	}
	defer rows.Close()
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
		total = db.countRows(sanitizePlaceholder(sqlUserCount + whereClause))
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
