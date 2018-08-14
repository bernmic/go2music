package id3

import "os"

type Tag struct {
	Title   string
	Artist  string
	Album   string
	Year    string
	Comment string
	Genre   string
	Track   int
}

func ReadID3(path string) (*Tag, error) {
	f, err := os.Open(path)
	defer f.Close()
	if err == nil {
		ReadID3v2(f)
		return ReadID3v1(f)
	}
	return nil, err
}
