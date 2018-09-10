package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"net/http/httptest"
	"testing"
)

type MockDB struct {
}

var testRouter *gin.Engine

func TestMain(m *testing.M) {
	mockDB := MockDB{}
	albumManager = &mockDB
	artistManager = &mockDB

	testRouter = gin.Default()
	initAlbum(&testRouter.RouterGroup)
	initArtist(&testRouter.RouterGroup)
	m.Run()
}

func executeRequest(req *http.Request) *httptest.ResponseRecorder {
	rr := httptest.NewRecorder()
	testRouter.ServeHTTP(rr, req)
	return rr
}

func checkResponseCode(t *testing.T, expected, actual int) {
	if expected != actual {
		t.Errorf("Expected response code %d. Got %d\n", expected, actual)
	}
}
