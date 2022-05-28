package database

import "go2music/model"

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
