package service

import (
	"fmt"
	"go2music/model"
	"log"
)

var createUserTableStatement = `
	CREATE TABLE IF NOT EXISTS 
		user (
			id BIGINT NOT NULL AUTO_INCREMENT, 
			username varchar(255) NOT NULL, 
			password varchar(255) NOT NULL, 
			role varchar(255) NOT NULL, 
			email varchar(255) NOT NULL, 
			PRIMARY KEY (id)
		);`

func InitializeUser() {
	_, err := Database.Query("SELECT 1 FROM user LIMIT 1")
	if err != nil {
		log.Print("Table user does not exists. Creating now.")
		stmt, err := Database.Prepare(createUserTableStatement)
		if err != nil {
			log.Print("ERROR Error creating user table")
			panic(fmt.Sprintf("%v", err))
		}
		_, err = stmt.Exec()
		if err != nil {
			log.Print("ERROR Error creating user table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Println("INFO User Table successfully created....")
		}
		stmt, err = Database.Prepare("ALTER TABLE user ADD UNIQUE INDEX user_username (username)")
		if err != nil {
			log.Print("ERROR Error creating user table index for username")
			panic(fmt.Sprintf("%v", err))
		}
		_, err = stmt.Exec()
		if err != nil {
			log.Print("ERROR Error creating user table index for username")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Println("INFO Index on username generated....")
		}
	}
	var count int64
	Database.QueryRow("SELECT count(*) c FROM user").Scan(&count)
	if count == 0 {
		CreateUser(model.User{Username: "user", Password: "user", Role: "user", Email: "user@example.com"})
		CreateUser(model.User{Username: "admin", Password: "admin", Role: "admin", Email: "admin@example.com"})
		CreateUser(model.User{Username: "guest", Password: "guest", Role: "guest", Email: "guest@example.com"})
	}
}

func CreateUser(user model.User) (*model.User, error) {
	result, err := Database.Exec(
		"INSERT IGNORE INTO user (username,password,role,email) VALUES(?,?,?,?)",
		user.Username,
		user.Password,
		user.Role,
		user.Email)
	if err != nil {
		log.Fatal(err)
	}
	user.Id, _ = result.LastInsertId()
	return &user, err
}

func CreateIfNotExistsUser(user model.User) (*model.User, error) {
	existingUser, findErr := FindUserByUsername(user.Username)
	if findErr == nil {
		return existingUser, findErr
	}
	result, err := Database.Exec(
		"INSERT INTO user (username,password,role,email) VALUES(?,?,?,?)",
		user.Username,
		user.Password,
		user.Role,
		user.Email)
	if err != nil {
		log.Fatal(err)
	}
	user.Id, _ = result.LastInsertId()
	return &user, err
}

func UpdateUser(user model.User) (*model.User, error) {
	_, err := Database.Exec(
		"UPDATE user SET username=?, password=?, role=?, email=? WHERE id=?",
		user.Username,
		user.Password,
		user.Role,
		user.Email,
		user.Id)
	return &user, err
}

func DeleteUser(id int64) error {
	_, err := Database.Exec("DELETE FROM user WHERE id=?", id)
	return err
}

func FindUserById(id int64) (*model.User, error) {
	user := new(model.User)
	err := Database.QueryRow(
		"SELECT id,username, password, role, email FROM user WHERE id=?", id).Scan(
		&user.Id,
		&user.Username,
		&user.Password,
		&user.Role,
		&user.Email)
	if err != nil {
		log.Fatal(err)
	}
	return user, err
}

func FindUserByUsername(name string) (*model.User, error) {
	user := new(model.User)
	err := Database.QueryRow(
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

func FindAllUsers() ([]*model.User, error) {
	rows, err := Database.Query("SELECT id, username, password, role, email FROM user")
	if err != nil {
		log.Fatal(err)
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
			log.Fatal(err)
		}
		users = append(users, user)
	}
	if err = rows.Err(); err != nil {
		log.Fatal(err)
	}

	return users, err
}
