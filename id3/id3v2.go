package id3

import (
	"encoding/binary"
	"fmt"
	"os"
	"strings"
)

func ReadID3v2(f *os.File) (*Tag, error) {
	headerBytes := make([]byte, 10)
	bytesRead, err := f.Read(headerBytes)
	if err != nil || bytesRead != 10 || string(headerBytes[0:3]) != "ID3" {
		fmt.Println("no id3v2 header")
	} else {
		v := headerBytes[3]
		fmt.Printf("Found id3v2.%v\n", v)
		size := binary.BigEndian.Uint32(headerBytes[6:10])
		fmt.Printf("Size: %d\n", size)
		frameHeader := make([]byte, 10)

		var tagbytesread uint32 = 10

		for tagbytesread < size {
			bytesRead, err = f.Read(frameHeader)
			frameId := strings.TrimRight(string(frameHeader[0:4]), "\x00")
			if frameId == "" {
				break
			}
			frameSize := parseSize(frameHeader[4:8])
			fmt.Printf("%s, %d\n", frameId, frameSize)
			f.Seek(int64(frameSize), 1)
			tagbytesread += frameSize
			tagbytesread += 10
		}
	}
	return nil, nil
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
