package metadata

import (
	"fmt"
	"go2music/database"
	"testing"
)

const dir = "T:/Sortiert/Audio/Einzelne"

func TestScan(t *testing.T) {
	files, err := database.Filescanner(dir, ".mp3")
	if err != nil {
		t.Fatalf("error getting files from %s: %v", dir, err)
	}
	for _, f := range files {
		id3, err := ReadFromFile(f)
		if err != nil {
			fmt.Printf("%s - error %v\n", f, err)
		} else {
			enc := ""
			for _, f := range id3.Frames {
				if f.ID == "TPE1" {
					tf, err := GetTextFrame(f)
					if err == nil {
						enc = tf.Encoding
					}
				}
			}
			fmt.Printf("%s - ID3V2.%d.%d, encoding=%s\n", f, id3.Header.VersionMajor, id3.Header.VersionMinor, enc)
		}
	}
}
