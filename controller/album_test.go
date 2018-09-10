package controller

import (
	"encoding/json"
	"go2music/model"
	"net/http"
	"testing"
)

func TestGetAlbums(t *testing.T) {
	req, _ := http.NewRequest("GET", "/album", nil)
	response := executeRequest(req)

	checkResponseCode(t, http.StatusOK, response.Code)

	album := model.AlbumCollection{}
	err := json.Unmarshal(response.Body.Bytes(), &album)
	if err != nil {
		t.Errorf("Expected an album collection. %v", err)
	}
}

func TestGetAlbum(t *testing.T) {
	req, _ := http.NewRequest("GET", "/album/myid", nil)
	response := executeRequest(req)

	checkResponseCode(t, http.StatusOK, response.Code)

	album := model.Album{}
	err := json.Unmarshal(response.Body.Bytes(), &album)
	if err != nil || album.Id != "myid" {
		t.Errorf("Expected an album with id myid. %v", err)
	}
}

func TestAllSameArtists(t *testing.T) {
	artist1 := model.Artist{Id: "1", Name: "1"}
	artist2 := model.Artist{Id: "2", Name: "2"}
	song1 := model.Song{Artist: &artist1}
	song2 := model.Song{Artist: &artist1}
	song3 := model.Song{Artist: &artist2}
	allSame := make([]*model.Song, 0)
	allSame = append(allSame, &song1)
	allSame = append(allSame, &song2)

	if !allSameArtist(allSame) {
		t.Error("Expected all same. They aren't")
	}

	allSame = append(allSame, &song3)

	if allSameArtist(allSame) {
		t.Error("Expected not all same but they are")
	}
}

func (db *MockDB) CreateAlbum(album model.Album) (*model.Album, error) {
	return &album, nil
}

func (db *MockDB) CreateIfNotExistsAlbum(album model.Album) (*model.Album, error) {
	return &album, nil
}

func (db *MockDB) UpdateAlbum(album model.Album) (*model.Album, error) {
	return &album, nil
}

func (db *MockDB) DeleteAlbum(id string) error {
	return nil
}
func (db *MockDB) FindAlbumById(id string) (*model.Album, error) {
	album := model.Album{Id: id, Title: "Testalbum", Path: "/some/path"}
	return &album, nil
}

func (db *MockDB) FindAlbumByPath(path string) (*model.Album, error) {
	album := model.Album{Id: "abc", Title: "Testalbum", Path: path}
	return &album, nil
}
func (db *MockDB) FindAllAlbums() ([]*model.Album, error) {
	album := model.Album{Id: "abc", Title: "Testalbum", Path: "/some/path"}
	albums := make([]*model.Album, 1)
	albums = append(albums, &album)
	return albums, nil
}
