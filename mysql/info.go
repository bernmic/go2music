package mysql

import (
	"go2music/model"
	"regexp"
	"sync"

	log "github.com/sirupsen/logrus"
)

const (
	getDecadesStatement = `
select 
	count(id) count,
	concat(left(yearpublished, 3), '0s') as decade
from 
	song
where
	length(yearpublished)>=4
group by
	concat(left(yearpublished, 3), '0s')
`
	getYearsStatement = `
select 
	count(id) count,
	LEFT(yearpublished, 4)
from 
	song
where LEFT(yearpublished, 3) = LEFT(?, 3)
group by
	LEFT(yearpublished, 4)`

	getGenresStatement = `
select 
	count(id) count,
	genre
from 
	song
group by
	genre
order by
	genre
`
)

var (
	infoCache  = model.Info{}
	dirtyCache = true
)

func (db *DB) initializeInfo() {
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
		infoCache.SongCount = db.countRows(sanitizePlaceholder("SELECT COUNT(*) FROM song"))
	}()
	go func() {
		defer waiter.Done()
		infoCache.TotalLength = db.countRows(sanitizePlaceholder("SELECT SUM(duration) FROM song"))
	}()
	go func() {
		defer waiter.Done()
		infoCache.AlbumCount = db.countRows(sanitizePlaceholder("SELECT COUNT(*) FROM album"))
	}()
	go func() {
		defer waiter.Done()
		infoCache.ArtistCount = db.countRows(sanitizePlaceholder("SELECT COUNT(*) FROM artist"))
	}()
	go func() {
		defer waiter.Done()
		infoCache.PlaylistCount = db.countRows(sanitizePlaceholder("SELECT COUNT(*) FROM playlist"))
	}()
	go func() {
		defer waiter.Done()
		infoCache.UserCount = db.countRows(sanitizePlaceholder("SELECT COUNT(*) FROM guser"))
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
	rows, err := db.Query(sanitizePlaceholder(getDecadesStatement))
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
	rows, err := db.Query(sanitizePlaceholder(getYearsStatement), decade)
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
	rows, err := db.Query(sanitizePlaceholder(getGenresStatement))
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
