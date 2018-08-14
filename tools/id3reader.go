package main

import (
	"fmt"
	"go2music/id3"
)

func main() {
	tag, err := id3.ReadID3("/Users/bernmic/Music/Deep Purple/Now What/01 A Simple Song.mp3")
	fmt.Printf("%v, %v", tag, err)
	tag, err = id3.ReadID3("/Users/bernmic/Music/Volbeat/Outlaw Gentlemen...Shady Ladies/01 - Let's Shake Some Dust.mp3")
}
