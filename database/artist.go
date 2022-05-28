package database

import "go2music/model"

// ArtistManager defines all database functions for artists
type ArtistManager interface {
	CreateArtist(artist model.Artist) (*model.Artist, error)
	CreateIfNotExistsArtist(artist model.Artist) (*model.Artist, error)
	UpdateArtist(artist model.Artist) (*model.Artist, error)
	DeleteArtist(id string) error
	FindArtistById(id string) (*model.Artist, error)
	FindArtistByName(name string) (*model.Artist, error)
	FindAllArtists(filter string, paging model.Paging) ([]*model.Artist, int, error)
	FindArtistsWithoutName() ([]*model.Artist, error)
}

const (
	SqlArtistExists      = "SELECT 1 FROM artist LIMIT 1"
	SqlArtistCreate      = "CREATE TABLE IF NOT EXISTS artist (id varchar(32), name varchar(255) NOT NULL, mbid varchar(36), PRIMARY KEY (id));"
	SqlArtistIndexName   = "CREATE UNIQUE INDEX artist_name ON artist (name)"
	SqlArtistIndexMbid   = "CREATE INDEX artist_mbid ON artist (mbid)"
	SqlArtistInsert      = "INSERT INTO artist (id, name, mbid) VALUES(?, ?, ?)"
	SqlArtistUpdate      = "UPDATE artist SET name=?, mbid=? WHERE id=?"
	SqlArtistDelete      = "DELETE FROM artist WHERE id=?"
	SqlArtistById        = "SELECT id,name,mbid FROM artist WHERE id=?"
	SqlArtistByName      = "SELECT id,name,mbid FROM artist WHERE name=?"
	SqlArtistAll         = "SELECT id, name, mbid FROM artist"
	SqlArtistCount       = "SELECT COUNT(*) FROM artist"
	SqlArtistWithoutName = "SELECT artist.id, artist.name, artist.mbid FROM artist WHERE artist.name IS NULL OR artist.name=''"
)
