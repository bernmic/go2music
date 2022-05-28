package fs

import (
	"errors"
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
		log.Errorf("error loading file: %v", err)
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
func ID3Reader(filenames []string, databaseAccess *database.DatabaseAccess) {
	counter := 0
	for _, filename := range filenames {
		if !databaseAccess.SongManager.SongExists(filename) {
			song, err := readData(filename)
			if err == nil {
				song, err = readMetaData(filename, song)
			}
			if err == nil {
				song.Artist, err = databaseAccess.ArtistManager.CreateIfNotExistsArtist(*song.Artist)
				song.Album, err = databaseAccess.AlbumManager.CreateIfNotExistsAlbum(*song.Album)
				song, err = databaseAccess.SongManager.CreateSong(*song)
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

// GetCoverFromID3 reads the cover image from the ID3 tags.
func GetCoverFromID3(filename string) ([]byte, string, error) {
	f, err := os.Open(filename)
	if err != nil {
		log.Errorf("error opening file: %v", err)
		return nil, "", err
	}
	defer f.Close()

	id3tag, err := tag.ReadFrom(f)
	if err != nil {
		log.Errorf("ERROR Error reading mp3 file: %v", err)
		return nil, "", err
	}
	if p := id3tag.Picture(); p != nil {
		return p.Data, p.MIMEType, nil
	}
	log.Warn("No cover found in ID3: " + filename)
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
