package postgres

import (
	"fmt"
	log "github.com/sirupsen/logrus"
	"go2music/database"
	"go2music/model"
)

func initializeUser(db *database.DB) {
	db.Stmt["sqlUserExists"] = database.SqlUserExists
	db.Stmt["sqlUserCreate"] = database.SqlUserCreate
	db.Stmt["sqlUserIndexName"] = database.SqlUserIndexName
	db.Stmt["sqlUserCount"] = database.SqlUserCount
	db.Stmt["sqlUserInsert"] = database.SqlUserInsert
	db.Stmt["sqlUserUpdate"] = database.SqlUserUpdate
	db.Stmt["sqlUserDelete"] = database.SqlUserDelete
	db.Stmt["sqlUserById"] = database.SqlUserById
	db.Stmt["sqlUserByName"] = database.SqlUserByName
	db.Stmt["sqlUserAll"] = database.SqlUserAll
	_, err := db.Query(db.Sanitizer(db.Stmt["sqlUserExists"]))
	if err != nil {
		log.Print("Table guser does not exists. Creating now.")
		result, err := db.Exec(db.Sanitizer(db.Stmt["sqlUserCreate"]))
		if err != nil {
			log.Error("Error creating guser table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Infof("User Table successfully created....%v", result)
		}
		_, err = db.Exec(db.Sanitizer(db.Stmt["sqlUserIndexName"]))
		if err != nil {
			log.Error("Error creating user table index for username")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on username generated....")
		}
	}
	var count int64
	err = db.QueryRow(db.Sanitizer(db.Stmt["sqlUserCount"])).Scan(&count)
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
