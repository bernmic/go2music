package mysql

import (
	"go2music/model"
	"testing"
)

func Test_InitializeAlbum(t *testing.T) {
	if !chechTableExists("album") {
		t.Fatalf("Table album not created\n")
	}
}

func Test_CRUD_Album(t *testing.T) {
	album := model.Album{Title: "Testalbum", Path: "/some/where"}
	savedAlbum, err := testDatabase.CreateAlbum(album)
	if err != nil {
		t.Fatalf("Error creating album: %v\n", err)
	}

	if savedAlbum.Id == "" || savedAlbum.Title != album.Title || savedAlbum.Path != album.Path {
		t.Errorf("Saved album ist not identical to album or has no id")
	}
	savedId := savedAlbum.Id

	_, err = testDatabase.CreateAlbum(album)
	if err == nil {
		t.Error("Unique index for album.path is not working")
	}

	savedAlbum.Id = savedId
	savedAlbum.Title = "OtherTest"
	_, err = testDatabase.UpdateAlbum(*savedAlbum)

	if err != nil {
		t.Fatalf("Error updating album: %v\n", err)
	}

	updatedAlbum, err := testDatabase.FindAlbumById(savedAlbum.Id)
	if err != nil || savedAlbum.Title != updatedAlbum.Title || savedAlbum.Path != updatedAlbum.Path {
		t.Errorf("Updated album ist not identical to album")
	}

	foundAlbum, err := testDatabase.FindAlbumByPath(savedAlbum.Path)
	if err != nil || savedAlbum.Title != foundAlbum.Title || savedAlbum.Id != foundAlbum.Id {
		t.Errorf("Updated album ist not identical to album")
	}

	albums, err := testDatabase.FindAllAlbums()
	if err != nil || len(albums) != 1 {
		t.Error("Exprected one item in album table")
	}

	err = testDatabase.DeleteAlbum(savedId)
	if err != nil {
		t.Error("Could not delete album")
	}

	albums, err = testDatabase.FindAllAlbums()
	if err != nil || len(albums) != 0 {
		t.Error("Exprected zero items in album table")
	}
}

func Test_CINE_Album(t *testing.T) {
	album := model.Album{Title: "Testalbum", Path: "/some/where"}
	savedAlbum, err := testDatabase.CreateIfNotExistsAlbum(album)
	if err != nil {
		t.Fatalf("Error creating album: %v\n", err)
	}

	if savedAlbum.Id == "" || savedAlbum.Title != album.Title || savedAlbum.Path != album.Path {
		t.Errorf("Saved album ist not identical to album or has no id")
	}
	savedId := savedAlbum.Id

	savedAgainAlbum, err := testDatabase.CreateIfNotExistsAlbum(album)
	if err != nil {
		t.Errorf("Error creating album: %v\n", err)
	}
	if savedId != savedAgainAlbum.Id {
		t.Errorf("Expected to get the same album again")
	}
	testDatabase.DeleteAlbum(savedId)
}