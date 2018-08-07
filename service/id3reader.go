package service

import (
	"log"
	"path/filepath"
	"strconv"

	"errors"
	"github.com/bogem/id3v2"
	"github.com/xhenner/mp3-go"
	"go2music/model"
)

func readData(filename string) (*model.Song, error) {
	tag, err := id3v2.Open(filename, id3v2.Options{Parse: true})
	if err != nil {
		log.Fatal("Error opening mp3 file: ", err)
	}
	defer tag.Close()
	song := new(model.Song)
	song.Path = filename
	song.Title = tag.Title()
	song.Artist = new(model.Artist)
	song.Artist.Name = tag.Artist()
	song.Album = new(model.Album)
	song.Album.Title = tag.Album()
	song.Album.Path = filepath.Dir(filename)
	song.Genre.String = tag.Genre()
	track, err := strconv.ParseInt(tag.GetTextFrame("TRCK").Text, 10, 64)
	if err == nil {
		song.Track.Int64 = track
	}
	song.Year.String = tag.Year()
	return song, err
}

func readMetaData(filename string, song *model.Song) (*model.Song, error) {
	mp3File, err := mp3.Examine(filename, false)
	if err == nil {
		song.Bitrate = mp3File.Bitrate
		song.Samplerate = mp3File.Sampling
		song.Duration = int(mp3File.Length)
		song.Mode = mp3File.Mode
		song.CbrVbr = mp3File.Type
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
					log.Fatalf("Error creating song: %v", err)
				}
				counter++
				if counter%100 == 0 {
					log.Printf("Proceeded %d songs", counter)
				}
			}
		}
	}
}

func GetCoverFromID3(filename string) ([]byte, string, error) {
	tag, err := id3v2.Open(filename, id3v2.Options{Parse: true})
	if err != nil {
		log.Println("Error opening mp3 file: " + err.Error())
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
