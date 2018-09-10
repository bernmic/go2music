package mysql

import (
	"fmt"
	"github.com/rs/xid"
	log "github.com/sirupsen/logrus"
	"go2music/model"
	"golang.org/x/crypto/bcrypt"
)

const createUserTableStatement = `
	CREATE TABLE IF NOT EXISTS 
		user (
			id varchar(32), 
			username varchar(255) NOT NULL, 
			password varchar(255) NOT NULL, 
			role varchar(255) NOT NULL, 
			email varchar(255) NOT NULL, 
			PRIMARY KEY (id)
		);`

func (db *DB) initializeUser() {
	_, err := db.Query("SELECT 1 FROM user LIMIT 1")
	if err != nil {
		log.Print("Table user does not exists. Creating now.")
		_, err := db.Exec(createUserTableStatement)
		if err != nil {
			log.Error("Error creating user table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("User Table successfully created....")
		}
		_, err = db.Exec("ALTER TABLE user ADD UNIQUE INDEX user_username (username)")
		if err != nil {
			log.Error("Error creating user table index for username")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on username generated....")
		}
	}
	var count int64
	db.QueryRow("SELECT count(*) c FROM user").Scan(&count)
	if count == 0 {
		userPassword, _ := HashPassword("user")
		adminPassword, _ := HashPassword("admin")
		guestPassword, _ := HashPassword("guest")
		db.CreateUser(model.User{Username: "user", Password: userPassword, Role: "user", Email: "user@example.com"})
		db.CreateUser(model.User{Username: "admin", Password: adminPassword, Role: "admin", Email: "admin@example.com"})
		db.CreateUser(model.User{Username: "guest", Password: guestPassword, Role: "guest", Email: "guest@example.com"})
	}
}

func (db *DB) CreateUser(user model.User) (*model.User, error) {
	user.Id = xid.New().String()
	_, err := db.Exec(
		"INSERT INTO user (id,username,password,role,email) VALUES(?,?,?,?,?)",
		user.Id,
		user.Username,
		user.Password,
		user.Role,
		user.Email)
	if err != nil {
		log.Error(err)
	}
	return &user, err
}

func (db *DB) CreateIfNotExistsUser(user model.User) (*model.User, error) {
	existingUser, findErr := db.FindUserByUsername(user.Username)
	if findErr == nil {
		return existingUser, findErr
	}
	user.Id = xid.New().String()
	_, err := db.Exec(
		"INSERT INTO user (id,username,password,role,email) VALUES(?,?,?,?,?)",
		user.Id,
		user.Username,
		user.Password,
		user.Role,
		user.Email)
	if err != nil {
		log.Error(err)
	}
	return &user, err
}

func (db *DB) UpdateUser(user model.User) (*model.User, error) {
	_, err := db.Exec(
		"UPDATE user SET username=?, password=?, role=?, email=? WHERE id=?",
		user.Username,
		user.Password,
		user.Role,
		user.Email,
		user.Id)
	return &user, err
}

func (db *DB) DeleteUser(id string) error {
	_, err := db.Exec("DELETE FROM user WHERE id=?", id)
	return err
}

func (db *DB) FindUserById(id string) (*model.User, error) {
	user := new(model.User)
	err := db.QueryRow(
		"SELECT id,username, password, role, email FROM user WHERE id=?", id).Scan(
		&user.Id,
		&user.Username,
		&user.Password,
		&user.Role,
		&user.Email)
	if err != nil {
		log.Error(err)
	}
	return user, err
}

func (db *DB) FindUserByUsername(name string) (*model.User, error) {
	user := new(model.User)
	err := db.QueryRow(
		"SELECT id,username, password, role, email FROM user WHERE username=?", name).Scan(
		&user.Id,
		&user.Username,
		&user.Password,
		&user.Role,
		&user.Email)
	if err != nil {
		return user, err
	}
	return user, err
}

func (db *DB) FindAllUsers() ([]*model.User, error) {
	rows, err := db.Query("SELECT id, username, password, role, email FROM user")
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

	return users, err
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
