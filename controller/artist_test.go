package controller

import (
	"encoding/json"
	"go2music/model"
	"net/http"
	"testing"
)

func TestGetArtists(t *testing.T) {
	req, _ := http.NewRequest("GET", "/artist", nil)
	response := executeRequest(req)

	checkResponseCode(t, http.StatusOK, response.Code)

	artist := model.ArtistCollection{}
	err := json.Unmarshal(response.Body.Bytes(), &artist)
	if err != nil {
		t.Errorf("Expected an artist collection. %v", err)
	}
}

func TestGetArtist(t *testing.T) {
	req, _ := http.NewRequest("GET", "/artist/myid", nil)
	response := executeRequest(req)

	checkResponseCode(t, http.StatusOK, response.Code)

	artist := model.Artist{}
	err := json.Unmarshal(response.Body.Bytes(), &artist)
	if err != nil || artist.Id != "myid" {
		t.Errorf("Expected an artist with id myid. %v", err)
	}
}

func (db *MockDB) CreateArtist(artist model.Artist) (*model.Artist, error) {
	return &artist, nil
}

func (db *MockDB) CreateIfNotExistsArtist(artist model.Artist) (*model.Artist, error) {
	return &artist, nil
}

func (db *MockDB) UpdateArtist(artist model.Artist) (*model.Artist, error) {
	return &artist, nil
}

func (db *MockDB) DeleteArtist(id string) error {
	return nil
}
func (db *MockDB) FindArtistById(id string) (*model.Artist, error) {
	artist := model.Artist{Id: id, Name: "Testartist"}
	return &artist, nil
}

func (db *MockDB) FindArtistByName(name string) (*model.Artist, error) {
	artist := model.Artist{Id: "abc", Name: name}
	return &artist, nil
}
func (db *MockDB) FindAllArtists() ([]*model.Artist, error) {
	artist := model.Artist{Id: "abc", Name: "Testartist"}
	artists := make([]*model.Artist, 0)
	artists = append(artists, &artist)
	return artists, nil
}
