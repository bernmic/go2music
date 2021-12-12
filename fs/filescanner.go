package fs

import (
	"errors"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

var result []string

func Filescanner(root string, extension string) ([]string, error) {
	result := make([]string, 0)
	err := filepath.Walk(root,
		func(path string, info os.FileInfo, err error) error {
			if err != nil {
				return err
			}
			if strings.HasSuffix(strings.ToLower(path), extension) && !info.IsDir() {
				result = append(result, path)
			}
			return nil
		})

	return result, err
}

// Filescanner gets a list of all files having the given extension recursive in the path
func FilescannerOld(root string, extension string, level ...int) ([]string, error) {
	var clevel int
	if clevel = 0; len(level) > 0 {
		clevel = level[0]
	}
	files, err := ioutil.ReadDir(root)
	if err != nil {
		log.Error("error reading dir: ", err)
		return nil, err
	}
	if clevel == 0 {
		result = nil
		extension = strings.ToLower(extension)
	}
	for _, file := range files {
		if file.IsDir() {
			FilescannerOld(root+"/"+file.Name(), extension, clevel+1)
		} else if strings.HasSuffix(strings.ToLower(file.Name()), extension) {
			result = append(result, root+"/"+file.Name())
		}
	}

	return result, nil
}

// ImageType contains data about an image
type ImageFile struct {
	path     string
	mimetype string
}

// GetCoverFromPath gets a cover from the path if there is one
func GetCoverFromPath(path string) ([]byte, string, error) {
	var files []ImageFile
	filepath.Walk(path, func(path string, f os.FileInfo, err error) error {
		if err == nil && !f.IsDir() {
			ext := strings.ToLower(f.Name())
			if filepath.Ext(ext) == ".gif" {
				files = append(files, ImageFile{path: path, mimetype: "image/gif"})
			} else if filepath.Ext(ext) == ".jpg" {
				files = append(files, ImageFile{path: path, mimetype: "image/jpeg"})
			} else if filepath.Ext(ext) == ".jpeg" {
				files = append(files, ImageFile{path: path, mimetype: "image/jpeg"})
			} else if filepath.Ext(ext) == ".png" {
				files = append(files, ImageFile{path: path, mimetype: "image/png"})
			}
		}
		return nil
	})

	log.Infof("Found cover files: %v", files)
	if len(files) > 0 {
		// todo select the correct cover file
		for _, f := range files {
			lcFilename := filepath.Base(f.path)
			lcFilename = strings.ToLower(lcFilename)
			if strings.Contains(lcFilename, "cover") ||
				strings.Contains(lcFilename, "front") ||
				strings.Contains(lcFilename, "folder") {
				image, err := ioutil.ReadFile(f.path)
				return image, f.mimetype, err
			}
		}
		image, err := ioutil.ReadFile(files[0].path)
		return image, files[0].mimetype, err
	}
	return nil, "", errors.New("no cover found in path " + path)
}
