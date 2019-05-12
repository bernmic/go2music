package main

import (
	"go2music/exchange"
	"go2music/model"
	"os"
)

func main() {
	songs := make([]*model.Song, 0)
	songs = append(songs, &model.Song{
		Title:    "The Song",
		Artist:   &model.Artist{Name: "The Artist"},
		Album:    &model.Album{Title: "The Album"},
		Path:     "/music/the song.mp3",
		Duration: 240,
		Track:    1,
	})
	songs = append(songs, &model.Song{
		Title:    "Another Song",
		Artist:   &model.Artist{Name: "Another Artist"},
		Album:    &model.Album{Title: "Another Album"},
		Path:     "/music/another song.mp3",
		Duration: 180,
		Track:    2,
	})
	songs = append(songs, &model.Song{
		Path: "/music/anothersong.mp3",
	})
	exchange.ExportXSPF(&model.Playlist{Name: "Test", User: model.User{Username: "TheUser"}}, songs, os.Stdout)
}
