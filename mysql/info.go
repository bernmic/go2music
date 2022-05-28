package mysql

import (
	"go2music/database"
	"go2music/model"
	"regexp"
	"sync"

	log "github.com/sirupsen/logrus"
)

var (
	infoCache  = model.Info{}
	dirtyCache = true
)

func (db *DB) initializeInfo() {
	db.stmt["sqlInfoDecades"] = database.SqlInfoDecades
	db.stmt["sqlInfoYears"] = database.SqlInfoYears
	db.stmt["sqlInfoGenres"] = database.SqlInfoGenres
}

// Info returns the dashboard informations
func (db *DB) Info(cached bool) (*model.Info, error) {
	if cached && !dirtyCache {
		return &infoCache, nil
	}
	var waiter sync.WaitGroup
	waiter.Add(10)
	go func() {
		defer waiter.Done()
		infoCache.SongCount = db.countRows(db.stmt["sqlSongCount"])
	}()
	go func() {
		defer waiter.Done()
		infoCache.TotalLength = db.countRows(db.stmt["sqlSongDuration"])
	}()
	go func() {
		defer waiter.Done()
		infoCache.AlbumCount = db.countRows(db.stmt["sqlAlbumCount"])
	}()
	go func() {
		defer waiter.Done()
		infoCache.ArtistCount = db.countRows(db.stmt["sqlArtistCount"])
	}()
	go func() {
		defer waiter.Done()
		infoCache.PlaylistCount = db.countRows(db.stmt["sqlPlaylistCount"])
	}()
	go func() {
		defer waiter.Done()
		infoCache.UserCount = db.countRows(db.stmt["sqlUserCount"])
	}()
	go func() {
		defer waiter.Done()
		songs, _ := db.FindRecentlyAddedSongs(5)
		infoCache.SongsRecentlyAdded = songs
	}()
	go func() {
		defer waiter.Done()
		songs, _ := db.FindRecentlyPlayedSongs(5)
		infoCache.SongsRecentlyPlayed = songs
	}()
	go func() {
		defer waiter.Done()
		songs, _ := db.FindMostPlayedSongs(5)
		infoCache.SongsMostPlayed = songs
	}()
	go func() {
		defer waiter.Done()
		albums, _ := db.FindRecentlyAddedAlbums(5)
		infoCache.AlbumsRecentlyAdded = albums
	}()
	waiter.Wait()
	dirtyCache = false
	return &infoCache, nil
}

func (db *DB) GetDecades() ([]*model.NameCount, error) {
	decades := make([]*model.NameCount, 0)
	rows, err := db.Query(db.sanitizer(db.stmt["sqlInfoDecades"]))
	if err != nil {
		log.Errorf("Error get all decades: %v", err)
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		entry := new(model.NameCount)
		err := rows.Scan(&entry.Count, &entry.Name)
		if err != nil {
			log.Error(err)
		}
		matched, err := regexp.MatchString("[12][0-9]{3}s", entry.Name)
		if err == nil && matched {
			decades = append(decades, entry)
		}
	}

	return decades, nil
}

func (db *DB) GetYears(decade string) ([]*model.NameCount, error) {
	years := make([]*model.NameCount, 0)
	rows, err := db.Query(db.sanitizer(db.stmt["sqlInfoYears"]), decade)
	if err != nil {
		log.Errorf("Error get all years: %v", err)
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		entry := new(model.NameCount)
		err := rows.Scan(&entry.Count, &entry.Name)
		if err != nil {
			log.Error(err)
		}
		years = append(years, entry)
	}

	return years, nil
}

func (db *DB) GetGenres() ([]*model.NameCount, error) {
	genres := make([]*model.NameCount, 0)
	rows, err := db.Query(db.sanitizer(db.stmt["sqlInfoGenres"]))
	if err != nil {
		log.Errorf("Error get all genres: %v", err)
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		entry := new(model.NameCount)
		err := rows.Scan(&entry.Count, &entry.Name)
		if err != nil {
			log.Error(err)
		}
		genres = append(genres, entry)
	}

	return genres, nil
}
