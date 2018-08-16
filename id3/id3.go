package id3

import (
	"os"
)

type Tag struct {
	Version string
	Title   string
	Artist  string
	Album   string
	Year    string
	Comment string
	Genre   string
	Track   int
	Picture *Picture
}

func ReadID3(path string) (*Tag, error) {
	f, err := os.Open(path)
	defer f.Close()
	if err == nil {
		tag, err := ReadID3v2(f)
		if err == nil {
			return tag, nil
		}
		return ReadID3v1(f)
	}
	return nil, err
}
