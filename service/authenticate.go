package service

import (
	"encoding/base64"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"net/http"
	"strings"
	"time"
)

func userpassword() (userPasswordMap map[string]string) {
	userPasswordMap = make(map[string]string)
	userPasswordMap["user"] = "user"
	userPasswordMap["admin"] = "admin"
	userPasswordMap["guest"] = "guest"
	return
}

func GenerateJWT() (tokenString string, err error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"iat": time.Now().Unix(),
		"exp": time.Now().Add(time.Hour * 1).Unix()})

	// Sign and get the complete encoded token as a string
	tokenString, err = token.SignedString([]byte("secret"))
	return tokenString, err
}

func AuthenticateRequest(authHeader string) bool {

	data, err := base64.StdEncoding.DecodeString(authHeader)
	if err != nil {
		fmt.Println("error:", err)
		return false
	}
	fmt.Printf("%q\n", data)
	userpwd := strings.Split(string(data), ":")

	userpwdmap := userpassword()
	if userpwdmap[userpwd[0]] == userpwd[1] {
		return true
	}
	return false
}

func AuthenticateJWT(header http.Header) bool {
	jwtString := header.Get("Authentication")
	if len(jwtString) == 0 {
		return false
	}
	token, err := jwt.Parse(jwtString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte("secret"), nil
	})

	if err == nil && token.Valid {
		return true
	} else {
		return false
	}
	return false
}
