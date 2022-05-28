package mysql

import (
	"database/sql"
	"fmt"
	"go2music/database"
	"go2music/fs"
	"go2music/model"
	"go2music/parser"
	"path/filepath"
	"strings"
	"time"

	"github.com/rs/xid"
	log "github.com/sirupsen/logrus"
)

func (db *DB) initializeSong() {
	db.stmt["sqlSongExists"] = database.SqlSongExists
	db.stmt["sqlSongCreate"] = database.SqlSongCreate
	db.stmt["sqlSongIndexPath"] = database.SqlSongIndexPath
	db.stmt["sqlSongIndexMbid"] = database.SqlSongIndexMbid
	db.stmt["sqlUserSongCreate"] = database.SqlUserSongCreate
	db.stmt["sqlSongAll"] = database.SqlSongAll
	db.stmt["sqlSongCount"] = database.SqlSongCount
	db.stmt["sqlSongInsert"] = database.SqlSongInsert
	db.stmt["sqlSongUpdate"] = database.SqlSongUpdate
	db.stmt["sqlSongDelete"] = database.SqlSongDelete
	db.stmt["sqlUserSongDelete"] = database.SqlUserSongDelete
	db.stmt["sqlSongPathExists"] = database.SqlSongPathExists
	db.stmt["sqlSongCountByAlbum"] = database.SqlSongCountByAlbum
	db.stmt["sqlSongCountByArtist"] = database.SqlSongCountByArtist
	db.stmt["sqlSongCountByPlaylist"] = database.SqlSongCountByPlaylist
	db.stmt["sqlSongCountByYear"] = database.SqlSongCountByYear
	db.stmt["sqlSongCountByGenre"] = database.SqlSongCountByGenre
	db.stmt["sqlSongPlaycount"] = database.SqlSongPlaycount
	db.stmt["sqlUserSongById"] = database.SqlUserSongById
	db.stmt["sqlUserSongInsert"] = database.SqlUserSongInsert
	db.stmt["sqlUserSongUpdate"] = database.SqlUserSongUpdate
	db.stmt["sqlSongOnlyIdAndPath"] = database.SqlSongOnlyIdAndPath
	db.stmt["sqlSongDuration"] = database.SqlSongDuration
	_, err := db.Query(db.sanitizer(db.stmt["sqlSongExists"]))
	if err != nil {
		log.Info("Table song does not exists. Creating now.")
		_, err := db.Exec(db.sanitizer(db.stmt["sqlSongCreate"]))
		if err != nil {
			log.Error("Error creating song table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Song Table successfully created....")
		}
		_, err = db.Exec(db.sanitizer(db.stmt["sqlUserSongCreate"]))
		if err != nil {
			log.Error("Error creating user_song table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("UserSong Table successfully created....")
		}
		_, err = db.Exec(db.sanitizer(db.stmt["sqlSongIndexPath"]))
		if err != nil {
			log.Error("Error creating song table index for path")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Info("Index on song path generated....")
		}
		_, err = db.Exec(db.sanitizer(db.stmt["sqlSongIndexMbid"]))
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
	_, err := db.Exec(db.sanitizer(db.stmt["sqlSongInsert"]),
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
	_, err := db.Exec(db.sanitizer(db.stmt["sqlSongUpdate"]),
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
	_, err := db.Exec(db.sanitizer(db.stmt["sqlUserSongDelete"]), id)
	if err != nil {
		log.Errorf("Could not delete user_song for songid %s: %v", id, err)
		return err
	}
	_, err = db.Exec(db.sanitizer(db.stmt["sqlSongDelete"]), id)
	return err
}

// SongExists checks if the given path is a song in the database
func (db *DB) SongExists(path string) bool {
	err := db.QueryRow(db.sanitizer(db.stmt["sqlSongPathExists"]), path).Scan(&path)
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
	stmt := db.sanitizer(db.stmt["sqlSongAll"]) + ` 
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
	rows, err := db.Query(db.sanitizer(db.stmt["sqlSongAll"]) + orderAndLimit)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(db.sanitizer(db.stmt["sqlSongCount"]) + whereClause)
	}
	return songs, total, err
}

// FindSongsByAlbumId get all songs for the album with the given id and is in the given page
func (db *DB) FindSongsByAlbumId(findAlbumId string, paging model.Paging) ([]*model.Song, int, error) {
	orderAndLimit, limit := createOrderAndLimitForSong(paging)
	stmt := db.sanitizer(db.stmt["sqlSongAll"]) + ` WHERE album.id = ?` + orderAndLimit
	rows, err := db.Query(stmt, findAlbumId)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(db.sanitizer(db.stmt["sqlSongCountByAlbum"]), findAlbumId)
	}
	return songs, total, err
}

// FindSongsByArtistId get all songs for the artist with the given id and is in the given page
func (db *DB) FindSongsByArtistId(findArtistId string, paging model.Paging) ([]*model.Song, int, error) {
	orderAndLimit, limit := createOrderAndLimitForSong(paging)
	stmt := db.sanitizer(db.stmt["sqlSongAll"]) + `WHERE artist.id = ?	` + orderAndLimit
	rows, err := db.Query(stmt, findArtistId)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(db.sanitizer(db.stmt["sqlSongCountByArtist"]), findArtistId)
	}
	return songs, total, err
}

// FindSongsByPlaylistQuery get all songs for the dynamic playlist with the given id and is in the given page
func (db *DB) FindSongsByPlaylistQuery(query string, paging model.Paging) ([]*model.Song, int, error) {
	stmt := db.sanitizer(db.stmt["sqlSongAll"])
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
		total = db.countRows(db.sanitizer(db.stmt["sqlSongCount"]) + where)
	}
	return songs, total, err
}

// FindSongsByPlaylist get all songs for the static playlist with the given id and is in the given page
func (db *DB) FindSongsByPlaylist(playlistId string, paging model.Paging) ([]*model.Song, int, error) {
	orderAndLimit, limit := createOrderAndLimitForSong(paging)
	stmt := db.sanitizer(db.stmt["sqlSongAll"]) + " WHERE song.id IN (SELECT song_id FROM playlist_song WHERE playlist_id = ?)" + orderAndLimit
	rows, err := db.Query(stmt, playlistId)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(db.sanitizer(db.stmt["sqlSongCountByPlaylist"]), playlistId)
	}
	return songs, total, err
}

// FindSongsByYear get all songs published in the given year and is in the given page
func (db *DB) FindSongsByYear(year string, paging model.Paging) ([]*model.Song, int, error) {
	orderAndLimit, limit := createOrderAndLimitForSong(paging)
	stmt := db.sanitizer(db.stmt["sqlSongAll"]) + " WHERE song.yearpublished = ?" + orderAndLimit
	rows, err := db.Query(stmt, year)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(db.sanitizer(db.stmt["sqlSongCountByYear"]), year)
	}
	return songs, total, err
}

// FindSongsByGenre get all songs with the given genre and is in the given page
func (db *DB) FindSongsByGenre(genre string, paging model.Paging) ([]*model.Song, int, error) {
	orderAndLimit, limit := createOrderAndLimitForSong(paging)
	stmt := db.sanitizer(db.stmt["sqlSongAll"]) + " WHERE song.genre = ?" + orderAndLimit
	rows, err := db.Query(stmt, genre)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, 0, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
	total := len(songs)
	if limit {
		total = db.countRows(db.sanitizer(db.stmt["sqlSongCountByGenre"]), genre)
	}
	return songs, total, err
}

// FindRecentlyAddedSongs find num recently added songs
func (db *DB) FindRecentlyAddedSongs(num int) ([]*model.Song, error) {
	rows, err := db.Query(db.sanitizer(db.stmt["sqlSongAll"])+" ORDER BY song.added DESC LIMIT ?", num)
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
	rows, err := db.Query(db.sanitizer(db.stmt["sqlSongAll"])+" INNER JOIN user_song ON song.id = user_song.song_id ORDER BY lastplayed DESC LIMIT ?", num)
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
	rows, err := db.Query(db.sanitizer(db.stmt["sqlSongAll"])+`
	INNER JOIN user_song ON song.id = user_song.song_id
	GROUP BY user_song.song_id
	ORDER BY SUM(user_song.playcount) DESC LIMIT ?
		`, num)
	if err != nil {
		log.Error("Error reading song table", err)
		return nil, err
	}
	defer rows.Close()
	songs, err := fetchSongs(rows)
	for _, s := range songs {
		s.PlayCount = db.countRows(db.sanitizer(db.stmt["sqlSongPlaycount"]), s.Id)
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
		db.sanitizer(db.stmt["sqlUserSongById"]),
		user.Id,
		song.Id).Scan(&userSong.UserId, &userSong.SongId, &userSong.Rating, &userSong.PlayCount)
	if err != nil {
		userSong = model.UserSong{UserId: user.Id, SongId: song.Id, Rating: 0, PlayCount: 1}
		_, err := db.Exec(
			db.sanitizer(db.stmt["sqlUserSongInsert"]),
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
		_, err := db.Exec(db.sanitizer(db.stmt["sqlUserSongUpdate"]),
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
	rows, err := db.Query(db.sanitizer(db.stmt["sqlSongOnlyIdAndPath"]))
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
