package controller

import (
	"archive/zip"
	"bytes"
	"fmt"
	"go2music/model"
	"image"
	"image/gif"
	"image/jpeg"
	"image/png"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/disintegration/imaging"
	"github.com/gin-gonic/gin"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
)

const (
	CoverSize = 300 // size of an album cover in pixels
)

func respondWithError(code int, message string, c *gin.Context) {
	c.JSON(code, gin.H{"message": message})
	c.Abort()
}

func extractPagingFromRequest(c *gin.Context) model.Paging {
	paging := model.Paging{}

	values := c.Request.URL.Query()
	if v := values.Get("page"); v != "" {
		paging.Page, _ = strconv.Atoi(v)
	}
	if v := values.Get("size"); v != "" {
		paging.Size, _ = strconv.Atoi(v)
	}
	paging.Sort = values.Get("sort")
	paging.Direction = values.Get("dir")

	return paging
}

func extractFilterFromRequest(c *gin.Context) string {
	values := c.Request.URL.Query()
	if p := values.Get("filter"); p != "" {
		return p
	}
	return ""
}

func getMimeType(u string) string {
	l := strings.ToLower(u)
	if strings.HasSuffix(l, ".html") {
		return "text/html"
	} else if strings.HasSuffix(l, ".js") {
		return "text/javascript"
	} else if strings.HasSuffix(l, ".css") {
		return "text/css"
	} else if strings.HasSuffix(l, ".ico") {
		return "image/x-icon"
	} else {
		return "text/plain"
	}
}

func sendSongsAsZip(c *gin.Context, songs []*model.Song, filename string) {
	if filename == "" {
		if allSameArtist(songs) {
			filename = songs[0].Artist.Name + " - " + songs[0].Album.Title
		} else {
			filename = songs[0].Album.Title
		}
		if filename == "" {
			filename = "unknown"
		}
		filename = filename + ".zip"
	}
	c.Header("Content-Type", "application/zip")
	c.Header("Content-Disposition", fmt.Sprintf("attachment; filename=\"%s\"", filename))
	zw := zip.NewWriter(c.Writer)
	defer func() {
		err := zw.Close()
		if err != nil {
			log.Errorf("error closing file in songsAsZip")
		}
	}()
	for _, song := range songs {
		if err := addFileToZip(zw, song.Path); err != nil {
			respondWithError(http.StatusInternalServerError, "Error creating zip file: "+err.Error(), c)
			return
		}
	}
	m3u := createM3U(songs)
	header := zip.FileHeader{}
	header.Name = "playlist.m3u"
	header.Method = zip.Deflate
	header.UncompressedSize64 = uint64(len(m3u.Bytes()))
	header.Modified = time.Now()
	writer, err := zw.CreateHeader(&header)
	if err == nil {
		_, err = io.Copy(writer, bytes.NewReader(m3u.Bytes()))
		if err != nil {
			log.Warn("Error writing M3U to zip: " + err.Error())
		}
	} else {
		log.Warn("Error creating M3U: " + err.Error())
	}
}

func createM3U(songs []*model.Song) bytes.Buffer {
	var buffer bytes.Buffer
	buffer.WriteString("#EXTM3U\r\n\r\n")
	for _, song := range songs {
		buffer.WriteString(fmt.Sprintf("#EXTINF:%d,%s - %s\r\n", song.Duration, song.Artist.Name, song.Title))
		buffer.WriteString(fmt.Sprintf("%s\r\n\r\n", filepath.Base(song.Path)))
	}
	return buffer
}

func addFileToZip(zw *zip.Writer, filename string) error {
	log.Infof("Adding file %s to zip", filename)
	fileToZip, err := os.Open(filename)
	if err != nil {
		return err
	}
	defer func() {
		err := fileToZip.Close()
		if err != nil {
			log.Errorf("error closing file in addFileToZip")
		}
	}()

	// Get the file information
	info, err := fileToZip.Stat()
	if err != nil {
		return err
	}

	header, err := zip.FileInfoHeader(info)
	if err != nil {
		return err
	}

	header.Name = filepath.Base(filename)
	header.Method = zip.Deflate

	writer, err := zw.CreateHeader(header)
	if err != nil {
		return err
	}
	_, err = io.Copy(writer, fileToZip)
	return err
}

func allSameArtist(s []*model.Song) bool {
	for i := 1; i < len(s); i++ {
		if s[i].Artist.Name != s[0].Artist.Name {
			return false
		}
	}
	return true
}

func resizeCover(data []byte, mimetype string, targetSize int) ([]byte, string, error) {
	var img image.Image
	var err error
	switch mimetype {
	case "image/jpeg":
		img, err = jpeg.Decode(bytes.NewReader(data))
	case "image/jpg":
		img, err = jpeg.Decode(bytes.NewReader(data))
	case "image/png":
		img, err = png.Decode(bytes.NewReader(data))
	case "image/gif":
		img, err = gif.Decode(bytes.NewReader(data))
	default:
		return nil, "", errors.New("Unknown image format " + mimetype)
	}
	if err != nil {
		log.Warnf("Corrupt image format %s: %v", mimetype, err)
		return nil, "", errors.New("Corrupt image format " + mimetype)
	}
	img = imaging.Resize(img, targetSize, targetSize, imaging.Lanczos)
	buf := new(bytes.Buffer)
	err = jpeg.Encode(buf, img, nil)
	if err != nil {
		return nil, "", err
	}
	return buf.Bytes(), "image/jpeg", nil
}

func principal(c *gin.Context) (*model.User, error) {
	user, ok := c.Get("principal")
	if !ok {
		return nil, errors.New("unauthorized")
	}
	return databaseAccess.UserManager.FindUserByUsername(user.(*model.User).Username)
}
