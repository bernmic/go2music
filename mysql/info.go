package mysql

import (
	"go2music/model"
	"sync"
)

func (db *DB) InitializeInfo() {
}

func (db *DB) Info() (*model.Info, error) {
	info := model.Info{}

	var waiter sync.WaitGroup
	waiter.Add(6)
	go func() {
		defer waiter.Done()
		info.SongCount = db.countRows(sanitizePlaceholder("SELECT COUNT(*) FROM song"))
	}()
	go func() {
		defer waiter.Done()
		info.AlbumCount = db.countRows(sanitizePlaceholder("SELECT COUNT(*) FROM album"))
	}()
	go func() {
		defer waiter.Done()
		info.ArtistCount = db.countRows(sanitizePlaceholder("SELECT COUNT(*) FROM artist"))
	}()
	go func() {
		defer waiter.Done()
		info.PlaylistCount = db.countRows(sanitizePlaceholder("SELECT COUNT(*) FROM playlist"))
	}()
	go func() {
		defer waiter.Done()
		info.UserCount = db.countRows(sanitizePlaceholder("SELECT COUNT(*) FROM guser"))
	}()
	go func() {
		defer waiter.Done()
		songs, _ := db.FindRecentlyAddedSongs(5)
		info.SongsRecentlyAdded = songs
	}()
	waiter.Wait()
	return &info, nil
}
