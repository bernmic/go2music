package metadata

import (
	"encoding/binary"
	"fmt"
	"io"
	"os"
	"strings"
	"unicode/utf16"
	"unicode/utf8"
)

const (
	id3v2HeaderLen          = 10
	frameHeaderLen          = 10
	v22frameHeaderLen       = 6
	v23ExtendedHeaderLength = 6
	v24ExtendedHeaderLength = 6
)

type ID3V2 struct {
	Header         ID3Header
	ExtendedHeader ExtendedHeader
	Frames         []Frame
}

type ID3Header struct {
	VersionMajor          int
	VersionMinor          int
	Unsynchronised        bool
	ExtendedHeader        bool
	ExperimentalIndicator bool
	FooterPresent         bool
	Size                  int
}

type ExtendedHeader struct {
	Size          int
	FlagBytes     int
	ExtendedFlags int
	Padding       int
}

type Frame struct {
	ID               string
	Size             int
	PreserveTag      bool
	PreserveFile     bool
	ReadOnly         bool
	Compressed       bool
	Encrypted        bool
	GroupInformation bool
	Unsynchronised   bool
	LengthIndicator  bool
	Data             []byte
}

type TextFrame struct {
	ID       string
	Value    string
	Encoding string
}

func ReadFromFile(filename string) (*ID3V2, error) {
	f, err := os.Open(filename)
	if err != nil {
		return nil, fmt.Errorf("error opening file %s for reading id3v2: %v", filename, err)
	}
	defer f.Close()
	return ReadFrom(f)
}

func ReadFrom(r io.ReadSeeker) (*ID3V2, error) {
	b := make([]byte, id3v2HeaderLen)
	l, err := r.Read(b)
	if err != nil {
		return nil, fmt.Errorf("error getting id3v2 header: %v", err)
	}
	if l != id3v2HeaderLen {
		return nil, fmt.Errorf("error getting id3v2 header: wrong length")
	}
	data := ID3V2{Header: ID3Header{}}
	if string(b[0:3]) != "ID3" {
		return &data, fmt.Errorf("no id3v2 header present")
	}

	data.Header.VersionMajor = int(b[3])
	data.Header.VersionMinor = int(b[4])
	if b[5]&0x80 == 0x80 {
		data.Header.Unsynchronised = true
	}
	if data.Header.VersionMajor > 2 && b[5]&0x40 == 0x40 {
		data.Header.ExtendedHeader = true
	}
	if data.Header.VersionMajor > 2 && b[5]&0x20 == 0x20 {
		data.Header.ExperimentalIndicator = true
	}
	if data.Header.VersionMajor == 4 && b[5]&0x10 == 0x10 {
		data.Header.FooterPresent = true
	}
	data.Header.Size = syncSave(b[6:10])

	extendedSize := int64(0)
	if data.Header.ExtendedHeader {
		switch data.Header.VersionMajor {
		case 4:
			data.ExtendedHeader, err = v24ExtendedHeader(r)
			extendedSize = int64(v24ExtendedHeaderLength + data.ExtendedHeader.Size)
		case 3:
			data.ExtendedHeader, err = v23ExtendedHeader(r)
			extendedSize = int64(v23ExtendedHeaderLength + data.ExtendedHeader.Size)
		}
		if err != nil {
			return &data, err
		}
	}
	// TODO test data with padding
	startOfFrames := int64(id3v2HeaderLen) + extendedSize
	_, err = r.Seek(startOfFrames, io.SeekStart)
	if err != nil {
		return &data, fmt.Errorf("error seeking to frames: %v", err)
	}
	// first approach: read frame by frame
	// second approach: read the complete data and walk through in memory
	b = make([]byte, data.Header.Size)
	l, err = r.Read(b)
	if err != nil {
		return &data, fmt.Errorf("error reading id3v2: %v", err)
	}
	if l != data.Header.Size {
		return &data, fmt.Errorf("error reading id3v2: wrong length")
	}
	data.Frames = make([]Frame, 0)
	pos := 0
	for pos+frameHeaderLen < data.Header.Size {
		fr, read, err := frame(b[pos:], data.Header.VersionMajor)
		if err != nil {
			break
			//return &data, fmt.Errorf("error getting frame: %v", err)
		}
		pos += read
		data.Frames = append(data.Frames, fr)
	}
	return &data, nil
}

func v24ExtendedHeader(r io.ReadSeeker) (ExtendedHeader, error) {
	b := make([]byte, v24ExtendedHeaderLength)
	l, err := r.Read(b)
	if err != nil {
		return ExtendedHeader{}, fmt.Errorf("error getting id3v2 extended header: %v", err)
	}
	if l != v24ExtendedHeaderLength {
		return ExtendedHeader{}, fmt.Errorf("error getting id3v2 extended header: wrong length")
	}
	return ExtendedHeader{
		Size:          syncSave(b[0:4]),
		FlagBytes:     int(b[4]),
		ExtendedFlags: int(b[5]),
	}, nil
}

func v23ExtendedHeader(r io.ReadSeeker) (ExtendedHeader, error) {
	b := make([]byte, v23ExtendedHeaderLength)
	l, err := r.Read(b)
	if err != nil {
		return ExtendedHeader{}, fmt.Errorf("error getting id3v2 extended header: %v", err)
	}
	if l != v23ExtendedHeaderLength {
		return ExtendedHeader{}, fmt.Errorf("error getting id3v2 extended header: wrong length")
	}
	return ExtendedHeader{
		Size:          syncSave(b[0:4]),
		FlagBytes:     int(b[4]),
		ExtendedFlags: int(b[5]),
		Padding:       0,
	}, nil
}

func frame(b []byte, v int) (Frame, int, error) {
	if b[0] < 32 || b[0] > 127 {
		return Frame{}, 0, fmt.Errorf("not a valid frame")
	}
	if v == 2 {
		return v22Frame(b)
	}
	f := Frame{}
	f.ID = string(b[0:4])
	if v == 4 {
		f.Size = syncSave(b[4:8])
	} else {
		f.Size = bigEndian(b[4:8])
	}
	f.PreserveTag = b[8]&0x80 == 0x80
	f.PreserveFile = b[8]&0x40 == 0x40
	f.ReadOnly = b[8]&0x20 == 0x20
	if v == 3 {
		f.Compressed = b[9]&0x80 == 0x80
		f.Encrypted = b[9]&0x40 == 0x40
		f.GroupInformation = b[9]&0x20 == 0x20
	} else if v == 4 {
		f.Compressed = b[9]&0x08 == 0x08
		f.Encrypted = b[9]&0x04 == 0x04
		f.GroupInformation = b[9]&0x40 == 0x40
		f.Unsynchronised = b[9]&0x02 == 0x02
		f.LengthIndicator = b[9]&0x01 == 0x01
	}
	f.Data = b[frameHeaderLen : frameHeaderLen+f.Size]
	return f, frameHeaderLen + f.Size, nil
}

func v22Frame(b []byte) (Frame, int, error) {
	f := Frame{}
	f.ID = string(b[0:3])
	f.Size = bigEndian3(b[3:6])
	f.Data = b[v22frameHeaderLen : v22frameHeaderLen+f.Size]
	// TODO map v22 tag id to v24 tag id
	return f, v22frameHeaderLen + f.Size, nil
}

func syncSave(b []byte) int {
	if len(b) != 4 {
		return 0
	}
	b0 := b[0] & 0x7F
	b1 := b[1] & 0x7F
	b2 := b[2] & 0x7F
	b3 := b[3] & 0x7F

	lb := (b2 & 0x01) << 7
	b3 = b3 | lb

	b2 = b2 >> 1

	lb = (b1 & 0x03) << 6
	b2 = b2 | lb

	b1 = b1 >> 2

	lb = (b0 & 0x07) << 5
	b1 = b1 | lb

	b0 = b0 >> 3

	return int(uint(b3) | uint(b2)<<8 | uint(b1)<<16 | uint(b0)<<24)
}

func bigEndian(b []byte) int {
	return int(b[0])<<24 + int(b[1])<<16 + int(b[2])<<8 + int(b[3])
}

func bigEndian3(b []byte) int {
	return int(b[0])<<16 + int(b[1])<<8 + int(b[2])
}

func GetTextFrame(f Frame) (TextFrame, error) {
	// TODO TXXX frame
	if !strings.HasPrefix(f.ID, "T") {
		return TextFrame{}, fmt.Errorf("%s is not a textframe", f.ID)
	}
	t := TextFrame{ID: f.ID}
	switch f.Data[0] {
	case 0x00:
		t.Encoding = "ISO-8859-1"
		t.Value = UTF8BytesToString(f.Data[1 : len(f.Data)-1])
	case 0x01:
		t.Encoding = "UTF-16"
		t.Value = UTF16BytesToString(f.Data[1:len(f.Data)-2], binary.LittleEndian)
	case 0x02:
		t.Encoding = "UTF-16BE"
		t.Value = UTF16BytesToString(f.Data[1:len(f.Data)-2], binary.LittleEndian)
	case 0x03:
		t.Encoding = "UTF-8"
		t.Value = string(f.Data[1 : len(f.Data)-1])
	}
	return t, nil
}

func (id3 *ID3V2) GetTextTag(tagname string) ([]string, error) {
	if !strings.HasPrefix(tagname, "T") {
		return nil, fmt.Errorf("%s is not a textframe", tagname)
	}
	s := make([]string, 0)
	for _, f := range id3.Frames {
		if f.ID == tagname {
			tf, err := GetTextFrame(f)
			if err != nil {
				return nil, err
			}
			s = append(s, tf.Value)
		}
	}
	return s, nil
}

func UTF16BytesToString(b []byte, o binary.ByteOrder) string {
	utf := make([]uint16, (len(b)+(2-1))/2)
	for i := 0; i+(2-1) < len(b); i += 2 {
		utf[i/2] = o.Uint16(b[i:])
	}
	if len(b)/2 < len(utf) {
		utf[len(utf)-1] = utf8.RuneError
	}
	return string(utf16.Decode(utf))
}

func UTF8BytesToString(b []byte) string {
	buf := make([]rune, len(b))
	for i, b := range b {
		buf[i] = rune(b)
	}
	return string(buf)
}
