package main

import (
	"crypto/sha256"
	"encoding/base64"
	"fmt"
)

func main() {
	s := "/data/music/sampler/somewhatever/song1.mp3"
	h := sha256.New()
	h.Write([]byte(s))
	result := base64.URLEncoding.EncodeToString(h.Sum(nil))

	fmt.Printf("And the result is: %s\n", result)
}
