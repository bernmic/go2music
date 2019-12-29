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

	albums, total, err := testDatabase.FindAllAlbums("", model.Paging{}, "")
	if err != nil || len(albums) != 1 || total != 1 {
		t.Error("Exprected one item in album table")
	}

	err = testDatabase.DeleteAlbum(savedId)
	if err != nil {
		t.Error("Could not delete album")
	}

	albums, total, err = testDatabase.FindAllAlbums("", model.Paging{}, "")
	if err != nil || len(albums) != 0 || total != 0 {
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

func Test_PagingAlbum(t *testing.T) {
	paging := model.Paging{}
	s, l := createOrderAndLimitForAlbum(paging)
	if s != "" || l == true {
		t.Error("Expected empty string. got " + s)
	}
	paging.Sort = "title"
	s, _ = createOrderAndLimitForAlbum(paging)
	if s != " ORDER BY title" {
		t.Error("Expected 'ORDER BY title'. got " + s)
	}
	paging.Direction = "desc"
	s, _ = createOrderAndLimitForAlbum(paging)
	if s != " ORDER BY title DESC" {
		t.Error("Expected 'ORDER BY title DESC'. got " + s)
	}
	paging.Size = 2
	s, l = createOrderAndLimitForAlbum(paging)
	if s != " ORDER BY title DESC LIMIT 0,2" {
		t.Error("Expected 'ORDER BY title DESC LIMIT 0,2'. got " + s)
	}
	if !l {
		t.Error("Expected limit == true, got false")
	}
	paging.Page = 1
	s, _ = createOrderAndLimitForAlbum(paging)
	if s != " ORDER BY title DESC LIMIT 2,2" {
		t.Error("Expected 'ORDER BY title DESC LIMIT 2,2'. got " + s)
	}
}
