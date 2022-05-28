package database

import "go2music/model"

// PlaylistManager defines all database functions for playlists
type PlaylistManager interface {
	CreatePlaylist(playlist model.Playlist) (*model.Playlist, error)
	CreateIfNotExistsPlaylist(playlist model.Playlist) (*model.Playlist, error)
	UpdatePlaylist(playlist model.Playlist) (*model.Playlist, error)
	DeletePlaylist(id string, user_id string) error
	FindPlaylistById(id string, user_id string) (*model.Playlist, error)
	FindPlaylistByName(name string, user_id string) (*model.Playlist, error)
	FindAllPlaylistsOfKind(user_id string, kind string, paging model.Paging) ([]*model.Playlist, int, error)
	AddSongsToPlaylist(playlistId string, songIds []string) int
	RemoveSongsFromPlaylist(playlistId string, songIds []string) int
	SetSongsOfPlaylist(playlistId string, songIds []string) (int, int)
}

const (
	SqlPlaylistExists = "SELECT 1 FROM playlist LIMIT 1"
	SqlPlaylistCreate = `
	CREATE TABLE IF NOT EXISTS playlist (
		id varchar(32),
		name VARCHAR(255) NOT NULL,
		query VARCHAR(255) NOT NULL,
		user_id varchar(32) NOT NULL,
		PRIMARY KEY (id),
		FOREIGN KEY (user_id) REFERENCES guser(id)
		);
	`
	SqlPlaylistIndexName  = "CREATE UNIQUE INDEX playlist_name ON playlist (name)"
	SqlPlaylistSongExists = "SELECT 1 FROM playlist_song LIMIT 1"
	SqlPlaylistSongCreate = `
	CREATE TABLE IF NOT EXISTS playlist_song (
		playlist_id varchar(32) NOT NULL,
		song_id varchar(32) NOT NULL,
		PRIMARY KEY (playlist_id,song_id),
		FOREIGN KEY (playlist_id) REFERENCES playlist(id),
		FOREIGN KEY (song_id) REFERENCES song(id)
		);
	`
	SqlPlaylistInsert        = "INSERT INTO playlist (id,name,query,user_id) VALUES(?,?,?,?)"
	SqlPlaylistUpdate        = "UPDATE playlist SET name=?,query=? WHERE id=?"
	SqlPlaylistDelete        = "DELETE FROM playlist WHERE id=? AND user_id=?"
	SqlPlaylistSongDeleteAll = "DELETE FROM playlist_song WHERE playlist_id=?"
	SqlPlaylistById          = "SELECT id,name,query FROM playlist WHERE id=? AND user_id=?"
	SqlPlaylistByName        = "SELECT id,name,query FROM playlist WHERE name=? AND user_id=?"
	SqlPlaylistByUserId      = "SELECT id, name, query FROM playlist WHERE user_id=?"
	SqlPlaylistCountByUserId = "SELECT COUNT(*) FROM playlist WHERE user_id=?"
	SqlPlaylistAll           = "SELECT id,name,query FROM playlist"
	SqlPlaylistCount         = "SELECT COUNT(*) FROM playlist"
	SqlPlaylistSongInsert    = "INSERT IGNORE INTO playlist_song (playlist_id,song_id) VALUES(?,?)"
	SqlPlaylistSongDelete    = "DELETE FROM playlist_song WHERE playlist_id=? AND song_id=?"
)
