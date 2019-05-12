package exchange

import (
	"encoding/xml"
	"fmt"
	"go2music/model"
	"io"
	"net/url"
	"time"
)

type Track struct {
	Location   string `xml:"location"`
	Identifier string `xml:"identifier,omitempty"`
	Title      string `xml:"title,omitempty"`
	Creator    string `xml:"creator,omitempty"`
	Annotation string `xml:"annotation,omitempty"`
	Info       string `xml:"info,omitempty"`
	Image      string `xml:"image,omitempty"`
	Album      string `xml:"album,omitempty"`
	TrackNum   uint   `xml:"trackNum,omitempty"`
	Duration   uint   `xml:"duration,omitempty"`
}

type Tracklist struct {
	Tracks []Track `xml:"track"`
}

type XSPF struct {
	XMLName    xml.Name  `xml:"playlist"`
	Version    string    `xml:"version,attr"`
	Xmlns      string    `xml:"xmlns,attr"`
	Title      string    `xml:"title,omitempty"`
	Creator    string    `xml:"creator,omitempty"`
	Annotation string    `xml:"annotation,omitempty"`
	Info       string    `xml:"info,omitempty"`
	Location   string    `xml:"location,omitempty"`
	Identifier string    `xml:"identifier,omitempty"`
	Image      string    `xml:"image,omitempty"`
	Date       time.Time `xml:"date,omitempty"`
	TrackList  Tracklist `xml:"trackList,omitempty"`
}

func ExportXSPF(p *model.Playlist, songs []*model.Song, w io.Writer) {
	w.Write([]byte("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"))
	enc := xml.NewEncoder(w)
	enc.Indent("", "    ")
	pl := XSPF{Version: "1", Xmlns: "http://xspf.org/ns/0/"}
	pl.Title = p.Name
	pl.Creator = p.User.Username
	pl.Date = time.Now()
	for _, song := range songs {
		pl.TrackList.Tracks = append(pl.TrackList.Tracks, trackFromSong(song))
	}
	if err := enc.Encode(pl); err != nil {
		fmt.Printf("error: %v\n", err)
	}
}

func trackFromSong(song *model.Song) Track {
	t := Track{}
	t.Title = song.Title
	t.Location = url.QueryEscape(song.Path)
	t.Duration = uint(song.Duration * 1000)
	t.TrackNum = uint(song.Track)
	if song.Artist != nil {
		t.Creator = song.Artist.Name
	}
	if song.Album != nil {
		t.Album = song.Album.Title
	}

	return t
}
