package controller

import (
	"github.com/gin-gonic/gin"
	"go2music/model"
	"strconv"
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
