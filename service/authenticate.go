package service

import (
	"encoding/base64"
	"errors"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/patrickmn/go-cache"
	"go2music/model"
	"log"
	"net/http"
	"strings"
	"time"
)

const (
	UserRole  string = "user"
	AdminRole string = "admin"
	GuestRole string = "guest"
)

type Go2MusicClaimsType struct {
	*jwt.StandardClaims
	User string `json:"usr"`
}

var usersCache *cache.Cache

func init() {
	usersCache = cache.New(5*time.Minute, 10*time.Minute)
}

func GenerateJWT(user *model.User) (tokenString string, err error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"usr": user.Username,
		"iat": time.Now().Unix(),
		"exp": time.Now().Add(time.Hour * 1).Unix()})

	// Sign and get the complete encoded token as a string
	tokenString, err = token.SignedString([]byte("secret"))
	return tokenString, err
}

func AuthenticateRequest(authHeader string) (*model.User, error) {
	splittedHeader := strings.Split(authHeader, " ")
	if len(splittedHeader) != 2 || splittedHeader[0] != "Basic" {
		return nil, errors.New("bad request")
	}
	data, err := base64.StdEncoding.DecodeString(splittedHeader[1])
	if err != nil {
		log.Println("WARN error decoding base64", err)
		return nil, errors.New("bad request")
	}
	userpwd := strings.Split(string(data), ":")

	user, err := FindUserByUsername(userpwd[0])
	if err != nil {
		return nil, errors.New("username/password wrong")
	}
	if user.Password == userpwd[1] {
		return user, nil
	}
	return nil, errors.New("username/password wrong")
}

func AuthenticateJWT(header http.Header) (username string, valid bool) {
	jwtString := header.Get("Authorization")
	splittedHeader := strings.Split(jwtString, " ")
	if len(splittedHeader) != 2 || splittedHeader[0] != "Bearer" {
		return "", false
	}
	claims := Go2MusicClaimsType{}
	token, _ := jwt.ParseWithClaims(splittedHeader[1], &claims, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte("secret"), nil
	})

	if token.Valid {
		return claims.User, true
	} else {
		return "", false
	}
	return "", false
}

func GetPrincipal(username string) (*model.User, error) {
	user, found := usersCache.Get(username)
	if !found {
		var err error
		user, err = FindUserByUsername(username)
		if err != nil {
			return nil, err
		}
		usersCache.Set(username, user, cache.DefaultExpiration)
	}
	return user.(*model.User), nil
}
