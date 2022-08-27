package metadata

import (
	"fmt"
	"go2music/tagging"
	"io"
	"os"
	"strings"
)

type Metadata struct {
	Type          string
	ID3V2         *ID3V2
	ID3V1         *tagging.V1Tag
	MP3StreamInfo *tagging.Mp3StreamInfo
}

func MetadataFromFile(name string) (*Metadata, error) {
	f, err := os.Open(name)
	if err != nil {
		return nil, fmt.Errorf("error opening file %s for reading metadata: %v", name, err)
	}
	defer f.Close()
	m := Metadata{Type: "", ID3V1: nil, ID3V2: nil, MP3StreamInfo: nil}
	ln := strings.ToLower(name)
	switch {
	case strings.HasSuffix(ln, ".mp3"):
		m.Type = "MP3"
	case strings.HasSuffix(ln, ".flac"):
		m.Type = "FLAC"
	case strings.HasSuffix(ln, ".ogg"):
		m.Type = "OGG"
	default:
		m.Type = "UNKNOWN"
	}

	if m.Type == "MP3" {
		m.ID3V1, err = tagging.ReadID3V1(f)
		if err != nil {
			m.ID3V1 = nil
		}
		_, err = f.Seek(0, io.SeekStart)
		if err != nil {
			return nil, fmt.Errorf("error rewinding file to the beginning: %v", err)
		}
		m.ID3V2, err = ReadFrom(f)
		if err != nil {
			m.ID3V2 = nil
		}
		_, err = f.Seek(0, io.SeekStart)
		if err != nil {
			return nil, fmt.Errorf("error rewinding file to the beginning: %v", err)
		}
		m.MP3StreamInfo, err = tagging.ReadStreamInfo(f)
		if err != nil {
			return nil, fmt.Errorf("error reading mp3 stream info: %v", err)
		}
	}
	return &m, nil
}

func (m *Metadata) HasID3V1() bool {
	return m.ID3V1 != nil
}

func (m *Metadata) HasID3V2() bool {
	return m.ID3V2 != nil
}

func (m *Metadata) IsMP3() bool {
	return m.Type == "MP3"
}

func (m *Metadata) IsFlac() bool {
	return m.Type == "FLAC"
}
