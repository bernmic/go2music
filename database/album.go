package database

import "go2music/model"

// AlbumManager defines all database functions for albums
type AlbumManager interface {
	CreateAlbum(album model.Album) (*model.Album, error)
	CreateIfNotExistsAlbum(album model.Album) (*model.Album, error)
	UpdateAlbum(album model.Album) (*model.Album, error)
	DeleteAlbum(id string) error
	FindAlbumById(id string) (*model.Album, error)
	FindAlbumByPath(path string) (*model.Album, error)
	FindAllAlbums(filter string, paging model.Paging, titleMode string) ([]*model.Album, int, error)
	FindAlbumsForArtist(artistId string) ([]*model.Album, error)
	FindAlbumsWithoutSongs() ([]*model.Album, error)
	FindAlbumsWithoutTitle() ([]*model.Album, error)
}

const (
	SqlAlbumExists       = "SELECT 1 FROM album LIMIT 1"
	SqlAlbumCreate       = "CREATE TABLE IF NOT EXISTS album (id varchar(32), title varchar(255) NOT NULL, path varchar(255) NOT NULL, mbid varchar(36), PRIMARY KEY (id));"
	SqlAlbumIndexPath    = "CREATE UNIQUE INDEX album_path ON album (path)"
	SqlAlbumIndexMbid    = "CREATE INDEX album_mbid ON album (mbid)"
	SqlAlbumInsert       = "INSERT INTO album (id, title, path, mbid) VALUES(?, ?, ?, ?)"
	SqlAlbumUpdate       = "UPDATE album SET title=?, path=?, mbid=? WHERE id=?"
	SqlAlbumDelete       = "DELETE FROM album WHERE id=?"
	SqlAlbumById         = "SELECT id,title,path, mbid FROM album WHERE id=?"
	SqlAlbumByPath       = "SELECT id,title,path,mbid FROM album WHERE path=?"
	SqlAlbumAll          = "SELECT id, title, path, mbid FROM album"
	SqlAlbumCount        = "SELECT COUNT(*) FROM album"
	SqlAlbumWithoutSong  = "SELECT album.id, album.title, album.path, album.mbid FROM album LEFT OUTER JOIN song ON album.id=song.album_id WHERE song.id IS NULL"
	SqlAlbumWithoutTitle = "SELECT album.id, album.title, album.path, album.mbid FROM album WHERE album.title IS NULL OR album.title=''"
	SqlAlbumForArtist    = `
SELECT DISTINCT
	album.id album_id,
	album.title album_title,
	album.path album_path,
	album.mbid album_mbid
FROM
	song
LEFT JOIN artist ON song.artist_id = artist.id
LEFT JOIN album ON song.album_id = album.id
WHERE
	artist.id=?
`
	SqlAlbumRecent = `
	SELECT DISTINCT
		album.id,
		album.title,
		album.path,
		album.mbid
	FROM
		song
	INNER JOIN album ON song.album_id = album.id
	ORDER BY song.added DESC LIMIT ?
	`
)
