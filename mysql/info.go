package mysql

import (
	"go2music/database"
)

func initializeInfo(db *database.DB) {
	db.Stmt["sqlInfoDecades"] = database.SqlInfoDecades
	db.Stmt["sqlInfoYears"] = database.SqlInfoYears
	db.Stmt["sqlInfoGenres"] = database.SqlInfoGenres
}
