package service

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"go2music/model"
	"log"
)

var createTableStatement = `
	CREATE TABLE IF NOT EXISTS song (
		id BIGINT NOT NULL AUTO_INCREMENT,
		path varchar(255) NOT NULL,
		title varchar(255),
		artist_id BIGINT NULL,
		album_id BIGINT NULL,
		genre varchar(255) NULL,
		track int NULL,
		yearpublished varchar(32) NULL,
		PRIMARY KEY (id),
		FOREIGN KEY (artist_id) REFERENCES artist(id),
		FOREIGN KEY (album_id) REFERENCES album(id)
		);
`

func InitializeSong() {
	_, err := Database.Query("SELECT 1 FROM song LIMIT 1")
	if err != nil {
		log.Print("Table song does not exists. Creating now.")
		stmt, err := Database.Prepare(createTableStatement)
		if err != nil {
			log.Print("Error creating song table")
			panic(fmt.Sprintf("%v", err))
		}
		_, err = stmt.Exec()
		if err != nil {
			log.Print("Error creating song table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Println("Song Table successfully created....")
		}
		stmt, err = Database.Prepare("ALTER TABLE song ADD UNIQUE INDEX song_path (path)")
		if err != nil {
			log.Print("Error creating song table index for path")
			panic(fmt.Sprintf("%v", err))
		}
		_, err = stmt.Exec()
		if err != nil {
			log.Print("Error creating song table index for path")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Println("Index on path generated....")
		}
	}
}

func CreateSong(song model.Song) (*model.Song, error) {
	result, err := Database.Exec("INSERT IGNORE INTO song (path, title, artist_id, album_id, genre, track, yearpublished) VALUES(?,?,?,?,?,?,?)", song.Path, song.Title, song.Artist.Id, song.Album.Id, song.Genre, song.Track, song.Year)
	if err != nil {
		log.Fatal(err)
	}
	song.Id, _ = result.LastInsertId()
	return &song, err
}

func UpdateSong(song model.Song) (*model.Song, error) {
	_, err := Database.Exec("UPDATE song SET path=?, title=?, artist_id=?, album_id=?, genre=?, track=?, yearpublished=? WHERE id=?", song.Path, song.Title, song.Artist.Id, song.Album.Id, song.Genre, song.Track, song.Year, song.Id)
	return &song, err
}

func DeleteSong(id int64) error {
	_, err := Database.Exec("DELETE FROM song WHERE id=?", id)
	return err
}

func FindOneSong(id int64) (*model.Song, error) {
	stmt := `
		SELECT
			song.id,
			song.path,
			song.title,
			song.genre,
			song.track,
			song.yearpublished,
			artist.id artist_id,
			artist.name,
			album.id album_id,
			album.title album_title,
			album.path album_path
 		FROM
			song
		LEFT JOIN artist ON song.artist_id = artist.id
		LEFT JOIN album ON song.album_id = album.id
		WHERE
			song.id=?
	`
	song := new(model.Song)
	var artistId sql.NullInt64
	var artistName sql.NullString
	var albumId sql.NullInt64
	var albumTitle sql.NullString
	var albumPath sql.NullString
	err := Database.QueryRow(stmt, id).Scan(&song.Id, &song.Path, &song.Title, &song.Genre, &song.Track, &song.Year, &artistId, &artistName, &albumId, &albumTitle, &albumPath)
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
	stmt := `
	SELECT
		song.id,
		song.path,
		song.title,
		song.genre,
		song.track,
		song.yearpublished,
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
	rows, err := Database.Query(stmt)
	if err != nil {
		log.Fatal(err)
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
		err := rows.Scan(&song.Id, &song.Path, &song.Title, &song.Genre, &song.Track, &song.Year, &artistId, &artistName, &albumId, &albumTitle, &albumPath)
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
