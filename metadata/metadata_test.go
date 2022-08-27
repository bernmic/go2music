package metadata

import (
	"fmt"
	"go2music/database"
	"testing"
)

func TestMetadata(t *testing.T) {
	files, err := database.Filescanner(dir, ".mp3")
	if err != nil {
		t.Fatalf("error getting files from %s: %v", dir, err)
	}
	for _, f := range files {
		m, err := MetadataFromFile(f)
		if err != nil {
			t.Fatalf("error getting metadata from %s: %v\n", f, err)
		} else {
			fmt.Printf("%s is %s. ID3V1=%t, ID3V2=%t\n", f, m.Type, m.HasID3V1(), m.HasID3V2())
		}
	}
}
