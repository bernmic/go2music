package thirdparty

import (
	"bytes"
	"encoding/json"
	"fmt"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	"net/http"
	"net/url"
	"regexp"
)

const (
	LastfmBaseurl = "https://ws.audioscrobbler.com/2.0/"
	LastfmApikey  = "a4de25f6f66a67f4293126bcc199c2d7"
)

func GetArtistInfo(artistname string) (*LastfmArtistInfo, error) {
	u := fmt.Sprintf("%s?method=%s&artist=%s&api_key=%s&format=json", LastfmBaseurl, "artist.getinfo", url.QueryEscape(artistname), LastfmApikey)
	response, err := http.Get(u)
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
	re := regexp.MustCompile("<a.*</a>")
	if artistInfo.Artist.Bio != nil && artistInfo.Artist.Bio.Summary != "" {
		artistInfo.Artist.Bio.Summary = re.ReplaceAllString(artistInfo.Artist.Bio.Summary, "..")
	}
	if artistInfo.Artist.Bio != nil && artistInfo.Artist.Bio.Content != "" {
		artistInfo.Artist.Bio.Content = re.ReplaceAllString(artistInfo.Artist.Bio.Content, "..")
	}
	return &artistInfo.Artist, nil
}

func GetAlbumInfo(albumname string, artistname string) (*LastfmAlbumInfo, error) {
	u := fmt.Sprintf("%s?method=%s&album=%s&artist=%s&api_key=%s&format=json", LastfmBaseurl, "album.getinfo", url.QueryEscape(albumname), url.QueryEscape(artistname), LastfmApikey)
	response, err := http.Get(u)
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
	re := regexp.MustCompile("<a.*</a>")
	if albumInfo.Album.Wiki != nil && albumInfo.Album.Wiki.Summary != "" {
		albumInfo.Album.Wiki.Summary = re.ReplaceAllString(albumInfo.Album.Wiki.Summary, "..")
	}
	if albumInfo.Album.Wiki != nil && albumInfo.Album.Wiki.Content != "" {
		albumInfo.Album.Wiki.Content = re.ReplaceAllString(albumInfo.Album.Wiki.Content, "..")
	}
	return albumInfo.Album, nil
}
