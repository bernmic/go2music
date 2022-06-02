package controller

import (
	"fmt"
	"go2music/configuration"
	"go2music/tagging"
	"net/http"
	"strings"

	url2 "net/url"

	"github.com/bogem/id3v2/v2"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

var m *tagging.Media

func initTagging(r *gin.RouterGroup) {
	m = tagging.NewMedia("")
	r.GET("/tagging/media", media)
	r.PUT("/tagging/media", setMedia)

	r.GET("/tagging/song", songsFromMedia)
	r.GET("/tagging/song/:file", song)
	r.GET("/tagging/song/:file/cover", cover)
	r.PUT("/tagging/song/:file", setTag)
	r.DELETE("/tagging/song/:file", removeTag)
}

func media(c *gin.Context) {
	c.JSON(http.StatusOK, m)
}

func setMedia(c *gin.Context) {
	var m2 tagging.Media
	err := c.BindJSON(&m2)
	if err != nil {
		c.JSON(http.StatusBadRequest, status(http.StatusBadRequest, "bad request"))
		return
	}
	m.MediaPath = m2.MediaPath
	configuration.Configuration(false).Tagging.Path = m2.MediaPath
	media(c)
}

func songsFromMedia(c *gin.Context) {
	dir := c.Query("path")
	files, dirs, err := tagging.ParseDir(dir)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
	} else {
		songList := tagging.TaggingSongList{}
		songList.Songs = make([]*tagging.TaggingSong, 0)
		for _, f := range files {
			var s *tagging.TaggingSong
			if strings.HasSuffix(strings.ToLower(f), ".mp3") {
				s, err = m.ParseMP3(f)
			} else if strings.HasSuffix(strings.ToLower(f), ".flac") {
				s, err = m.ParseFlac(f)
			} else {
				continue
			}
			s.Links = songLinks(c, s)
			if err == nil {
				songList.Songs = append(songList.Songs, s)
			}
		}
		songList.Links = songListLinks(c, dirs, dir)
		c.JSON(http.StatusOK, songList)
	}
}

func song(c *gin.Context) {
	path := m.MediaPath + "/" + c.Param("file")
	var s *tagging.TaggingSong
	var err error
	if strings.HasSuffix(strings.ToLower(path), ".mp3") {
		s, err = m.ParseMP3(path)
	} else if strings.HasSuffix(strings.ToLower(path), ".flac") {
		s, err = m.ParseFlac(path)
	} else {
		c.JSON(http.StatusBadRequest, status(http.StatusBadRequest, "unsupported file format"))
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
	} else {
		s.Links = songLinks(c, s)
		c.JSON(http.StatusOK, s)
	}
}

func cover(c *gin.Context) {
	path := m.MediaPath + "/" + c.Param("file")
	var s *tagging.TaggingSong
	var err error
	if strings.HasSuffix(strings.ToLower(path), ".mp3") {
		s, err = m.ParseMP3(path)
	} else if strings.HasSuffix(strings.ToLower(path), ".flac") {
		s, err = m.ParseFlac(path)
	} else {
		c.JSON(http.StatusBadRequest, status(http.StatusBadRequest, "unsupported file format"))
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
	} else if s.Cover.Data == nil {
		c.JSON(http.StatusNotFound, status(http.StatusNotFound, "cover not found"))
	} else {
		c.Data(http.StatusOK, s.Cover.Mimetype, s.Cover.Data)
	}
}

func setTag(c *gin.Context) {
	var s tagging.TaggingSong
	err := c.BindJSON(&s)
	if err != nil {
		c.JSON(http.StatusBadRequest, status(http.StatusBadRequest, "bas request"))
		return
	}
	tag, err := id3v2.Open(m.MediaPath+"/"+c.Param("file"), id3v2.Options{Parse: true})
	if err != nil {
		log.Println("Error while opening mp3 file: ", err)
		c.JSON(http.StatusNotFound, status(http.StatusNotFound, "file not found"))
		return
	}
	defer func() {
		err := tag.Close()
		if err != nil {
			log.Errorf("error closing tag for set: %v", err)
		}
	}()
	err = m.SongMP3(&s, tag)
	err = tag.Save()
	if err != nil {
		c.JSON(http.StatusInternalServerError, status(http.StatusInternalServerError, err.Error()))
	} else {
		err := tag.Close()
		if err != nil {
			log.Errorf("error closing tag for set: %v", err)
		}
		song(c)
	}
}

func removeTag(c *gin.Context) {
	tag, err := id3v2.Open(m.MediaPath+"/"+c.Param("file"), id3v2.Options{Parse: true})
	if err != nil {
		log.Println("Error while opening mp3 file: ", err)
		c.JSON(http.StatusNotFound, status(http.StatusNotFound, "file not found"))
		return
	}
	defer func() {
		err := tag.Close()
		if err != nil {
			log.Errorf("error closing tag for remove: %v", err)
		}
	}()
	tag.DeleteAllFrames()
	tag.SetVersion(4)
	err = tag.Save()
	if err != nil {
		c.JSON(http.StatusInternalServerError, status(http.StatusInternalServerError, err.Error()))
	} else {
		c.Status(http.StatusNoContent)
	}
}

func url(c *gin.Context, path string) string {
	proto := "http"
	lastSep := ""
	if c.Request.TLS != nil {
		proto = "https"
	}
	if path != "" {
		lastSep = "/"
	}
	return fmt.Sprintf("%s://%s%s%s%s", proto, c.Request.Host, c.Request.URL.Path, lastSep, url2.PathEscape(path))
}

func songLinks(c *gin.Context, s *tagging.TaggingSong) map[string]string {
	links := make(map[string]string, 0)
	links["self"] = url(c, s.File)
	links["cover"] = links["self"] + "/cover"
	return links
}

func songListLinks(c *gin.Context, d []string, path string) map[string]string {
	links := make(map[string]string, 0)
	links["self"] = url(c, "")
	if path != "" {
		links["self"] = links["self"] + "?path=" + path
	}
	for i, f := range d {
		links[fmt.Sprintf("%d", i)] = url(c, "") + "?path=" + url2.QueryEscape(f)
	}
	return links
}

type Status struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

func status(status int, message string) Status {
	return Status{status, message}
}
