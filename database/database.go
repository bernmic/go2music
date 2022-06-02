package database

import (
	"database/sql"
)

type DatabaseAccess struct {
	SongManager     SongManager
	AlbumManager    AlbumManager
	ArtistManager   ArtistManager
	PlaylistManager PlaylistManager
	UserManager     UserManager
	InfoManager     InfoManager
}

// DB contains the session data for a database session
type DB struct {
	sql.DB
	Stmt      map[string]string
	Sanitizer func(string) string
}

func (db *DB) countRows(sql string, args ...interface{}) int {
	var count int
	rows := db.QueryRow(db.Sanitizer(sql), args...)
	if err := rows.Scan(&count); err != nil {
		return 0
	}
	return count
}
