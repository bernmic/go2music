package controller

import (
	"github.com/gin-gonic/gin"
	"go2music/configuration"
	"go2music/model"
	"net/http"
)

func initConfig(r *gin.RouterGroup) {
	r.GET("/config", getConfig)
	r.PUT("/config", setConfig)
}

func getConfig(c *gin.Context) {
	c.JSON(http.StatusOK, configuration.Configuration(true))
}

func setConfig(c *gin.Context) {
	config := model.Config{}
	err := c.BindJSON(&config)
	if err != nil {
		respondWithError(http.StatusBadRequest, "invalid configuration", c)
		return
	}
	newConfig, err := configuration.ChangeConfiguration(&config)
	if err != nil {
		respondWithError(http.StatusInternalServerError, "unknow error", c)
		return
	}
	c.JSON(http.StatusOK, newConfig)
}
