package mysql

import (
	"go2music/model"
	"testing"
)

func Test_InitializePlaylist(t *testing.T) {
	if !chechTableExists("playlist") {
		t.Fatalf("Table playlist not created\n")
	}
	if !chechTableExists("playlist_song") {
		t.Fatalf("Table playlist_song not created\n")
	}
}

func Test_PagingPlaylist(t *testing.T) {
	paging := model.Paging{}
	s := createOrderAndLimitForPlaylist(paging)
	if s != "" {
		t.Error("Expected empty string. got " + s)
	}
	paging.Sort = "name"
	s = createOrderAndLimitForPlaylist(paging)
	if s != " ORDER BY name" {
		t.Error("Expected 'ORDER BY name'. got " + s)
	}
	paging.Direction = "desc"
	s = createOrderAndLimitForPlaylist(paging)
	if s != " ORDER BY name DESC" {
		t.Error("Expected 'ORDER BY name DESC'. got " + s)
	}
	paging.Size = 2
	s = createOrderAndLimitForPlaylist(paging)
	if s != " ORDER BY name DESC LIMIT 0,2" {
		t.Error("Expected 'ORDER BY name DESC LIMIT 0,2'. got " + s)
	}
	paging.Page = 1
	s = createOrderAndLimitForPlaylist(paging)
	if s != " ORDER BY name DESC LIMIT 2,2" {
		t.Error("Expected 'ORDER BY name DESC LIMIT 2,2'. got " + s)
	}
}
