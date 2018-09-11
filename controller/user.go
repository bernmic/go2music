package controller

import (
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"go2music/model"
	"net/http"
)

func initUser(r *gin.RouterGroup) {
	r.GET("/user", GetUsers)
	r.GET("/user/:id", GetUser)
	r.POST("/user", CreateUser)
	r.PUT("/user", UpdateUser)
	r.DELETE("/user/:id", DeleteUser)
}

func GetUsers(c *gin.Context) {
	paging := extractPagingFromRequest(c)
	users, err := userManager.FindAllUsers(paging)
	if err == nil {
		c.JSON(http.StatusOK, model.UserCollection{users, paging})
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read users", c)
}

func GetUser(c *gin.Context) {
	id := c.Param("id")
	user, err := userManager.FindUserById(id)
	if err != nil {
		respondWithError(http.StatusNotFound, "user not found", c)
		return
	}
	c.JSON(http.StatusOK, user)
}

func CreateUser(c *gin.Context) {
	user := &model.User{}
	err := c.BindJSON(user)
	if err != nil {
		log.Warn("cannot decode request", err)
		respondWithError(http.StatusBadRequest, "bad request", c)
		return
	}
	user, err = userManager.CreateUser(*user)
	if err != nil {
		respondWithError(http.StatusBadRequest, "bad request", c)
		return
	}
	c.JSON(http.StatusCreated, user)
}

func UpdateUser(c *gin.Context) {
	user := &model.User{}
	err := c.BindJSON(user)
	if err != nil {
		log.Warn("cannot decode request", err)
		respondWithError(http.StatusBadRequest, "bad request", c)
		return
	}
	user, err = userManager.UpdateUser(*user)
	if err != nil {
		respondWithError(http.StatusBadRequest, "bad request", c)
		return
	}
	c.JSON(http.StatusOK, user)
}

func DeleteUser(c *gin.Context) {
	id := c.Param("id")
	if userManager.DeleteUser(id) != nil {
		respondWithError(http.StatusBadRequest, "cannot delete user", c)
		return
	}
	c.Data(http.StatusOK, gin.MIMEPlain, nil)
}
