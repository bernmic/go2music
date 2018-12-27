package mysql

import (
	"database/sql"
	"fmt"
	"go2music/fs"
	"go2music/model"
	"go2music/parser"
	"path/filepath"
	"strings"
	"time"

	"github.com/rs/xid"
	log "github.com/sirupsen/logrus"
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

	createUserSongTableStatement = `
	CREATE TABLE user_song (
		user_id VARCHAR(32),
		song_id VARCHAR(32),
		rating INT NOT NULL,
		playcount INT NOT NULL,
		lastplayed INT NOT NULL,
		PRIMARY KEY (user_id, song_id),
		FOREIGN KEY (user_id) REFERENCES guser(id),
		FOREIGN KEY (song_id) REFERENCES song(id)
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

	selectCountSongStatement = `
SELECT
	count(*)
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
		_, err := db.Exec(createSongTableStatement)
		if err != nil {
			log.Error("Error creating song table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Song Table successfully created....")
		}
		_, err = db.Exec(createUserSongTableStatement)
		if err != nil {
			log.Error("Error creating user_song table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("UserSong Table successfully created....")
		}
		_, err = db.Exec("CREATE UNIQUE INDEX song_path ON song (path)")
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
	_, err := db.Exec(sanitizePlaceholder("INSERT INTO song (id, path, title, artist_id, album_id, genre, track, yearpublished, bitrate, samplerate, duration, mode, vbr, added, filedate, rating) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"),
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
		log.Error(err)
	}
	return &song, err
}

func (db *DB) UpdateSong(song model.Song) (*model.Song, error) {
	_, err := db.Exec(sanitizePlaceholder("UPDATE song SET path=?, title=?, artist_id=?, album_id=?, genre=?, track=?, yearpublished=?, bitrate=?, samplerate=?, duration=?, mode=?, vbr=?, added=?, filedate=?, rating=? WHERE id=?"),
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
	_, err := db.Exec(sanitizePlaceholder("DELETE FROM song WHERE id=?"), id)
	return err
}

func (db *DB) SongExists(path string) bool {
	sqlStmt := sanitizePlaceholder(`SELECT path FROM song WHERE path = ?`)
	err := db.QueryRow(sqlStmt, path).Scan(&path)
	if err != nil {
		if err != sql.ErrNoRows {
			// a real error happened! you should change your function return
			// to "(bool, error)" and return "false, err" here
			log.Error("Error reading song from database: ", err)
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
	err := db.QueryRow(sanitizePlaceholder(stmt), id).Scan(
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
		log.Errorf("Error get song: %v", err)
		return nil, err
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

func fetchSongs(rows *sql.Rows) ([]*model.Song, error) {
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
			log.Error(err)
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
	err := rows.Err()
	if err != nil {
		log.Error(err)
	}
	return songs, err
}

func (db *DB) FindAllSongs(filter string, paging model.Paging) ([]*model.Song, int, error) {
	orderAndLimit, limit := createOrderAndLimitForSong(paging)
	whereClause := ""
	if filter != "" {
		whereClause = " WHERE LOWER(song.title) LIKE '%" + strings.ToLower(filter) + "%'" +
			" OR LOWER(album.title) LIKE '%" + strings.ToLower(filter) + "%'" +
			" OR LOWER(artist.name) LIKE '%" + strings.ToLower(filter) + "%'"
		orderAndLimit = whereClause + orderAndLimit
	}
	rows, err := db.Query(sanitizePlaceholder(selectSongStatement + orderAndLimit))
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(sanitizePlaceholder(selectCountSongStatement + whereClause))
	}
	return songs, total, err
}

func (db *DB) FindSongsByAlbumId(findAlbumId string, paging model.Paging) ([]*model.Song, int, error) {
	orderAndLimit, limit := createOrderAndLimitForSong(paging)
	stmt := sanitizePlaceholder(selectSongStatement + ` WHERE album.id = ?` + orderAndLimit)
	rows, err := db.Query(stmt, findAlbumId)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(sanitizePlaceholder("SELECT COUNT(*) FROM song WHERE album_id = ?"), findAlbumId)
	}
	return songs, total, err
}

func (db *DB) FindSongsByArtistId(findArtistId string, paging model.Paging) ([]*model.Song, int, error) {
	orderAndLimit, limit := createOrderAndLimitForSong(paging)
	stmt := sanitizePlaceholder(selectSongStatement + `WHERE artist.id = ?	` + orderAndLimit)
	rows, err := db.Query(stmt, findArtistId)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(sanitizePlaceholder("SELECT COUNT(*) FROM song WHERE artist_id = ?"), findArtistId)
	}
	return songs, total, err
}

func (db *DB) FindSongsByPlaylistQuery(query string, paging model.Paging) ([]*model.Song, int, error) {
	stmt := selectSongStatement
	where, err := parser.EvalPlaylistExpression(query)
	if err != nil {
		log.Error("Error parsing playlist query", err)
		return nil, 0, err
	}
	if where != "" {
		where = " WHERE " + where
		log.Info(where)
	}

	orderAndLimit, limit := createOrderAndLimitForSong(paging)

	rows, err := db.Query(stmt + where + orderAndLimit)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)

	total := len(songs)
	if limit {
		countStmt :=
			`
SELECT 
 COUNT(*) 
FROM 
 song 
LEFT JOIN artist ON song.artist_id = artist.id
LEFT JOIN album ON song.album_id = album.id`

		total = db.countRows(countStmt + where)
	}
	return songs, total, err
}

func (db *DB) FindSongsByPlaylist(playlistId string, paging model.Paging) ([]*model.Song, int, error) {
	orderAndLimit, limit := createOrderAndLimitForSong(paging)
	stmt := sanitizePlaceholder(selectSongStatement + " WHERE song.id IN (SELECT song_id FROM playlist_song WHERE playlist_id = ?)" + orderAndLimit)
	rows, err := db.Query(stmt, playlistId)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(sanitizePlaceholder("SELECT COUNT(*) FROM song WHERE id IN (SELECT song_id FROM playlist_song WHERE playlist_id = ?)"), playlistId)
	}
	return songs, total, err
}

func (db *DB) FindRecentlyAddedSongs(num int) ([]*model.Song, error) {
	rows, err := db.Query(sanitizePlaceholder(selectSongStatement+" ORDER BY song.added DESC LIMIT ?"), num)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
	return songs, err
}

func (db *DB) FindRecentlyPlayedSongs(num int) ([]*model.Song, error) {
	rows, err := db.Query(sanitizePlaceholder(selectSongStatement+" INNER JOIN user_song ON song.id = user_song.song_id ORDER BY lastplayed DESC LIMIT ?"), num)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
	return songs, err
}

func (db *DB) FindMostPlayedSongs(num int) ([]*model.Song, error) {
	rows, err := db.Query(sanitizePlaceholder(selectSongStatement+`
	INNER JOIN user_song ON song.id = user_song.song_id
	GROUP BY user_song.song_id
	ORDER BY SUM(user_song.playcount) DESC LIMIT ?
		`), num)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
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

func (db *DB) SongPlayed(song *model.Song, user *model.User) bool {
	userSong := model.UserSong{}
	err := db.QueryRow(
		sanitizePlaceholder("SELECT user_id,song_id,rating,playcount FROM user_song WHERE user_id=? AND song_id=?"),
		user.Id,
		song.Id).Scan(&userSong.UserId, &userSong.SongId, &userSong.Rating, &userSong.PlayCount)
	if err != nil {
		userSong = model.UserSong{UserId: user.Id, SongId: song.Id, Rating: 0, PlayCount: 1}
		_, err := db.Exec(
			sanitizePlaceholder("INSERT INTO user_song (user_id, song_id, rating, playcount, lastplayed) VALUES(?, ?, ?, ?, ?)"),
			userSong.UserId,
			userSong.SongId,
			userSong.Rating,
			userSong.PlayCount,
			time.Now().Unix(),
		)
		if err != nil {
			log.Error(err)
			return false
		}
	} else {
		_, err := db.Exec(sanitizePlaceholder("UPDATE user_song SET rating=?, playcount=?, lastplayed=? WHERE user_id=? AND song_id=?"),
			userSong.Rating,
			userSong.PlayCount+1,
			time.Now().Unix(),
			userSong.UserId,
			userSong.SongId)
		if err != nil {
			log.Error(err)
			return false
		}
	}
	return true
}

func createOrderAndLimitForSong(paging model.Paging) (string, bool) {
	s := ""
	l := false
	if paging.Sort != "" {
		switch paging.Sort {
		case "title":
			s += " ORDER BY song.title"
		case "album", "album.title":
			s += " ORDER BY album.title"
		case "artist", "artist.name":
			s += " ORDER BY artist.name"
		case "genre":
			s += " ORDER BY song.genre"
		case "track":
			s += " ORDER BY song.track"
		case "year", "yearPublished":
			s += " ORDER BY song.yearpublished"
		case "duration":
			s += " ORDER BY song.duration"
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
