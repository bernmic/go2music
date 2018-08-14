package service

import (
	"bytes"
	"errors"
	"github.com/bogem/id3v2"
	"github.com/xhenner/mp3-go"
	"go2music/model"
	"log"
	"os"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
	"time"
)

func readData(filename string) (*model.Song, error) {
	tag, err := id3v2.Open(filename, id3v2.Options{Parse: true})
	if err != nil {
		log.Fatal("ERROR Error opening mp3 file: ", err)
	}
	defer tag.Close()
	song := new(model.Song)
	song.Path = filename
	song.Title = strings.Trim(tag.Title(), "\x00")
	song.Artist = new(model.Artist)
	song.Artist.Name = strings.Trim(tag.Artist(), "\x00")
	song.Album = new(model.Album)
	song.Album.Title = strings.Trim(tag.Album(), "\x00")
	song.Album.Path = filepath.Dir(filename)
	song.Genre.String = getGenre(strings.Trim(tag.Genre(), "\x00"))
	song.Track.Int64 = getTrack(tag.GetTextFrame("TRCK").Text)
	song.YearPublished.String = strings.Trim(tag.Year(), "\x00")
	song.Rating = getRating(tag)
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

func ID3Reader(filenames []string) {
	counter := 0
	for _, filename := range filenames {
		if !SongExists(filename) {
			song, err := readData(filename)
			song, err = readMetaData(filename, song)
			if err == nil {
				song.Artist, err = CreateIfNotExistsArtist(*song.Artist)
				song.Album, err = CreateIfNotExistsAlbum(*song.Album)
				song, err = CreateSong(*song)
				if err != nil {
					log.Fatalf("FATAL Error creating song: %v", err)
				}
				counter++
				if counter%100 == 0 {
					log.Printf("INFO Proceeded %d songs", counter)
				}
			}
		}
	}
}

func GetCoverFromID3(filename string) ([]byte, string, error) {
	tag, err := id3v2.Open(filename, id3v2.Options{Parse: true})
	if err != nil {
		log.Println("ERROR Error opening mp3 file", err)
		return nil, "", errors.New("song file not found")
	}
	defer tag.Close()
	pictures := tag.GetFrames(tag.CommonID("Attached picture"))
	if len(pictures) > 0 {
		pic, ok := pictures[0].(id3v2.PictureFrame)
		if ok {
			return pic.Picture, pic.MimeType, nil
		}
	}

	return nil, "", errors.New("no cover found")
}

func getRating(tag *id3v2.Tag) int {
	ratings := tag.GetFrames("POPM")
	if len(ratings) > 0 {
		rating, ok := ratings[0].(id3v2.UnknownFrame)
		if ok {
			nulpos := bytes.IndexByte(rating.Body, 0)
			//ratingEmail := string(rating.Body[:nulpos])
			return int(uint(rating.Body[nulpos+1]))
		}
	}
	return 0
}

func getUnknownTagAsString(tag *id3v2.Tag, id string) string {
	items := tag.GetFrames(id)
	if len(items) > 0 {
		item, ok := items[0].(id3v2.UnknownFrame)
		if ok {
			log.Printf("%v", item)
			return ""
		}
	}
	return ""
}

func getTrack(strack string) int64 {
	strack = strings.Split(strack, "/")[0]
	track, err := strconv.ParseInt(strack, 10, 64)
	if err != nil {
		return 0
	}
	return track
}

func getGenre(genre string) string {
	r := regexp.MustCompile(`\([0-9]+\).*`)
	if r.MatchString(genre) {
		return strings.Split(genre, ")")[1]
	}
	return genre
}
