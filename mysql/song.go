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
	sqlSongExists = "SELECT 1 FROM song LIMIT 1"
	sqlSongCreate = `
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
		mbid VARCHAR(36),
		PRIMARY KEY (id),
		FOREIGN KEY (artist_id) REFERENCES artist(id),
		FOREIGN KEY (album_id) REFERENCES album(id)
		);
	`
	sqlSongIndexPath = "CREATE UNIQUE INDEX song_path ON song (path)"
	sqlSongIndexMbid = "CREATE INDEX song_mbid ON song (mbid)"

	sqlUserSongCreate = `
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

	sqlSongAll = `
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
	album.path album_path,
	song.mbid
FROM
	song
LEFT JOIN artist ON song.artist_id = artist.id
LEFT JOIN album ON song.album_id = album.id
`

	sqlSongCount = `
SELECT
	count(*)
FROM
	song
LEFT JOIN artist ON song.artist_id = artist.id
LEFT JOIN album ON song.album_id = album.id
`
	sqlSongInsert          = "INSERT INTO song (id, path, title, artist_id, album_id, genre, track, yearpublished, bitrate, samplerate, duration, mode, vbr, added, filedate, rating, mbid) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
	sqlSongUpdate          = "UPDATE song SET path=?, title=?, artist_id=?, album_id=?, genre=?, track=?, yearpublished=?, bitrate=?, samplerate=?, duration=?, mode=?, vbr=?, added=?, filedate=?, rating=?, mbid=? WHERE id=?"
	sqlSongDelete          = "DELETE FROM song WHERE id=?"
	sqlUserSongDelete      = "DELETE FROM user_song WHERE song_id=?"
	sqlSongPathExists      = "SELECT path FROM song WHERE path = ?"
	sqlSongCountByAlbum    = "SELECT COUNT(*) FROM song WHERE album_id = ?"
	sqlSongCountByArtist   = "SELECT COUNT(*) FROM song WHERE artist_id = ?"
	sqlSongCountByPlaylist = "SELECT COUNT(*) FROM song WHERE id IN (SELECT song_id FROM playlist_song WHERE playlist_id = ?)"
	sqlSongCountByYear     = "SELECT COUNT(*) FROM song WHERE yearpublished = ?"
	sqlSongCountByGenre    = "SELECT COUNT(*) FROM song WHERE genre = ?"
	sqlSongPlaycount       = "SELECT SUM(user_song.playcount) FROM song INNER JOIN user_song ON song.id = user_song.song_id WHERE song_id = ?"
	sqlUserSongById        = "SELECT user_id,song_id,rating,playcount FROM user_song WHERE user_id=? AND song_id=?"
	sqlUserSongInsert      = "INSERT INTO user_song (user_id, song_id, rating, playcount, lastplayed) VALUES(?, ?, ?, ?, ?)"
	sqlUserSongUpdate      = "UPDATE user_song SET rating=?, playcount=?, lastplayed=? WHERE user_id=? AND song_id=?"
	sqlSongOnlyIdAndPath   = "SELECT id, path FROM song"
	sqlSongDuration        = "SELECT SUM(duration) FROM song"
)

func (db *DB) initializeSong() {
	_, err := db.Query(sqlSongExists)
	if err != nil {
		log.Info("Table song does not exists. Creating now.")
		_, err := db.Exec(sqlSongCreate)
		if err != nil {
			log.Error("Error creating song table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Song Table successfully created....")
		}
		_, err = db.Exec(sqlUserSongCreate)
		if err != nil {
			log.Error("Error creating user_song table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("UserSong Table successfully created....")
		}
		_, err = db.Exec(sqlSongIndexPath)
		if err != nil {
			log.Error("Error creating song table index for path")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on song path generated....")
		}
		_, err = db.Exec(sqlSongIndexMbid)
		if err != nil {
			log.Error("Error creating song table index for mbid")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on song mbid generated....")
		}
	}
}

// CreateSong create a new song in the database
func (db *DB) CreateSong(song model.Song) (*model.Song, error) {
	song.Id = xid.New().String()
	_, err := db.Exec(sanitizePlaceholder(sqlSongInsert),
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
		song.Rating,
		song.Mbid)
	if err != nil {
		err = fmt.Errorf("Error inserting row to database: %v", err)
	}
	return &song, err
}

// UpdateSong update the given song in the database
func (db *DB) UpdateSong(song model.Song) (*model.Song, error) {
	_, err := db.Exec(sanitizePlaceholder(sqlSongUpdate),
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
		song.Mbid,
		song.Id)
	if err != nil {
		err = fmt.Errorf("Error updating row to database: %v", err)
	}
	return &song, err
}

// DeleteSong delete the song with the id in the database
func (db *DB) DeleteSong(id string) error {
	_, err := db.Exec(sanitizePlaceholder(sqlUserSongDelete), id)
	if err != nil {
		log.Errorf("Could not delete user_song for songid %s: %v", id, err)
		return err
	}
	_, err = db.Exec(sanitizePlaceholder(sqlSongDelete), id)
	return err
}

// SongsExists checks if the given path is a song in the database
func (db *DB) SongExists(path string) bool {
	sqlStmt := sanitizePlaceholder(sqlSongPathExists)
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

// FindOneSong get the song with the given id
func (db *DB) FindOneSong(id string) (*model.Song, error) {
	stmt := sqlSongAll + ` 
		WHERE
			song.id=?
	`
	song := new(model.Song)
	var artistId sql.NullString
	var artistName sql.NullString
	var albumId sql.NullString
	var albumTitle sql.NullString
	var albumPath sql.NullString
	var mbid sql.NullString
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
		&albumPath,
		&mbid)
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
	if mbid.Valid {
		song.Mbid = mbid.String
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
	var mbid sql.NullString
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
			&albumPath,
			&mbid)
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
		if mbid.Valid {
			song.Mbid = mbid.String
		}
		songs = append(songs, song)
	}
	err := rows.Err()
	if err != nil {
		err = fmt.Errorf("Error fetchins songs from database: %v", err)
	}
	return songs, err
}

// FindAllSongs get all songs which matches the optional filter and is in the given page
func (db *DB) FindAllSongs(filter string, paging model.Paging) ([]*model.Song, int, error) {
	orderAndLimit, limit := createOrderAndLimitForSong(paging)
	whereClause := ""
	if filter != "" {
		whereClause = " WHERE LOWER(song.title) LIKE '%" + strings.ToLower(filter) + "%'" +
			" OR LOWER(album.title) LIKE '%" + strings.ToLower(filter) + "%'" +
			" OR LOWER(artist.name) LIKE '%" + strings.ToLower(filter) + "%'"
		orderAndLimit = whereClause + orderAndLimit
	}
	rows, err := db.Query(sanitizePlaceholder(sqlSongAll + orderAndLimit))
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(sanitizePlaceholder(sqlSongCount + whereClause))
	}
	return songs, total, err
}

// FindSongsByAlbumId get all songs for the album with the given id and is in the given page
func (db *DB) FindSongsByAlbumId(findAlbumId string, paging model.Paging) ([]*model.Song, int, error) {
	orderAndLimit, limit := createOrderAndLimitForSong(paging)
	stmt := sanitizePlaceholder(sqlSongAll + ` WHERE album.id = ?` + orderAndLimit)
	rows, err := db.Query(stmt, findAlbumId)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(sanitizePlaceholder(sqlSongCountByAlbum), findAlbumId)
	}
	return songs, total, err
}

// FindSongsByArtistId get all songs for the artist with the given id and is in the given page
func (db *DB) FindSongsByArtistId(findArtistId string, paging model.Paging) ([]*model.Song, int, error) {
	orderAndLimit, limit := createOrderAndLimitForSong(paging)
	stmt := sanitizePlaceholder(sqlSongAll + `WHERE artist.id = ?	` + orderAndLimit)
	rows, err := db.Query(stmt, findArtistId)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(sanitizePlaceholder(sqlSongCountByArtist), findArtistId)
	}
	return songs, total, err
}

// FindSongsByPlaylistQuery get all songs for the dynamic playlist with the given id and is in the given page
func (db *DB) FindSongsByPlaylistQuery(query string, paging model.Paging) ([]*model.Song, int, error) {
	stmt := sqlSongAll
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
		total = db.countRows(sqlSongCount + where)
	}
	return songs, total, err
}

// FindSongsByPlaylist get all songs for the static playlist with the given id and is in the given page
func (db *DB) FindSongsByPlaylist(playlistId string, paging model.Paging) ([]*model.Song, int, error) {
	orderAndLimit, limit := createOrderAndLimitForSong(paging)
	stmt := sanitizePlaceholder(sqlSongAll + " WHERE song.id IN (SELECT song_id FROM playlist_song WHERE playlist_id = ?)" + orderAndLimit)
	rows, err := db.Query(stmt, playlistId)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(sanitizePlaceholder(sqlSongCountByPlaylist), playlistId)
	}
	return songs, total, err
}

// FindSongsByYear get all songs published in the given year and is in the given page
func (db *DB) FindSongsByYear(year string, paging model.Paging) ([]*model.Song, int, error) {
	orderAndLimit, limit := createOrderAndLimitForSong(paging)
	stmt := sanitizePlaceholder(sqlSongAll + " WHERE song.yearpublished = ?" + orderAndLimit)
	rows, err := db.Query(stmt, year)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(sanitizePlaceholder(sqlSongCountByYear), year)
	}
	return songs, total, err
}

// FindSongsByGenre get all songs with the given genre and is in the given page
func (db *DB) FindSongsByGenre(genre string, paging model.Paging) ([]*model.Song, int, error) {
	orderAndLimit, limit := createOrderAndLimitForSong(paging)
	stmt := sanitizePlaceholder(sqlSongAll + " WHERE song.genre = ?" + orderAndLimit)
	rows, err := db.Query(stmt, genre)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(sanitizePlaceholder(sqlSongCountByGenre), genre)
	}
	return songs, total, err
}

// FindRecentlyAddedSongs find num recently added songs
func (db *DB) FindRecentlyAddedSongs(num int) ([]*model.Song, error) {
	rows, err := db.Query(sanitizePlaceholder(sqlSongAll+" ORDER BY song.added DESC LIMIT ?"), num)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
	return songs, err
}

// FindRecentlyPlayedSongs find num recently played songs
func (db *DB) FindRecentlyPlayedSongs(num int) ([]*model.Song, error) {
	rows, err := db.Query(sanitizePlaceholder(sqlSongAll+" INNER JOIN user_song ON song.id = user_song.song_id ORDER BY lastplayed DESC LIMIT ?"), num)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
	return songs, err
}

// FindMostPlayedSongs find num most played songs
func (db *DB) FindMostPlayedSongs(num int) ([]*model.Song, error) {
	rows, err := db.Query(sanitizePlaceholder(sqlSongAll+`
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
	for _, s := range songs {
		s.PlayCount = db.countRows(sanitizePlaceholder(sqlSongPlaycount), s.Id)
	}
	return songs, err
}

// GetCoverForSong returns the cover of a song
func (db *DB) GetCoverForSong(song *model.Song) ([]byte, string, error) {
	image, mimetype, err := fs.GetCoverFromID3(song.Path)

	if err != nil {
		log.Info("try to find cover in path")
		image, mimetype, err = fs.GetCoverFromPath(filepath.Dir(song.Path))
	}

	return image, mimetype, err
}

// SongPlayed checks if an user has played the song
func (db *DB) SongPlayed(song *model.Song, user *model.User) bool {
	userSong := model.UserSong{}
	err := db.QueryRow(
		sanitizePlaceholder(sqlUserSongById),
		user.Id,
		song.Id).Scan(&userSong.UserId, &userSong.SongId, &userSong.Rating, &userSong.PlayCount)
	if err != nil {
		userSong = model.UserSong{UserId: user.Id, SongId: song.Id, Rating: 0, PlayCount: 1}
		_, err := db.Exec(
			sanitizePlaceholder(sqlUserSongInsert),
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
		_, err := db.Exec(sanitizePlaceholder(sqlUserSongUpdate),
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

// GetAllSongIdsAndPaths returns all song ids and path as a map
func (db *DB) GetAllSongIdsAndPaths() (map[string]string, error) {
	rows, err := db.Query(sanitizePlaceholder(sqlSongOnlyIdAndPath))
	if err != nil {
		return nil, err
	}
	result := make(map[string]string, 0)
	var id, path string
	for rows.Next() {
		err = rows.Scan(&id, &path)
		if err == nil {
			result[id] = path
		}
	}

	return result, rows.Err()
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
