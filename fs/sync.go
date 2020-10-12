package fs

import (
	"errors"
	"go2music/configuration"
	"go2music/database"
	"go2music/model"
	"os"
	"path/filepath"
	"time"

	log "github.com/sirupsen/logrus"
)

const (
	SYNC_STATE_IDLE    = "idle"
	SYNC_STATE_RUNNING = "running"
)

var running bool = false

var syncState = model.SyncState{
	State:              SYNC_STATE_IDLE,
	ProblemSongs:       make(map[string]string, 0),
	DanglingSongs:      make(map[string]string, 0),
	EmptyAlbums:        make(map[string]string, 0),
	AlbumsWithoutTitle: make(map[string]string, 0),
	ArtistsWithoutName: make(map[string]string, 0),
}

func GetSyncState() *model.SyncState {
	return &syncState
}

// SyncWithFilesystem syncs the database with the configured directory in filesystem.
// New songs where added to database, removed songs where deleted from database.
func SyncWithFilesystem(databaseAccess *database.DatabaseAccess) {
	if running {
		log.Info("Scanning ist already running. stopping here.")
		return
	}
	running = true
	syncState = model.SyncState{
		State:           SYNC_STATE_RUNNING,
		LastSyncStarted: time.Now().Unix(),
		ProblemSongs:    make(map[string]string, 0),
		DanglingSongs:   make(map[string]string, 0),
		EmptyAlbums:     make(map[string]string, 0),
	}
	start := time.Now()
	path := replaceVariables(configuration.Configuration(false).Media.Path)
	log.Info("Start scanning filesystem at " + path)
	result, err := Filescanner(path, ".mp3")
	if err == nil {
		syncState.SongsFound = len(result)
		log.Infof("Found %d files with extension %s in %f seconds", len(result), ".mp3", time.Since(start).Seconds())
		log.Info("Start sync found files with service...")
		start = time.Now()
		ID3Reader(result, databaseAccess.AlbumManager, databaseAccess.ArtistManager, databaseAccess.SongManager)
		log.Infof("Sync finished...in %f seconds", time.Since(start).Seconds())
	}
	findDanglingSongs(databaseAccess.SongManager)
	findEmptyAlbums(databaseAccess.AlbumManager)
	findAlbumsWithoutTitle(databaseAccess.AlbumManager)
	findArtistsWithoutName(databaseAccess.ArtistManager)
	syncState.State = SYNC_STATE_IDLE
	syncState.LastSyncDuration = time.Now().Unix() - syncState.LastSyncStarted
	running = false
}

func findEmptyAlbums(albumManager database.AlbumManager) {
	albums, err := albumManager.FindAlbumsWithoutSongs()
	if err == nil {
		syncState.EmptyAlbums = make(map[string]string, 0)
		for _, album := range albums {
			syncState.EmptyAlbums[album.Id] = album.Path
		}
	}
}

func findAlbumsWithoutTitle(albumManager database.AlbumManager) {
	albums, err := albumManager.FindAlbumsWithoutTitle()
	if err == nil {
		syncState.AlbumsWithoutTitle = make(map[string]string, 0)
		for _, album := range albums {
			syncState.AlbumsWithoutTitle[album.Id] = album.Path
		}
	}
}

func findArtistsWithoutName(artistManager database.ArtistManager) {
	artists, err := artistManager.FindArtistsWithoutName()
	if err == nil {
		syncState.ArtistsWithoutName = make(map[string]string, 0)
		for _, artist := range artists {
			syncState.ArtistsWithoutName[artist.Id] = artist.Name
		}
	}
}

func problemSong(s string, err error) {
	syncState.ProblemSongs[s] = err.Error()
	syncState.NewSongsProblems = syncState.NewSongsProblems + 1
}

func findDanglingSongs(songManager database.SongManager) {
	log.Info("Start searching dangling songs.")
	start := time.Now()
	m, err := songManager.GetAllSongIdsAndPaths()
	if err != nil {
		log.Errorf("Could not get song ids and paths: %v", err)
		return
	}
	for id, path := range m {
		if _, err := os.Stat(path); os.IsNotExist(err) {
			syncState.DanglingSongs[id] = path
			syncState.DanglingSongsFound = syncState.DanglingSongsFound + 1
		}
	}
	log.Infof("Finished searching dangling songs...in %f seconds", time.Since(start).Seconds())
}

// RemoveDanglingSongs remove all songs found by the last dangling songs search
func RemoveDanglingSongs(songManager database.SongManager) (int, error) {
	if running {
		log.Info("Scanning ist running. stopping here.")
		return 0, errors.New("Can't remove dangling songs while scanning is running!")
	}
	var counter int
	for id, path := range syncState.DanglingSongs {
		err := songManager.DeleteSong(id)
		if err != nil {
			log.Warnf("Song %s, %s not deleted: %v", id, path, err)
		} else {
			counter++
		}
	}
	syncState.DanglingSongs = make(map[string]string, 0)
	syncState.DanglingSongsFound = 0
	return counter, nil
}

// RemoveDanglingSong remove the given dangling song
func RemoveDanglingSong(id string, songManager database.SongManager) error {
	if syncState.DanglingSongs[id] == "" {
		return errors.New("Song not in dangling list")
	}
	err := songManager.DeleteSong(id)
	if err == nil {
		delete(syncState.DanglingSongs, id)
		syncState.DanglingSongsFound = len(syncState.DanglingSongs)
	}
	return err
}

// SetAlbumTitleToFoldername Set the album title to the last part of the filesystem path
func SetAlbumTitleToFoldername(id string, albumManager database.AlbumManager) error {
	if syncState.AlbumsWithoutTitle[id] == "" {
		return errors.New("Album not in list of albums without title")
	}
	album, err := albumManager.FindAlbumById(id)
	if err != nil {
		return err
	}
	t := filepath.Base(album.Path)
	album.Title = t
	album, err = albumManager.UpdateAlbum(*album)
	if err == nil {
		delete(syncState.AlbumsWithoutTitle, id)
	}
	return err
}
