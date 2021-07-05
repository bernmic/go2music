package thirdparty

import (
	"bytes"
	"encoding/json"
	"fmt"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	"net/http"
	"net/url"
)

const (
	LASTFM_BASEURL = "https://ws.audioscrobbler.com/2.0/"
	LASTFM_APIKEY  = "a4de25f6f66a67f4293126bcc199c2d7"
)

func GetArtistInfo(artistname string) (*LastfmArtistInfo, error) {
	url := fmt.Sprintf("%s?method=%s&artist=%s&api_key=%s&format=json", LASTFM_BASEURL, "artist.getinfo", url.QueryEscape(artistname), LASTFM_APIKEY)
	response, err := http.Get(url)
	if err != nil {
		log.Warnf("Lastfm get artistinfo request failed: %s\n", err)
		return nil, err
	}
	artistInfo := LastfmArtistInfoWrapper{}
	data, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Warnf("Lastfm get artistinfo fetch failed: %s\n", err)
		return nil, err
	}
	err = json.Unmarshal(data, &artistInfo)
	if err != nil {
		log.Warnf("Error unmashal Lastfm get artistinfo: %s\n", err)
		return nil, err
	}
	return &artistInfo.Artist, nil
}

func GetAlbumInfo(albumname string, artistname string) (*LastfmAlbumInfo, error) {
	url := fmt.Sprintf("%s?method=%s&album=%s&artist=%s&api_key=%s&format=json", LASTFM_BASEURL, "album.getinfo", url.QueryEscape(albumname), url.QueryEscape(artistname), LASTFM_APIKEY)
	response, err := http.Get(url)
	if err != nil {
		log.Warnf("Lastfm get albuminfo request failed: %s\n", err)
		return nil, err
	}
	albumInfo := LastfmAlbumInfoWrapper{}
	data, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Warnf("Lastfm get albuminfo fetch failed: %s\n", err)
		return nil, err
	}
	// last.fm responds an empty string for tags if none are present. Remove it to be able to unmarshal
	data = bytes.ReplaceAll(data, []byte(",\"tags\":\"\""), []byte(""))
	err = json.Unmarshal(data, &albumInfo)
	if err != nil {
		log.Warnf("Error unmashal Lastfm get albuminfo: %s\n", err)
		return nil, err
	}
	return albumInfo.Album, nil
}
