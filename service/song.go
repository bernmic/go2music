package service

import (
	"database/sql"
	"errors"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"go2music/model"
	"log"
	"path/filepath"
	"strings"
)

const (
	createSongTableStatement = `
	CREATE TABLE IF NOT EXISTS song (
		id BIGINT NOT NULL AUTO_INCREMENT,
		path varchar(255) NOT NULL,
		title varchar(255),
		artist_id BIGINT NULL,
		album_id BIGINT NULL,
		genre varchar(255) NULL,
		track int NULL,
		yearpublished varchar(32) NULL,
		bitrate int null,
		samplerate int null,
		duration int null,
		mode varchar(30) null,
		cbrvbr varchar(10) null,
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
	song.cbrvbr,
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

func InitializeSong() {
	_, err := Database.Query("SELECT 1 FROM song LIMIT 1")
	if err != nil {
		log.Print("INFO Table song does not exists. Creating now.")
		stmt, err := Database.Prepare(createSongTableStatement)
		if err != nil {
			log.Print("ERROR Error creating song table")
			panic(fmt.Sprintf("%v", err))
		}
		_, err = stmt.Exec()
		if err != nil {
			log.Print("ERROR Error creating song table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Println("INFO Song Table successfully created....")
		}
		stmt, err = Database.Prepare("ALTER TABLE song ADD UNIQUE INDEX song_path (path)")
		if err != nil {
			log.Print("ERROR Error creating song table index for path")
			panic(fmt.Sprintf("%v", err))
		}
		_, err = stmt.Exec()
		if err != nil {
			log.Print("ERROR Error creating song table index for path")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Println("INFO Index on path generated....")
		}
	}
}

func CreateSong(song model.Song) (*model.Song, error) {
	result, err := Database.Exec("INSERT IGNORE INTO song (path, title, artist_id, album_id, genre, track, yearpublished, bitrate, samplerate, duration, mode, cbrvbr) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
		song.Path,
		song.Title,
		song.Artist.Id,
		song.Album.Id,
		song.Genre.String,
		song.Track.Int64,
		song.Year.String,
		song.Bitrate,
		song.Samplerate,
		song.Duration,
		song.Mode,
		song.CbrVbr)
	if err != nil {
		log.Fatal(err)
	}
	song.Id, _ = result.LastInsertId()
	return &song, err
}

func UpdateSong(song model.Song) (*model.Song, error) {
	_, err := Database.Exec("UPDATE song SET path=?, title=?, artist_id=?, album_id=?, genre=?, track=?, yearpublished=?, bitrate=?, samplerate=?, duration=?, mode=?, cbrvbr=? WHERE id=?",
		song.Path,
		song.Title,
		song.Artist.Id,
		song.Album.Id,
		song.Genre.String,
		song.Track.Int64,
		song.Year.String,
		song.Bitrate,
		song.Samplerate,
		song.Duration,
		song.Mode,
		song.CbrVbr,
		song.Id)
	return &song, err
}

func DeleteSong(id int64) error {
	_, err := Database.Exec("DELETE FROM song WHERE id=?", id)
	return err
}

func SongExists(path string) bool {
	sqlStmt := `SELECT path FROM song WHERE path = ?`
	err := Database.QueryRow(sqlStmt, path).Scan(&path)
	if err != nil {
		if err != sql.ErrNoRows {
			// a real error happened! you should change your function return
			// to "(bool, error)" and return "false, err" here
			log.Println("ERROR Error reading song from database", err)
		}

		return false
	}
	return true
}
func FindOneSong(id int64) (*model.Song, error) {
	stmt := selectSongStatement + ` 
		WHERE
			song.id=?
	`
	song := new(model.Song)
	var artistId sql.NullInt64
	var artistName sql.NullString
	var albumId sql.NullInt64
	var albumTitle sql.NullString
	var albumPath sql.NullString
	err := Database.QueryRow(stmt, id).Scan(
		&song.Id,
		&song.Path,
		&song.Title,
		&song.Genre,
		&song.Track,
		&song.Year,
		&song.Bitrate,
		&song.Samplerate,
		&song.Duration,
		&song.Mode,
		&song.CbrVbr,
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
		song.Artist.Id = artistId.Int64
		song.Artist.Name = artistName.String
	}
	if albumId.Valid {
		song.Album = new(model.Album)
		song.Album.Id = albumId.Int64
		song.Album.Title = albumTitle.String
		song.Album.Path = albumPath.String
	}
	return song, err
}

func FindAllSongs() ([]*model.Song, error) {
	rows, err := Database.Query(selectSongStatement)
	if err != nil {
		log.Fatal("FATAL Error reading song table", err)
	}
	defer rows.Close()
	songs := make([]*model.Song, 0)
	var artistId sql.NullInt64
	var artistName sql.NullString
	var albumId sql.NullInt64
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
			&song.Year,
			&song.Bitrate,
			&song.Samplerate,
			&song.Duration,
			&song.Mode,
			&song.CbrVbr,
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
			song.Artist.Id = artistId.Int64
			song.Artist.Name = artistName.String
		}
		if albumId.Valid {
			song.Album = new(model.Album)
			song.Album.Id = albumId.Int64
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

func FindSongsByAlbumId(findAlbumId int64) ([]*model.Song, error) {
	stmt := selectSongStatement + ` WHERE album.id = ?`
	rows, err := Database.Query(stmt, findAlbumId)
	if err != nil {
		log.Fatal("FATAL Error reading song table", err)
	}
	defer rows.Close()
	songs := make([]*model.Song, 0)
	var artistId sql.NullInt64
	var artistName sql.NullString
	var albumId sql.NullInt64
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
			&song.Year,
			&song.Bitrate,
			&song.Samplerate,
			&song.Duration,
			&song.Mode,
			&song.CbrVbr,
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
			song.Artist.Id = artistId.Int64
			song.Artist.Name = artistName.String
		}
		if albumId.Valid {
			song.Album = new(model.Album)
			song.Album.Id = albumId.Int64
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

func FindSongsByArtistId(findArtistId int64) ([]*model.Song, error) {
	stmt := selectSongStatement + `WHERE artist.id = ?	`
	rows, err := Database.Query(stmt, findArtistId)
	if err != nil {
		log.Fatal("FATAL Error reading song table", err)
	}
	defer rows.Close()
	songs := make([]*model.Song, 0)
	var artistId sql.NullInt64
	var artistName sql.NullString
	var albumId sql.NullInt64
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
			&song.Year,
			&song.Bitrate,
			&song.Samplerate,
			&song.Duration,
			&song.Mode,
			&song.CbrVbr,
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
			song.Artist.Id = artistId.Int64
			song.Artist.Name = artistName.String
		}
		if albumId.Valid {
			song.Album = new(model.Album)
			song.Album.Id = albumId.Int64
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

func FindSongsByPlaylistQuery(query string) ([]*model.Song, error) {
	stmt := selectSongStatement
	splitted := strings.Split(query, "=")
	if len(splitted) != 2 {
		return nil, errors.New("incorrect query")
	}

	switch strings.ToLower(splitted[0]) {
	case "album":
		stmt += " WHERE album.title = ?"
	case "artist":
		stmt += " WHERE artist.name = ?"
	case "title":
		stmt += " WHERE song.title = ?"
	}

	rows, err := Database.Query(stmt, splitted[1])
	if err != nil {
		log.Fatal("FATAL Error reading song table", err)
	}
	defer rows.Close()
	songs := make([]*model.Song, 0)
	var artistId sql.NullInt64
	var artistName sql.NullString
	var albumId sql.NullInt64
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
			&song.Year,
			&song.Bitrate,
			&song.Samplerate,
			&song.Duration,
			&song.Mode,
			&song.CbrVbr,
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
			song.Artist.Id = artistId.Int64
			song.Artist.Name = artistName.String
		}
		if albumId.Valid {
			song.Album = new(model.Album)
			song.Album.Id = albumId.Int64
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

func GetCoverForSong(song *model.Song) ([]byte, string, error) {
	image, mimetype, err := GetCoverFromID3(song.Path)

	if err != nil {
		log.Println("INFO try to find cover in path")
		image, mimetype, err = GetCoverFromPath(filepath.Dir(song.Path))
	}

	return image, mimetype, err
}
