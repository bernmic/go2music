package service

import (
	"io/ioutil"
	"log"
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
