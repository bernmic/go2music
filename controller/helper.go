package controller

import (
	"github.com/gin-gonic/gin"
	"go2music/model"
	"io/ioutil"
	"strconv"
	"strings"
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

/*
	Add all files (not dirs) unter root to routergroup with relativepath
    if there is an index.html, add a route from relative path to it
*/
func staticRoutes(relativePath, root string, r *gin.RouterGroup) {
	files, err := ioutil.ReadDir(root)
	if err == nil {
		if !strings.HasSuffix(relativePath, "/") {
			relativePath += "/"
		}
		if !strings.HasSuffix(root, "/") {
			root += "/"
		}
		for _, file := range files {
			if !file.IsDir() {
				r.StaticFile(relativePath+file.Name(), root+file.Name())
				if file.Name() == "index.html" {
					r.StaticFile(relativePath, root+file.Name())
				}
			}
		}
	} else {
		log.Warn("directory not found: " + root)
	}
}
