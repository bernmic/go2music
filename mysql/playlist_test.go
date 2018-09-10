package mysql

import "testing"

func Test_InitializePlaylist(t *testing.T) {
	if !chechTableExists("playlist") {
		t.Fatalf("Table playlist not created\n")
	}
	if !chechTableExists("playlist_song") {
		t.Fatalf("Table playlist_song not created\n")
	}
}
