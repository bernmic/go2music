package id3

import (
	"errors"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func ReadID3v2(f *os.File) (*Tag, error) {
	tag := Tag{}
	headerBytes := make([]byte, 10)
	bytesRead, err := f.Read(headerBytes)
	if err != nil || bytesRead != 10 || string(headerBytes[0:3]) != "ID3" {
		fmt.Println("no id3v2 header")
	} else {
		v := headerBytes[3]
		switch v {
		case 2:
			tag.Version = "2.2"
		case 3:
			tag.Version = "2.3"
		case 4:
			tag.Version = "2.4"
		default:
			return nil, errors.New("unsupported id3 version")
		}
		fmt.Printf("Found id3v2.%v\n", v)
		size := parseSize(headerBytes[6:10])
		fmt.Printf("Size: %d\n", size)
		//unsyncronization := headerBytes[5] >> 7 & 1
		extendedHeader := headerBytes[5] >> 6 & 1
		//experimentalIndicator := headerBytes[5] >> 5 & 1
		//footerPresent := headerBytes[5] >> 4 & 1

		var tagbytesread uint32 = 10

		if extendedHeader != 0 {
			// read extended header and seek over it
			extendedHeaderBytes := make([]byte, 6)
			bytesRead, err = f.Read(extendedHeaderBytes)
			extendedHeaderSize := parseSize(extendedHeaderBytes[0:4])
			f.Seek(6+int64(extendedHeaderSize), 2)
			tagbytesread += (6 + extendedHeaderSize)
		}

		frameHeader := make([]byte, 10)

		for tagbytesread < size {
			bytesRead, err = f.Read(frameHeader)
			frameId := strings.TrimRight(string(frameHeader[0:4]), "\x00")
			if frameId == "" {
				break
			}
			frameSize := parseSize(frameHeader[4:8])
			switch frameId {
			case "TIT2":
				tag.Title, _ = getTextFrame(f, frameSize)
			case "TPE1":
				tag.Artist, _ = getTextFrame(f, frameSize)
			case "TALB":
				tag.Album, _ = getTextFrame(f, frameSize)
			case "TCON":
				tag.Genre, _ = getTextFrame(f, frameSize)
			case "TYER":
				tag.Year, _ = getTextFrame(f, frameSize)
			case "TRCK":
				trackString, _ := getTextFrame(f, frameSize)
				tag.Track, _ = strconv.Atoi(trackString)
			default:
				f.Seek(int64(frameSize), 1)
			}
			fmt.Printf("%s, %d\n", frameId, frameSize)
			tagbytesread += frameSize
			tagbytesread += 10
		}
	}
	return &tag, nil
}

func parseSize(data []byte) uint32 {
	size := uint32(0)
	for i, b := range data {
		if b&0x80 > 0 {
			fmt.Println("Size byte had non-zero first bit")
		}

		shift := uint32(len(data)-i-1) * 7
		size |= uint32(b&0x7f) << shift
	}
	return size
}

func getTextFrame(f *os.File, size uint32) (string, error) {
	buffer := make([]byte, size)
	f.Read(buffer)
	encoding := uint8(buffer[0])
	switch encoding {
	case 0: //ISO 8859-1
		return toUtf8(buffer[1:]), nil
	case 3: //ISO 8859-1
		return string(buffer[1:]), nil
	}
	return "", nil
}

func toUtf8(iso8859_1_buf []byte) string {
	buf := make([]rune, len(iso8859_1_buf))
	for i, b := range iso8859_1_buf {
		buf[i] = rune(b)
	}
	return string(buf)
}
