package postgres

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

func (db *DB) initializeInfo() {
}

// Info returns the dashboard informations
func (db *DB) Info() (*model.Info, error) {
	info := model.Info{}

	var waiter sync.WaitGroup
	waiter.Add(10)
	go func() {
		defer waiter.Done()
		info.SongCount = db.countRows(sanitizePlaceholder("SELECT COUNT(*) FROM song"))
	}()
	go func() {
		defer waiter.Done()
		info.TotalLength = db.countRows(sanitizePlaceholder("SELECT SUM(duration) FROM song"))
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
	go func() {
		defer waiter.Done()
		songs, _ := db.FindRecentlyPlayedSongs(5)
		info.SongsRecentlyPlayed = songs
	}()
	go func() {
		defer waiter.Done()
		songs, _ := db.FindMostPlayedSongs(5)
		info.SongsMostPlayed = songs
	}()
	go func() {
		defer waiter.Done()
		albums, _ := db.FindRecentlyAddedAlbums(5)
		info.AlbumsRecentlyAdded = albums
	}()
	waiter.Wait()
	return &info, nil
}

func (db *DB) GetDecades() ([]*model.NameCount, error) {
	decades := make([]*model.NameCount, 0)
	rows, err := db.Query(getDecadesStatement)
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
	rows, err := db.Query(getGenresStatement)
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
