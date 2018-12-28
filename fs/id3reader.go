package fs

import (
	"errors"
	"fmt"
	"go2music/configuration"
	"go2music/database"
	"go2music/model"
	"os"
	"os/user"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/dhowden/tag"
	log "github.com/sirupsen/logrus"
	"github.com/xhenner/mp3-go"
)

const (
	SYNC_STATE_IDLE    = "idle"
	SYNC_STATE_RUNNING = "running"
)

type SyncState struct {
	State              string            `json:"state"`
	LastSyncStarted    int64             `json:"last_sync_started"`
	LastSyncDuration   int64             `json:"last_sync_duration"`
	SongsFound         int               `json:"songs_found"`
	NewSongsAdded      int               `json:"new_songs_added"`
	NewSongsProblems   int               `json:"new_songs_problems"`
	DanglingSongsFound int               `json:"dangling_songs_found"`
	ProblemSongs       map[string]string `json:"problem_songs"`
	DanglingSongs      map[string]string `json:"dangling_songs"`
}

var running bool = false

var syncState = SyncState{
	State:         SYNC_STATE_IDLE,
	ProblemSongs:  make(map[string]string, 0),
	DanglingSongs: make(map[string]string, 0),
}

func GetSyncState() *SyncState {
	return &syncState
}

// SyncWithFilesystem syncs the database with the configured directory in filesystem.
// New songs where added to database, removed songs where deleted from database.
func SyncWithFilesystem(albumManager database.AlbumManager, artistManager database.ArtistManager, songManager database.SongManager) {
	if running {
		log.Info("Scanning ist already running. stopping here.")
		return
	}
	running = true
	syncState = SyncState{
		State:           SYNC_STATE_RUNNING,
		LastSyncStarted: time.Now().Unix(),
		ProblemSongs:    make(map[string]string, 0),
		DanglingSongs:   make(map[string]string, 0),
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
		ID3Reader(result, albumManager, artistManager, songManager)
		log.Infof("Sync finished...in %f seconds", time.Since(start).Seconds())
	}
	findDanglingSongs(songManager)
	syncState.State = SYNC_STATE_IDLE
	syncState.LastSyncDuration = time.Now().Unix() - syncState.LastSyncStarted
	running = false
}

func replaceVariables(in string) string {
	homeDir := ""
	usr, err := user.Current()
	if err == nil {
		homeDir = usr.HomeDir
	}

	return strings.Replace(in, "${home}", homeDir, -1)
}

func readData(filename string) (*model.Song, error) {
	f, err := os.Open(filename)
	if err != nil {
		fmt.Printf("error loading file: %v", err)
		problemSong(filename, err)
		return nil, err
	}
	defer f.Close()

	id3tag, err := tag.ReadFrom(f)
	if err != nil {
		log.Errorf("Error opening mp3 file %s: %v", filename, err)
		problemSong(filename, err)
		return nil, err
	}
	song := new(model.Song)
	song.Path = filename
	song.Title = id3tag.Title()
	song.Artist = new(model.Artist)
	song.Artist.Name = id3tag.Artist()
	song.Album = new(model.Album)
	song.Album.Title = id3tag.Album()
	song.Album.Path = filepath.Dir(filename)
	song.Genre = id3tag.Genre()
	if len(song.Genre)%2 != 0 {
		// id3 lib make of "(17)Hard Rock" "Hard Rock Hard Rock"
		h1 := song.Genre[0 : len(song.Genre)/2]
		h2 := song.Genre[len(song.Genre)/2+1:]
		if h1 == h2 {
			song.Genre = h1
		}
	}
	song.Track, _ = id3tag.Track()
	if id3tag.Year() == 0 {
		x := id3tag.Raw()["TYER"]
		if x != nil {
			song.YearPublished = x.(string)
		}
	} else {
		song.YearPublished = strconv.Itoa(id3tag.Year())
	}
	song.Rating = getRating(id3tag)
	return song, err
}

func problemSong(s string, err error) {
	syncState.ProblemSongs[s] = err.Error()
	syncState.NewSongsProblems = syncState.NewSongsProblems + 1
}

func readMetaData(filename string, song *model.Song) (*model.Song, error) {
	mp3File, err := mp3.Examine(filename, false)
	if err == nil {
		song.Bitrate = mp3File.Bitrate
		song.Samplerate = mp3File.Sampling
		song.Duration = int(mp3File.Length)
		song.Mode = mp3File.Mode
		if mp3File.Type == "VBR" {
			song.Vbr = true
		} else {
			song.Vbr = false
		}
		song.Added = time.Now().Unix()
		info, _ := os.Stat(filename)
		song.Filedate = info.ModTime().Unix()
		return song, nil
	}
	problemSong(filename, err)
	return nil, err
}

// ID3Reader adds all songfiles to the database if they don't exists there.
func ID3Reader(filenames []string, albumManager database.AlbumManager, artistManager database.ArtistManager, songManager database.SongManager) {
	counter := 0
	for _, filename := range filenames {
		if !songManager.SongExists(filename) {
			song, err := readData(filename)
			if err == nil {
				song, err = readMetaData(filename, song)
			}
			if err == nil {
				song.Artist, err = artistManager.CreateIfNotExistsArtist(*song.Artist)
				song.Album, err = albumManager.CreateIfNotExistsAlbum(*song.Album)
				song, err = songManager.CreateSong(*song)
				if err != nil {
					log.Errorf("Error creating song: %v, %v", err, song)
					problemSong(filename, err)
				} else {
					counter++
					syncState.NewSongsAdded = counter
					if counter%100 == 0 {
						log.Infof("Proceeded %d songs", counter)
					}
				}
			}
		}
	}
}

// GetCoverFromID3 reads the covcer image from the ID3 tags.
func GetCoverFromID3(filename string) ([]byte, string, error) {
	f, err := os.Open(filename)
	if err != nil {
		log.Errorf("error loading file: %v", err)
		return nil, "", err
	}
	defer f.Close()

	id3tag, err := tag.ReadFrom(f)
	if err != nil {
		log.Errorf("ERROR Error opening mp3 file: %v", err)
	}
	if p := id3tag.Picture(); p != nil {
		return p.Data, p.MIMEType, nil
	}
	return nil, "", errors.New("no cover found")
}

func getRating(id3tag tag.Metadata) int {
	ratingsBunch := id3tag.Raw()["POPM"]
	if ratingsBunch != nil {
		us := ratingsBunch.([]uint8)
		for i, u := range us {
			if u == 0 {
				return int(us[i+1])
			}
		}
	}
	return 0
}

func findDanglingSongs(songManager database.SongManager) {
	log.Info("Start searching dangling songs.")
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
}

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
	return counter, nil
}
