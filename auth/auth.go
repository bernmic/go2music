package auth

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/patrickmn/go-cache"
	log "github.com/sirupsen/logrus"
	"go2music/configuration"
	"go2music/database"
	"go2music/model"
	"strings"
	"time"
)

const (
	UserRole   = "user"
	AdminRole  = "admin"
	GuestRole  = "guest"
	EditorRole = "editor"
)

var usersCache *cache.Cache

func init() {
	usersCache = cache.New(5*time.Minute, 10*time.Minute)
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
	if database.CheckPasswordHash(userpwd[1], user.Password) {
		return user, nil
	}
	return nil, errors.New("username and/or password wrong")
}

func GenerateTokenForUser(u *model.User) (string, error) {
	tlt := configuration.Configuration(false).Application.TokenLifetime
	duration, err := time.ParseDuration(tlt)
	if err != nil {
		duration = time.Hour * 1
	}

	payload := map[string]interface{}{
		"usr": u.Username,
		"iat": time.Now().Unix(),
		"exp": time.Now().Add(duration).Unix(),
		"rol": u.Role,
	}

	return GenerateToken("HS256", payload, configuration.Configuration(false).Application.TokenSecret)
}

func ValidateUser(token string) (*model.User, error) {
	b, payload, err := ValidateToken(token, configuration.Configuration(false).Application.TokenSecret)
	if err != nil {
		return nil, fmt.Errorf("error validating token: %v", err)
	}
	if b {
		p := make(map[string]interface{}, 0)
		err = json.Unmarshal(payload, &p)
		if err != nil {
			return nil, fmt.Errorf("error unmarshall payload: %v", err)
		}
		if p["exp"] == nil {
			return nil, errors.New("missing expriration field in token")
		}
		if int64(p["exp"].(float64)) <= time.Now().Unix() {
			return nil, errors.New("token expired")
		}
		u := model.User{
			Username: p["usr"].(string),
			Role:     p["rol"].(string),
		}
		return &u, nil
	}
	return nil, fmt.Errorf("no valid token")
}

// GenerateToken generates a JSON Web Token for the given data
func GenerateToken(header string, payload map[string]interface{}, secret string) (string, error) {
	// create a new hash of type sha256. We pass the secret key to it
	h := hmac.New(sha256.New, []byte(secret))
	header64 := base64.StdEncoding.EncodeToString([]byte(header))
	// We then Marshal the payload which is a map. This converts it to a string of JSON.
	payloadstr, err := json.Marshal(payload)
	if err != nil {
		return string(payloadstr), fmt.Errorf("error generating token: %v", err)
	}
	payload64 := base64.StdEncoding.EncodeToString(payloadstr)

	// Now add the encoded string.
	message := header64 + "." + payload64

	// We have the unsigned message ready.
	unsignedStr := header + string(payloadstr)

	// We write this to the SHA256 to hash it.
	h.Write([]byte(unsignedStr))
	signature := base64.StdEncoding.EncodeToString(h.Sum(nil))

	//Finally we have the token
	tokenStr := message + "." + signature
	if strings.ContainsAny(tokenStr, " ") {
		log.Warn("Token contains space!!!!!!!!!!!!!!!!!!!!!!!!!!!")
	}
	fmt.Println("TOKEN=" + tokenStr)
	return tokenStr, nil
}

// ValidateToken validates the given token, returns validate state, payload
func ValidateToken(token string, secret string) (bool, []byte, error) {
	// JWT has 3 parts separated by '.'
	splitToken := strings.Split(token, ".")
	// if length is not 3, we know that the token is corrupt
	if len(splitToken) != 3 {
		return false, nil, nil
	}

	// decode the header and payload back to strings
	header, err := base64.StdEncoding.DecodeString(splitToken[0])
	if err != nil {
		return false, nil, err
	}
	payload, err := base64.StdEncoding.DecodeString(splitToken[1])
	if err != nil {
		return false, nil, err
	}
	//again create the signature
	unsignedStr := string(header) + string(payload)
	h := hmac.New(sha256.New, []byte(secret))
	h.Write([]byte(unsignedStr))

	signature := base64.StdEncoding.EncodeToString(h.Sum(nil))

	// if both the signature don’t match, this means token is wrong
	if signature != splitToken[2] {
		return false, nil, nil
	}
	// This means the token matches
	return true, payload, nil
}
