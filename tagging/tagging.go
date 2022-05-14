package tagging

import (
	"fmt"
	"go2music/configuration"
	"os"
	"path/filepath"
	"strings"
)

type TaggingSong struct {
	File        string            `json:"file,omitempty"`
	Title       string            `json:"title,omitempty"`
	Artist      string            `json:"artist,omitempty"`
	Album       string            `json:"album,omitempty"`
	AlbumArtist string            `json:"albumArtist,omitempty"`
	Year        string            `json:"year,omitempty"`
	Genre       string            `json:"genre,omitempty"`
	Track       string            `json:"track,omitempty"`
	Composer    string            `json:"composer,omitempty"`
	Publisher   string            `json:"publisher,omitempty"`
	Copyright   string            `json:"copyright,omitempty"`
	Comments    []string          `json:"comments,omitempty"`
	Language    string            `json:"language,omitempty"`
	Length      string            `json:"length,omitempty"`
	Links       map[string]string `json:"links,omitempty"`
	Cover       Cover             `json:"-"`
	Version     byte              `json:"id3version,omitempty"`
	Type        string            `json:"type,omitempty"`
}

type TaggingSongList struct {
	Songs []*TaggingSong    `json:"songs"`
	Links map[string]string `json:"links,omitempty"`
}

type Cover struct {
	Mimetype string
	Data     []byte
}

type Media struct {
	MediaPath string
}

func NewMedia(mediaPath string) *Media {
	return &Media{MediaPath: mediaPath}
}

func ParseDir(p string) ([]string, []string, error) {
	mediaPath := configuration.Configuration(false).Tagging.Path
	files := make([]string, 0)
	dirs := make([]string, 0)
	t := p
	if t != "" {
		t = fmt.Sprintf("%s%s%s", mediaPath, string(os.PathSeparator), t)
	} else {
		t = mediaPath
	}
	err := filepath.Walk(t, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		ext := filepath.Ext(path)
		if !info.IsDir() &&
			(strings.ToLower(ext) == ".mp3" || strings.ToLower(ext) == ".flac") {
			files = append(files, path)
		} else if info.IsDir() && path != t+string(os.PathSeparator) && path != t {
			dirs = append(dirs, path[len(mediaPath)+1:])
		}
		return nil
	})
	return files, dirs, err
}
