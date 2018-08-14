package main

import (
	"fmt"
	"os"
)

func main() {
	f, err := os.Open("d:/tmp/Deep Purple - Black Night.mp3")
	defer f.Close()
	if err == nil {
		headerBytes := make([]byte, 10)
		bytesRead, err := f.Read(headerBytes)
		if err != nil || bytesRead != 10 || string(headerBytes[0:3]) != "ID3" {
			fmt.Println("no id3v2 header")
		} else {
			v := headerBytes[3]
			fmt.Printf("Found id3v2.%v\n", v)
		}
		pos, err := f.Seek(-128, os.SEEK_END)
		if err != nil || pos < 1 {
			fmt.Println("no id3v1 header 1")
		} else {
			id3v1 := make([]byte, 128)
			bytesRead, err = f.Read(id3v1)
			if err != nil || bytesRead != 128 || string(id3v1[0:3]) != "TAG" {
				fmt.Println("no id3v1 header 2")
			} else {
				fmt.Printf("Found id3v1\n")
			}
		}
	}
}
