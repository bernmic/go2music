package mysql

import (
	"database/sql"
	"errors"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/rs/xid"
	log "github.com/sirupsen/logrus"
	"go2music/fs"
	"go2music/model"
	"path/filepath"
	"strings"
)

const (
	createSongTableStatement = `
	CREATE TABLE IF NOT EXISTS song (
		id varchar(32),
		path VARCHAR(255) NOT NULL,
		title VARCHAR(255),
		artist_id varchar(32) NULL,
		album_id varchar(32) NULL,
		genre VARCHAR(255) NULL,
		track INT NULL,
		yearpublished VARCHAR(32) NULL,
		bitrate INT NULL,
		samplerate INT NULL,
		duration INT NULL,
		mode VARCHAR(30) NULL,
		vbr BOOLEAN NULL,
		added INT NOT NULL,
		filedate INT NOT NULL,
		rating INT NOT NULL,
		PRIMARY KEY (id),
		FOREIGN KEY (artist_id) REFERENCES artist(id),
		FOREIGN KEY (album_id) REFERENCES album(id)
		);
	`
	selectSongStatement = `
SELECT
	song.id,
	song.path,
	song.title,
	song.genre,
	song.track,
	song.yearpublished,
	song.bitrate,
	song.samplerate,
	song.duration,
	song.mode,
	song.vbr,
	song.added,
	song.filedate,
	song.rating,
	artist.id artist_id,
	artist.name,
	album.id album_id,
	album.title album_title,
	album.path album_path
FROM
	song
LEFT JOIN artist ON song.artist_id = artist.id
LEFT JOIN album ON song.album_id = album.id
`
)

func (db *DB) initializeSong() {
	_, err := db.Query("SELECT 1 FROM song LIMIT 1")
	if err != nil {
		log.Info("Table song does not exists. Creating now.")
		stmt, err := db.Prepare(createSongTableStatement)
		if err != nil {
			log.Error("Error creating song table")
			panic(fmt.Sprintf("%v", err))
		}
		_, err = stmt.Exec()
		if err != nil {
			log.Error("Error creating song table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Song Table successfully created....")
		}
		stmt, err = db.Prepare("ALTER TABLE song ADD UNIQUE INDEX song_path (path)")
		if err != nil {
			log.Error("Error creating song table index for path")
			panic(fmt.Sprintf("%v", err))
		}
		_, err = stmt.Exec()
		if err != nil {
			log.Error("Error creating song table index for path")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on path generated....")
		}
	}
}

func (db *DB) CreateSong(song model.Song) (*model.Song, error) {
	song.Id = xid.New().String()
	_, err := db.Exec("INSERT IGNORE INTO song (id, path, title, artist_id, album_id, genre, track, yearpublished, bitrate, samplerate, duration, mode, vbr, added, filedate, rating) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
		song.Id,
		song.Path,
		song.Title,
		song.Artist.Id,
		song.Album.Id,
		song.Genre,
		song.Track,
		song.YearPublished,
		song.Bitrate,
		song.Samplerate,
		song.Duration,
		song.Mode,
		song.Vbr,
		song.Added,
		song.Filedate,
		song.Rating)
	if err != nil {
		log.Fatal(err)
	}
	return &song, err
}

func (db *DB) UpdateSong(song model.Song) (*model.Song, error) {
	_, err := db.Exec("UPDATE song SET path=?, title=?, artist_id=?, album_id=?, genre=?, track=?, yearpublished=?, bitrate=?, samplerate=?, duration=?, mode=?, vbr=?, added=?, filedate=?, rating=? WHERE id=?",
		song.Path,
		song.Title,
		song.Artist.Id,
		song.Album.Id,
		song.Genre,
		song.Track,
		song.YearPublished,
		song.Bitrate,
		song.Samplerate,
		song.Duration,
		song.Mode,
		song.Vbr,
		song.Added,
		song.Filedate,
		song.Rating,
		song.Id)
	return &song, err
}

func (db *DB) DeleteSong(id string) error {
	_, err := db.Exec("DELETE FROM song WHERE id=?", id)
	return err
}

func (db *DB) SongExists(path string) bool {
	sqlStmt := `SELECT path FROM song WHERE path = ?`
	err := db.QueryRow(sqlStmt, path).Scan(&path)
	if err != nil {
		if err != sql.ErrNoRows {
			// a real error happened! you should change your function return
			// to "(bool, error)" and return "false, err" here
			log.Error("Error reading song from database", err)
		}

		return false
	}
	return true
}
func (db *DB) FindOneSong(id string) (*model.Song, error) {
	stmt := selectSongStatement + ` 
		WHERE
			song.id=?
	`
	song := new(model.Song)
	var artistId sql.NullString
	var artistName sql.NullString
	var albumId sql.NullString
	var albumTitle sql.NullString
	var albumPath sql.NullString
	err := db.QueryRow(stmt, id).Scan(
		&song.Id,
		&song.Path,
		&song.Title,
		&song.Genre,
		&song.Track,
		&song.YearPublished,
		&song.Bitrate,
		&song.Samplerate,
		&song.Duration,
		&song.Mode,
		&song.Vbr,
		&song.Added,
		&song.Filedate,
		&song.Rating,
		&artistId,
		&artistName,
		&albumId,
		&albumTitle,
		&albumPath)
	if err != nil {
		log.Fatal(err)
	}
	if artistId.Valid {
		song.Artist = new(model.Artist)
		song.Artist.Id = artistId.String
		song.Artist.Name = artistName.String
	}
	if albumId.Valid {
		song.Album = new(model.Album)
		song.Album.Id = albumId.String
		song.Album.Title = albumTitle.String
		song.Album.Path = albumPath.String
	}
	return song, err
}

func (db *DB) FindAllSongs() ([]*model.Song, error) {
	rows, err := db.Query(selectSongStatement)
	if err != nil {
		log.Fatal("FATAL Error reading song table", err)
	}
	defer rows.Close()
	songs := make([]*model.Song, 0)
	var artistId sql.NullString
	var artistName sql.NullString
	var albumId sql.NullString
	var albumTitle sql.NullString
	var albumPath sql.NullString
	for rows.Next() {
		song := new(model.Song)
		err := rows.Scan(
			&song.Id,
			&song.Path,
			&song.Title,
			&song.Genre,
			&song.Track,
			&song.YearPublished,
			&song.Bitrate,
			&song.Samplerate,
			&song.Duration,
			&song.Mode,
			&song.Vbr,
			&song.Added,
			&song.Filedate,
			&song.Rating,
			&artistId,
			&artistName,
			&albumId,
			&albumTitle,
			&albumPath)
		if err != nil {
			log.Fatal(err)
		}
		if artistId.Valid {
			song.Artist = new(model.Artist)
			song.Artist.Id = artistId.String
			song.Artist.Name = artistName.String
		}
		if albumId.Valid {
			song.Album = new(model.Album)
			song.Album.Id = albumId.String
			song.Album.Title = albumTitle.String
			song.Album.Path = albumPath.String
		}
		songs = append(songs, song)
	}
	if err = rows.Err(); err != nil {
		log.Fatal(err)
	}

	return songs, err
}

func (db *DB) FindSongsByAlbumId(findAlbumId string) ([]*model.Song, error) {
	stmt := selectSongStatement + ` WHERE album.id = ?`
	rows, err := db.Query(stmt, findAlbumId)
	if err != nil {
		log.Fatal("FATAL Error reading song table", err)
	}
	defer rows.Close()
	songs := make([]*model.Song, 0)
	var artistId sql.NullString
	var artistName sql.NullString
	var albumId sql.NullString
	var albumTitle sql.NullString
	var albumPath sql.NullString
	for rows.Next() {
		song := new(model.Song)
		err := rows.Scan(
			&song.Id,
			&song.Path,
			&song.Title,
			&song.Genre,
			&song.Track,
			&song.YearPublished,
			&song.Bitrate,
			&song.Samplerate,
			&song.Duration,
			&song.Mode,
			&song.Vbr,
			&song.Added,
			&song.Filedate,
			&song.Rating,
			&artistId,
			&artistName,
			&albumId,
			&albumTitle,
			&albumPath)
		if err != nil {
			log.Fatal(err)
		}
		if artistId.Valid {
			song.Artist = new(model.Artist)
			song.Artist.Id = artistId.String
			song.Artist.Name = artistName.String
		}
		if albumId.Valid {
			song.Album = new(model.Album)
			song.Album.Id = albumId.String
			song.Album.Title = albumTitle.String
			song.Album.Path = albumPath.String
		}
		songs = append(songs, song)
	}
	if err = rows.Err(); err != nil {
		log.Fatal(err)
	}

	return songs, err
}

func (db *DB) FindSongsByArtistId(findArtistId string) ([]*model.Song, error) {
	stmt := selectSongStatement + `WHERE artist.id = ?	`
	rows, err := db.Query(stmt, findArtistId)
	if err != nil {
		log.Fatal("FATAL Error reading song table", err)
	}
	defer rows.Close()
	songs := make([]*model.Song, 0)
	var artistId sql.NullString
	var artistName sql.NullString
	var albumId sql.NullString
	var albumTitle sql.NullString
	var albumPath sql.NullString
	for rows.Next() {
		song := new(model.Song)
		err := rows.Scan(
			&song.Id,
			&song.Path,
			&song.Title,
			&song.Genre,
			&song.Track,
			&song.YearPublished,
			&song.Bitrate,
			&song.Samplerate,
			&song.Duration,
			&song.Mode,
			&song.Vbr,
			&song.Added,
			&song.Filedate,
			&song.Rating,
			&artistId,
			&artistName,
			&albumId,
			&albumTitle,
			&albumPath)
		if err != nil {
			log.Fatal(err)
		}
		if artistId.Valid {
			song.Artist = new(model.Artist)
			song.Artist.Id = artistId.String
			song.Artist.Name = artistName.String
		}
		if albumId.Valid {
			song.Album = new(model.Album)
			song.Album.Id = albumId.String
			song.Album.Title = albumTitle.String
			song.Album.Path = albumPath.String
		}
		songs = append(songs, song)
	}
	if err = rows.Err(); err != nil {
		log.Fatal(err)
	}

	return songs, err
}

func (db *DB) FindSongsByPlaylistQuery(query string) ([]*model.Song, error) {
	stmt := selectSongStatement
	splittedBy := "="
	splitted := strings.Split(query, "=")
	if len(splitted) != 2 {
		splitted = strings.Split(query, "~")
		if len(splitted) != 2 {
			return nil, errors.New("incorrect query")
		}
		splittedBy = "~"
	}

	searchItem := splitted[1]

	switch strings.ToLower(splitted[0]) {
	case "album":
		if splittedBy == "=" {
			stmt += " WHERE album.title = ?"
		} else {
			stmt += " WHERE LOWER(album.title) LIKE ?"
			searchItem = "%" + strings.ToLower(searchItem) + "%"
		}
	case "artist":
		if splittedBy == "=" {
			stmt += " WHERE artist.name = ?"
		} else {
			stmt += " WHERE LOWER(artist.name) LIKE ?"
			searchItem = "%" + strings.ToLower(searchItem) + "%"
		}
	case "title":
		if splittedBy == "=" {
			stmt += " WHERE song.title = ?"
		} else {
			stmt += " WHERE LOWER(song.title) LIKE ?"
			searchItem = "%" + strings.ToLower(searchItem) + "%"
		}
	}

	rows, err := db.Query(stmt, searchItem)
	if err != nil {
		log.Fatal("FATAL Error reading song table", err)
	}
	defer rows.Close()
	songs := make([]*model.Song, 0)
	var artistId sql.NullString
	var artistName sql.NullString
	var albumId sql.NullString
	var albumTitle sql.NullString
	var albumPath sql.NullString
	for rows.Next() {
		song := new(model.Song)
		err := rows.Scan(
			&song.Id,
			&song.Path,
			&song.Title,
			&song.Genre,
			&song.Track,
			&song.YearPublished,
			&song.Bitrate,
			&song.Samplerate,
			&song.Duration,
			&song.Mode,
			&song.Vbr,
			&song.Added,
			&song.Filedate,
			&song.Rating,
			&artistId,
			&artistName,
			&albumId,
			&albumTitle,
			&albumPath)
		if err != nil {
			log.Fatal(err)
		}
		if artistId.Valid {
			song.Artist = new(model.Artist)
			song.Artist.Id = artistId.String
			song.Artist.Name = artistName.String
		}
		if albumId.Valid {
			song.Album = new(model.Album)
			song.Album.Id = albumId.String
			song.Album.Title = albumTitle.String
			song.Album.Path = albumPath.String
		}
		songs = append(songs, song)
	}
	if err = rows.Err(); err != nil {
		log.Fatal(err)
	}

	return songs, err
}

func (db *DB) GetCoverForSong(song *model.Song) ([]byte, string, error) {
	image, mimetype, err := fs.GetCoverFromID3(song.Path)

	if err != nil {
		log.Info("try to find cover in path")
		image, mimetype, err = fs.GetCoverFromPath(filepath.Dir(song.Path))
	}

	return image, mimetype, err
}
