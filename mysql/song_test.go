package mysql

import (
	"go2music/model"
	"testing"
)

func Test_InitializeSong(t *testing.T) {
	if !chechTableExists("song") {
		t.Fatalf("Table song not created\n")
	}
}

func Test_PagingSong(t *testing.T) {
	paging := model.Paging{}
	s := createOrderAndLimitForSong(paging)
	if s != "" {
		t.Error("Expected empty string. got " + s)
	}
	paging.Sort = "title"
	s = createOrderAndLimitForSong(paging)
	if s != " ORDER BY song.title" {
		t.Error("Expected 'ORDER BY song.title'. got " + s)
	}
	paging.Direction = "desc"
	s = createOrderAndLimitForSong(paging)
	if s != " ORDER BY song.title DESC" {
		t.Error("Expected 'ORDER BY song.title DESC'. got " + s)
	}
	paging.Size = 2
	s = createOrderAndLimitForSong(paging)
	if s != " ORDER BY song.title DESC LIMIT 0,2" {
		t.Error("Expected 'ORDER BY song.title DESC LIMIT 0,2'. got " + s)
	}
	paging.Page = 1
	s = createOrderAndLimitForSong(paging)
	if s != " ORDER BY song.title DESC LIMIT 2,2" {
		t.Error("Expected 'ORDER BY song.title DESC LIMIT 2,2'. got " + s)
	}
}

/*
func Test_CRUD_Song(t *testing.T) {
	song := model.Song{Title: "Testsong", Path: "/some/where"}
	savedSong, err := testDatabase.CreateSong(song)
	if err != nil {
		t.Fatalf("Error creating song: %v\n", err)
	}

	if savedSong.Id == "" || savedSong.Title != song.Title || savedSong.Path != song.Path {
		t.Errorf("Saved song ist not identical to song or has no id")
	}
	savedId := savedSong.Id

	_, err = testDatabase.CreateSong(&song)
	if err == nil {
		t.Error("Unique index for song.path is not working")
	}

	savedSong.Id = savedId
	savedSong.Title = "OtherTest"
	_, err = testDatabase.UpdateSong(savedSong)

	if err != nil {
		t.Fatalf("Error updating song: %v\n", err)
	}

	updatedSong, err := testDatabase.FindSongById(savedSong.Id)
	if err != nil || savedSong.Title != updatedSong.Title || savedSong.Path != updatedSong.Path {
		t.Errorf("Updated song ist not identical to song")
	}

	foundSong, err := testDatabase.FindSongByPath(savedSong.Path)
	if err != nil || savedSong.Title != foundSong.Title || savedSong.Id != foundSong.Id {
		t.Errorf("Updated song ist not identical to song")
	}

	songs, err := testDatabase.FindAllSongs()
	if err != nil || len(songs) != 1 {
		t.Error("Exprected one item in song table")
	}

	err = testDatabase.DeleteSong(savedId)
	if err != nil {
		t.Error("Could not delete song")
	}

	songs, err = testDatabase.FindAllSongs()
	if err != nil || len(songs) != 0 {
		t.Error("Exprected zero items in song table")
	}
}
*/
