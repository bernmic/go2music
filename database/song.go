package database

import (
	"database/sql"
	"fmt"
	"github.com/rs/xid"
	log "github.com/sirupsen/logrus"
	"go2music/model"
	"go2music/parser"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
	"time"
)

// SongManager defines all database functions for songs
type SongManager interface {
	CreateSong(song model.Song) (*model.Song, error)
	UpdateSong(song model.Song) (*model.Song, error)
	DeleteSong(id string) error
	SongExists(path string) bool
	FindOneSong(id string) (*model.Song, error)
	FindAllSongs(filter string, paging model.Paging) ([]*model.Song, int, error)
	FindSongsByAlbumId(findAlbumId string, paging model.Paging) ([]*model.Song, int, error)
	FindSongsByArtistId(findArtistId string, paging model.Paging) ([]*model.Song, int, error)
	FindSongsByPlaylist(playlistId string, paging model.Paging) ([]*model.Song, int, error)
	FindSongsByPlaylistQuery(query string, paging model.Paging) ([]*model.Song, int, error)
	FindSongsByYear(year string, paging model.Paging) ([]*model.Song, int, error)
	FindSongsByGenre(genre string, paging model.Paging) ([]*model.Song, int, error)
	GetCoverForSong(song *model.Song) ([]byte, string, error)
	SongPlayed(song *model.Song, user *model.User) bool
	GetAllSongIdsAndPaths() (map[string]string, error)
}

const (
	SqlSongExists = "SELECT 1 FROM song LIMIT 1"
	SqlSongCreate = `
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
	SqlSongIndexPath = "CREATE UNIQUE INDEX song_path ON song (path)"
	SqlSongIndexMbid = "CREATE INDEX song_mbid ON song (mbid)"

	SqlUserSongCreate = `
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

	SqlSongAll = `
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

	SqlSongCount = `
SELECT
	count(*)
FROM
	song
LEFT JOIN artist ON song.artist_id = artist.id
LEFT JOIN album ON song.album_id = album.id
`
	SqlSongInsert          = "INSERT INTO song (id, path, title, artist_id, album_id, genre, track, yearpublished, bitrate, samplerate, duration, mode, vbr, added, filedate, rating, mbid) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
	SqlSongUpdate          = "UPDATE song SET path=?, title=?, artist_id=?, album_id=?, genre=?, track=?, yearpublished=?, bitrate=?, samplerate=?, duration=?, mode=?, vbr=?, added=?, filedate=?, rating=?, mbid=? WHERE id=?"
	SqlSongDelete          = "DELETE FROM song WHERE id=?"
	SqlUserSongDelete      = "DELETE FROM user_song WHERE song_id=?"
	SqlSongPathExists      = "SELECT path FROM song WHERE path = ?"
	SqlSongCountByAlbum    = "SELECT COUNT(*) FROM song WHERE album_id = ?"
	SqlSongCountByArtist   = "SELECT COUNT(*) FROM song WHERE artist_id = ?"
	SqlSongCountByPlaylist = "SELECT COUNT(*) FROM song WHERE id IN (SELECT song_id FROM playlist_song WHERE playlist_id = ?)"
	SqlSongCountByYear     = "SELECT COUNT(*) FROM song WHERE yearpublished = ?"
	SqlSongCountByGenre    = "SELECT COUNT(*) FROM song WHERE genre = ?"
	SqlSongPlaycount       = "SELECT SUM(user_song.playcount) FROM song INNER JOIN user_song ON song.id = user_song.song_id WHERE song_id = ?"
	SqlUserSongById        = "SELECT user_id,song_id,rating,playcount FROM user_song WHERE user_id=? AND song_id=?"
	SqlUserSongInsert      = "INSERT INTO user_song (user_id, song_id, rating, playcount, lastplayed) VALUES(?, ?, ?, ?, ?)"
	SqlUserSongUpdate      = "UPDATE user_song SET rating=?, playcount=?, lastplayed=? WHERE user_id=? AND song_id=?"
	SqlSongOnlyIdAndPath   = "SELECT id, path FROM song"
	SqlSongDuration        = "SELECT SUM(duration) FROM song"
)

// CreateSong create a new song in the database
func (db *DB) CreateSong(song model.Song) (*model.Song, error) {
	song.Id = xid.New().String()
	_, err := db.Exec(db.Sanitizer(db.Stmt["sqlSongInsert"]),
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
		err = fmt.Errorf("error inserting row to database: %v", err)
	}
	return &song, err
}

// UpdateSong update the given song in the database
func (db *DB) UpdateSong(song model.Song) (*model.Song, error) {
	_, err := db.Exec(db.Sanitizer(db.Stmt["sqlSongUpdate"]),
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
		err = fmt.Errorf("error updating row to database: %v", err)
	}
	return &song, err
}

// DeleteSong delete the song with the id in the database
func (db *DB) DeleteSong(id string) error {
	_, err := db.Exec(db.Sanitizer(db.Stmt["sqlUserSongDelete"]), id)
	if err != nil {
		log.Errorf("Could not delete user_song for songid %s: %v", id, err)
		return err
	}
	_, err = db.Exec(db.Sanitizer(db.Stmt["sqlSongDelete"]), id)
	return err
}

// SongExists checks if the given path is a song in the database
func (db *DB) SongExists(path string) bool {
	err := db.QueryRow(db.Sanitizer(db.Stmt["sqlSongPathExists"]), path).Scan(&path)
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
	Stmt := db.Sanitizer(db.Stmt["sqlSongAll"]) + ` 
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
	err := db.QueryRow(Stmt, id).Scan(
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
		err = fmt.Errorf("error fetching songs from database: %v", err)
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
	rows, err := db.Query(db.Sanitizer(db.Stmt["sqlSongAll"]) + orderAndLimit)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer func() {
		err := rows.Close()
		if err != nil {
			log.Errorf("error closing rows in songs: %v", err)
		}
	}()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(db.Sanitizer(db.Stmt["sqlSongCount"]) + whereClause)
	}
	return songs, total, err
}

// FindSongsByAlbumId get all songs for the album with the given id and is in the given page
func (db *DB) FindSongsByAlbumId(findAlbumId string, paging model.Paging) ([]*model.Song, int, error) {
	orderAndLimit, limit := createOrderAndLimitForSong(paging)
	Stmt := db.Sanitizer(db.Stmt["sqlSongAll"]) + ` WHERE album.id = ?` + orderAndLimit
	rows, err := db.Query(Stmt, findAlbumId)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer func() {
		err := rows.Close()
		if err != nil {
			log.Errorf("error closing rows in songsByAlbum: %v", err)
		}
	}()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(db.Sanitizer(db.Stmt["sqlSongCountByAlbum"]), findAlbumId)
	}
	return songs, total, err
}

// FindSongsByArtistId get all songs for the artist with the given id and is in the given page
func (db *DB) FindSongsByArtistId(findArtistId string, paging model.Paging) ([]*model.Song, int, error) {
	orderAndLimit, limit := createOrderAndLimitForSong(paging)
	Stmt := db.Sanitizer(db.Stmt["sqlSongAll"]) + `WHERE artist.id = ?	` + orderAndLimit
	rows, err := db.Query(Stmt, findArtistId)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer func() {
		err := rows.Close()
		if err != nil {
			log.Errorf("error closing rows in songsByArtist: %v", err)
		}
	}()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(db.Sanitizer(db.Stmt["sqlSongCountByArtist"]), findArtistId)
	}
	return songs, total, err
}

// FindSongsByPlaylistQuery get all songs for the dynamic playlist with the given id and is in the given page
func (db *DB) FindSongsByPlaylistQuery(query string, paging model.Paging) ([]*model.Song, int, error) {
	Stmt := db.Sanitizer(db.Stmt["sqlSongAll"])
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

	rows, err := db.Query(Stmt + where + orderAndLimit)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer func() {
		err := rows.Close()
		if err != nil {
			log.Errorf("error closing rows in songsByPlaylistQuery: %v", err)
		}
	}()
	songs, err := fetchSongs(rows)

	total := len(songs)
	if limit {
		total = db.countRows(db.Sanitizer(db.Stmt["sqlSongCount"]) + where)
	}
	return songs, total, err
}

// FindSongsByPlaylist get all songs for the static playlist with the given id and is in the given page
func (db *DB) FindSongsByPlaylist(playlistId string, paging model.Paging) ([]*model.Song, int, error) {
	orderAndLimit, limit := createOrderAndLimitForSong(paging)
	Stmt := db.Sanitizer(db.Stmt["sqlSongAll"]) + " WHERE song.id IN (SELECT song_id FROM playlist_song WHERE playlist_id = ?)" + orderAndLimit
	rows, err := db.Query(Stmt, playlistId)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer func() {
		err := rows.Close()
		if err != nil {
			log.Errorf("error closing rows in songsByPlaylist: %v", err)
		}
	}()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(db.Sanitizer(db.Stmt["sqlSongCountByPlaylist"]), playlistId)
	}
	return songs, total, err
}

// FindSongsByYear get all songs published in the given year and is in the given page
func (db *DB) FindSongsByYear(year string, paging model.Paging) ([]*model.Song, int, error) {
	orderAndLimit, limit := createOrderAndLimitForSong(paging)
	Stmt := db.Sanitizer(db.Stmt["sqlSongAll"]) + " WHERE song.yearpublished = ?" + orderAndLimit
	rows, err := db.Query(Stmt, year)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer func() {
		err := rows.Close()
		if err != nil {
			log.Errorf("error closing rows in songsByYear: %v", err)
		}
	}()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(db.Sanitizer(db.Stmt["sqlSongCountByYear"]), year)
	}
	return songs, total, err
}

// FindSongsByGenre get all songs with the given genre and is in the given page
func (db *DB) FindSongsByGenre(genre string, paging model.Paging) ([]*model.Song, int, error) {
	orderAndLimit, limit := createOrderAndLimitForSong(paging)
	Stmt := db.Sanitizer(db.Stmt["sqlSongAll"]) + " WHERE song.genre = ?" + orderAndLimit
	rows, err := db.Query(Stmt, genre)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer func() {
		err := rows.Close()
		if err != nil {
			log.Errorf("error closing rows in songsByGenre: %v", err)
		}
	}()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(db.Sanitizer(db.Stmt["sqlSongCountByGenre"]), genre)
	}
	return songs, total, err
}

// FindRecentlyAddedSongs find num recently added songs
func (db *DB) FindRecentlyAddedSongs(num int) ([]*model.Song, error) {
	rows, err := db.Query(db.Sanitizer(db.Stmt["sqlSongAll"])+" ORDER BY song.added DESC LIMIT ?", num)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, err
	}
	defer func() {
		err := rows.Close()
		if err != nil {
			log.Errorf("error closing rows in recentlyAddedSongs: %v", err)
		}
	}()
	songs, err := fetchSongs(rows)
	return songs, err
}

// FindRecentlyPlayedSongs find num recently played songs
func (db *DB) FindRecentlyPlayedSongs(num int) ([]*model.Song, error) {
	rows, err := db.Query(db.Sanitizer(db.Stmt["sqlSongAll"])+" INNER JOIN user_song ON song.id = user_song.song_id ORDER BY lastplayed DESC LIMIT ?", num)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, err
	}
	defer func() {
		err := rows.Close()
		if err != nil {
			log.Errorf("error closing rows in recentlyPlayedSongs: %v", err)
		}
	}()
	songs, err := fetchSongs(rows)
	return songs, err
}

// FindMostPlayedSongs find num most played songs
func (db *DB) FindMostPlayedSongs(num int) ([]*model.Song, error) {
	rows, err := db.Query(db.Sanitizer(db.Stmt["sqlSongAll"])+`
	INNER JOIN user_song ON song.id = user_song.song_id
	GROUP BY user_song.song_id
	ORDER BY SUM(user_song.playcount) DESC LIMIT ?
		`, num)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, err
	}
	defer func() {
		err := rows.Close()
		if err != nil {
			log.Errorf("error closing rows in mostPlayedSongs: %v", err)
		}
	}()
	songs, err := fetchSongs(rows)
	for _, s := range songs {
		s.PlayCount = db.countRows(db.Sanitizer(db.Stmt["sqlSongPlaycount"]), s.Id)
	}
	return songs, err
}

// GetCoverForSong returns the cover of a song
func (db *DB) GetCoverForSong(song *model.Song) ([]byte, string, error) {
	image, mimetype, err := GetCoverFromID3(song.Path)

	if err != nil {
		log.Info("try to find cover in path")
		image, mimetype, err = GetCoverFromPath(filepath.Dir(song.Path))
	}

	return image, mimetype, err
}

// SongPlayed checks if an user has played the song
func (db *DB) SongPlayed(song *model.Song, user *model.User) bool {
	userSong := model.UserSong{}
	err := db.QueryRow(
		db.Sanitizer(db.Stmt["sqlUserSongById"]),
		user.Id,
		song.Id).Scan(&userSong.UserId, &userSong.SongId, &userSong.Rating, &userSong.PlayCount)
	if err != nil {
		userSong = model.UserSong{UserId: user.Id, SongId: song.Id, Rating: 0, PlayCount: 1}
		_, err := db.Exec(
			db.Sanitizer(db.Stmt["sqlUserSongInsert"]),
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
		_, err := db.Exec(db.Sanitizer(db.Stmt["sqlUserSongUpdate"]),
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
	rows, err := db.Query(db.Sanitizer(db.Stmt["sqlSongOnlyIdAndPath"]))
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

// ImageFile contains data about an image
type ImageFile struct {
	path     string
	mimetype string
}

// GetCoverFromPath gets a cover from the path if there is one
func GetCoverFromPath(path string) ([]byte, string, error) {
	var files []ImageFile
	err := filepath.Walk(path, func(path string, f os.FileInfo, err error) error {
		if err == nil && !f.IsDir() {
			ext := strings.ToLower(f.Name())
			if filepath.Ext(ext) == ".gif" {
				files = append(files, ImageFile{path: path, mimetype: "image/gif"})
			} else if filepath.Ext(ext) == ".jpg" {
				files = append(files, ImageFile{path: path, mimetype: "image/jpeg"})
			} else if filepath.Ext(ext) == ".jpeg" {
				files = append(files, ImageFile{path: path, mimetype: "image/jpeg"})
			} else if filepath.Ext(ext) == ".png" {
				files = append(files, ImageFile{path: path, mimetype: "image/png"})
			}
		}
		return nil
	})

	if err != nil {
		return nil, "", fmt.Errorf("error in Walk: %v", err)
	}
	log.Infof("Found cover files: %v", files)
	if len(files) > 0 {
		// todo select the correct cover file
		for _, f := range files {
			lcFilename := filepath.Base(f.path)
			lcFilename = strings.ToLower(lcFilename)
			if strings.Contains(lcFilename, "cover") ||
				strings.Contains(lcFilename, "front") ||
				strings.Contains(lcFilename, "folder") {
				image, err := ioutil.ReadFile(f.path)
				return image, f.mimetype, err
			}
		}
		image, err := ioutil.ReadFile(files[0].path)
		return image, files[0].mimetype, err
	}
	return nil, "", fmt.Errorf("no cover found in path %s", path)
}
