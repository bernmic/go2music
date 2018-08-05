package service

import (
	"errors"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"
)

var result []string

func Filescanner(root string, extension string, level ...int) []string {
	var clevel int
	if clevel = 0; len(level) > 0 {
		clevel = level[0]
	}
	files, err := ioutil.ReadDir(root)
	if err != nil {
		log.Print(err)
		return nil
	}
	if clevel == 0 {
		result = nil
		extension = strings.ToLower(extension)
	}
	for _, file := range files {
		if file.IsDir() {
			Filescanner(root+"/"+file.Name(), extension, clevel+1)
		} else if strings.HasSuffix(strings.ToLower(file.Name()), extension) {
			result = append(result, root+"/"+file.Name())
		}
	}

	return result
}

type ImageFile struct {
	path     string
	mimetype string
}

func GetCoverFromPath(path string) ([]byte, string, error) {
	var files []ImageFile
	filepath.Walk(path, func(path string, f os.FileInfo, _ error) error {
		if !f.IsDir() {
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

	if len(files) > 0 {
		image, err := ioutil.ReadFile(files[0].path)
		return image, files[0].mimetype, err
	}
	return nil, "", errors.New("no cover found in path " + path)
}
