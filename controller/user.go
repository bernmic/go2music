package controller

import (
	"go2music/model"
	"net/http"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func initUser(r *gin.RouterGroup) {
	r.GET("/user", getUsers)
	r.GET("/user/:id", getUser)
	r.POST("/user", createUser)
	r.PUT("/user", updateUser)
	r.DELETE("/user/:id", deleteUser)
}

func getUsers(c *gin.Context) {
	paging := extractPagingFromRequest(c)
	filter := extractFilterFromRequest(c)
	users, total, err := userManager.FindAllUsers(filter, paging)
	if err == nil {
		c.JSON(http.StatusOK, model.UserCollection{users, paging, total})
		return
	}
	respondWithError(http.StatusInternalServerError, "Cound not read users", c)
}

func getUser(c *gin.Context) {
	id := c.Param("id")
	user, err := userManager.FindUserById(id)
	if err != nil {
		respondWithError(http.StatusNotFound, "user not found", c)
		return
	}
	c.JSON(http.StatusOK, user)
}

func createUser(c *gin.Context) {
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

func updateUser(c *gin.Context) {
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

func deleteUser(c *gin.Context) {
	id := c.Param("id")
	if userManager.DeleteUser(id) != nil {
		respondWithError(http.StatusBadRequest, "cannot delete user", c)
		return
	}
	c.Data(http.StatusOK, gin.MIMEPlain, nil)
}
