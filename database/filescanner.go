package database

import (
	"os"
	"path/filepath"
	"strings"
)

// Filescanner gets a list of all files having the given extension recursive in the path
func Filescanner(root string, extension string) ([]string, error) {
	result := make([]string, 0)
	err := filepath.Walk(root,
		func(path string, info os.FileInfo, err error) error {
			if err != nil {
				return err
			}
			if strings.HasSuffix(strings.ToLower(path), extension) && !info.IsDir() {
				result = append(result, strings.ReplaceAll(path, "\\", "/"))
			}
			return nil
		})

	return result, err
}
