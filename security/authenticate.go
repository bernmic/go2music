package security

import (
	"encoding/base64"
	"errors"
	"fmt"
	"go2music/database"
	"go2music/model"
	"go2music/mysql"
	"net/http"
	"strings"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	cache "github.com/patrickmn/go-cache"
	log "github.com/sirupsen/logrus"
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

// GenerateJWT generates a JSON Web Token for the given user
func GenerateJWT(user *model.User) (tokenString string, err error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"usr": user.Username,
		"iat": time.Now().Unix(),
		"exp": time.Now().Add(time.Hour * 1).Unix()})

	// Sign and get the complete encoded token as a string
	tokenString, err = token.SignedString([]byte("secret"))
	return tokenString, err
}

// AuthenticateRequest checks the BasisAuth header against the user database
func AuthenticateRequest(authHeader string, userManager database.UserManager) (*model.User, error) {
	splittedHeader := strings.Split(authHeader, " ")
	if len(splittedHeader) != 2 || splittedHeader[0] != "Basic" {
		return nil, errors.New("bad request")
	}
	data, err := base64.StdEncoding.DecodeString(splittedHeader[1])
	if err != nil {
		log.Warn("error decoding base64", err)
		return nil, errors.New("bad request")
	}
	userpwd := strings.Split(string(data), ":")

	user, err := userManager.FindUserByUsername(userpwd[0])
	if err != nil {
		return nil, errors.New("username and/or password wrong")
	}
	if mysql.CheckPasswordHash(userpwd[1], user.Password) {
		return user, nil
	}
	return nil, errors.New("username and/or password wrong")
}

// AuthenticateJWT checks the validity of the authorization header in the given request and returns the username
func AuthenticateJWT(header http.Header) (username string, valid bool) {
	jwtString := header.Get("Authorization")
	return AuthenticateJWTString(jwtString)
}

// AuthenticateJWTString checks the validity of the authorization header and returns the username
func AuthenticateJWTString(authHeader string) (username string, valid bool) {
	splittedHeader := strings.Split(authHeader, " ")
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

	if token != nil && token.Valid {
		return claims.User, true
	} else {
		return "", false
	}
	return "", false
}

// GetPrincipal returns the User struct for the given username
func GetPrincipal(username string, userManager database.UserManager) (*model.User, error) {
	user, found := usersCache.Get(username)
	if !found {
		var err error
		user, err = userManager.FindUserByUsername(username)
		if err != nil {
			return nil, err
		}
		usersCache.Set(username, user, cache.DefaultExpiration)
	}
	return user.(*model.User), nil
}
