package mysql

import (
	"go2music/model"
	"testing"
)

func Test_InitializeArtist(t *testing.T) {
	if !chechTableExists("artist") {
		t.Fatalf("Table artist not created\n")
	}
}

func Test_CRUD_Artist(t *testing.T) {
	artist := model.Artist{Name: "Testartist"}
	savedArtist, err := testDatabase.CreateArtist(artist)
	if err != nil {
		t.Fatalf("Error creating artist: %v\n", err)
	}

	if savedArtist.Id == "" || savedArtist.Name != artist.Name {
		t.Errorf("Saved artist ist not identical to artist or has no id")
	}
	savedId := savedArtist.Id

	_, err = testDatabase.CreateArtist(artist)
	if err == nil {
		t.Error("Unique index for artist.path is not working")
	}

	savedArtist.Id = savedId
	savedArtist.Name = "OtherTest"
	_, err = testDatabase.UpdateArtist(*savedArtist)

	if err != nil {
		t.Fatalf("Error updating artist: %v\n", err)
	}

	updatedArtist, err := testDatabase.FindArtistById(savedArtist.Id)
	if err != nil || savedArtist.Name != updatedArtist.Name {
		t.Errorf("Updated artist ist not identical to artist")
	}

	artists, err := testDatabase.FindAllArtists()
	if err != nil || len(artists) != 1 {
		t.Error("Expected one item in artist table")
	}

	err = testDatabase.DeleteArtist(savedId)
	if err != nil {
		t.Error("Could not delete artist")
	}

	artists, err = testDatabase.FindAllArtists()
	if err != nil || len(artists) != 0 {
		t.Error("Expected zero items in artist table")
	}
}

func Test_CINE_Artist(t *testing.T) {
	artist := model.Artist{Name: "Testartist"}
	savedArtist, err := testDatabase.CreateIfNotExistsArtist(artist)
	if err != nil {
		t.Fatalf("Error creating artist: %v\n", err)
	}

	if savedArtist.Id == "" || savedArtist.Name != artist.Name {
		t.Errorf("Saved artist ist not identical to artist or has no id")
	}
	savedId := savedArtist.Id

	savedAgainArtist, err := testDatabase.CreateIfNotExistsArtist(artist)
	if err != nil {
		t.Errorf("Error creating artist: %v\n", err)
	}
	if savedId != savedAgainArtist.Id {
		t.Errorf("Expected to get the same artist again")
	}
	testDatabase.DeleteArtist(savedId)
}
