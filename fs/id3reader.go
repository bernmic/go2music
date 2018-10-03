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

// SyncWithFilesystem syncs the database with the configured directory in filesystem.
// New songs where added to database, removed songs where deleted from database.
var running bool = false

func SyncWithFilesystem(albumManager database.AlbumManager, artistManager database.ArtistManager, songManager database.SongManager) {
	if running {
		log.Info("Scanning ist already running. stopping here.")
		return
	}
	running = true
	log.Info("Start scanning filesystem....")
	start := time.Now()
	path := replaceVariables(configuration.Configuration().Media.Path)
	result, err := Filescanner(path, ".mp3")
	if err == nil {
		log.Infof("Found %d files with extension %s in %f seconds", len(result), ".mp3", time.Since(start).Seconds())
		log.Info("Start sync found files with service...")
		start = time.Now()
		ID3Reader(result, albumManager, artistManager, songManager)
		log.Infof("Sync finished...in %f seconds", time.Since(start).Seconds())
	}
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
		return nil, err
	}
	defer f.Close()

	id3tag, err := tag.ReadFrom(f)
	if err != nil {
		log.Errorf("Error opening mp3 file %s: %v", filename, err)
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
		song.YearPublished = x.(string)
	} else {
		song.YearPublished = strconv.Itoa(id3tag.Year())
	}
	song.Rating = getRating(id3tag)
	return song, err
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
					log.Fatalf("Error creating song: %v", err)
				}
				counter++
				if counter%100 == 0 {
					log.Infof("Proceeded %d songs", counter)
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
		log.Fatal("ERROR Error opening mp3 file: ", err)
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
