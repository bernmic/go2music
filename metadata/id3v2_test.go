package metadata

import (
	"fmt"
	"strings"
	"testing"
)

var (
	testFiles = []string{
		"F:/tmp/Audio/01 - ABBA - I Still Have Faith In You.mp3",
		"F:/tmp/Audio/AC-DC - Back In Black.MP3",
		"F:/tmp/Audio/01. Sacrifice.mp3", // UTF-16
		"F:/tmp/Audio/01 Lose Yourself.mp3",
		"F:/tmp/Audio/03 - Bläck Fööss - Dä Duff Dä Jrossen Weiten Welt.mp3", // ISO8859 Umlaut
		"F:/tmp/Audio/01 - Bläck Fööss - Pänz, Pänz, Pänz.mp3",               // UTF-16 Umlaut
	}
)

func TestReader(t *testing.T) {
	d, err := ReadFromFile(testFiles[5])
	if err != nil {
		t.Fatalf("Read file %s: %v", testFiles[5], err)
	}
	fmt.Printf("Successfully read %s\n", testFiles[5])
	if d.Header.VersionMajor > 0 {
		fmt.Printf("ID3V2.%d.%d present\n", d.Header.VersionMajor, d.Header.VersionMinor)
		fmt.Printf("Header size %d\n", d.Header.Size)
		fmt.Printf("Unsynchronisation: %t\n", d.Header.Unsynchronised)
		fmt.Printf("Extended header: %t\n", d.Header.ExtendedHeader)
		fmt.Printf("Experimental indicator: %t\n", d.Header.ExperimentalIndicator)
		fmt.Printf("Footer present: %t\n", d.Header.FooterPresent)
		for _, f := range d.Frames {
			if strings.HasPrefix(f.ID, "T") {
				t, _ := GetTextFrame(f)
				fmt.Printf("Tag %s = %s (%s)\n", t.ID, t.Value, t.Encoding)
			} else {
				fmt.Printf("Tag %s\n", f.ID)
			}
		}
		s, err := d.GetTextTag("TALB")
		if err != nil {
			t.Fatalf("error getting album names: %v", err)
		}
		if len(s) == 0 {
			fmt.Println("no album name found")
		} else {
			for _, a := range s {
				fmt.Printf("Album name = %s\n", a)
			}
		}
	}
}
