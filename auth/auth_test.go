package auth

import (
	"go2music/configuration"
	"go2music/model"
	"testing"
	"time"
)

func TestAuth(t *testing.T) {

	u := model.User{
		Username: "user",
		Role:     "user",
		Email:    "testuser@test.user",
		Password: "Secret",
	}
	token, err := GenerateTokenForUser(&u)
	if err != nil {
		t.Fatalf("error generating token: %v\n", err)
	}

	user, err := ValidateUser(token)
	if err != nil {
		t.Fatalf("error validation token:%v", err)
	}
	if user.Username != u.Username {
		t.Fatalf("expected username %s, got %s", u.Username, user.Username)
	}
	if user.Role != u.Role {
		t.Fatalf("expected role %s, got %s", u.Role, user.Role)
	}
}

func TestExpiration(t *testing.T) {
	u := model.User{
		Username: "user",
		Role:     "user",
		Email:    "testuser@test.user",
		Password: "Secret",
	}
	configuration.Configuration(false).Application.TokenLifetime = "1s"
	token, err := GenerateTokenForUser(&u)
	if err != nil {
		t.Fatalf("error generating token: %v\n", err)
	}
	time.Sleep(2 * time.Second)
	_, err = ValidateUser(token)
	if err == nil {
		t.Fatalf("expecting expiration of token")
	}
}
