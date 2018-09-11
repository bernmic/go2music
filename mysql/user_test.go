package mysql

import (
	"go2music/model"
	"testing"
)

const (
	testPassword = "VerySecret"
)

func Test_InitializeUser(t *testing.T) {
	if !chechTableExists("user") {
		t.Fatalf("Table user not created\n")
	}
}

func Test_Hash(t *testing.T) {
	hashedPassword, err := HashPassword(testPassword)
	if err != nil {
		t.Errorf("Error hashing password: %v\n", err)
	}
	if !CheckPasswordHash(testPassword, hashedPassword) {
		t.Error("hashes are not identical")
	}
}

func Test_PagingUser(t *testing.T) {
	paging := model.Paging{}
	s := createOrderAndLimitForUser(paging)
	if s != "" {
		t.Error("Expected empty string. got " + s)
	}
	paging.Sort = "username"
	s = createOrderAndLimitForUser(paging)
	if s != " ORDER BY username" {
		t.Error("Expected 'ORDER BY username'. got " + s)
	}
	paging.Direction = "desc"
	s = createOrderAndLimitForUser(paging)
	if s != " ORDER BY username DESC" {
		t.Error("Expected 'ORDER BY username DESC'. got " + s)
	}
	paging.Size = 2
	s = createOrderAndLimitForUser(paging)
	if s != " ORDER BY username DESC LIMIT 0,2" {
		t.Error("Expected 'ORDER BY username DESC LIMIT 0,2'. got " + s)
	}
	paging.Page = 1
	s = createOrderAndLimitForUser(paging)
	if s != " ORDER BY username DESC LIMIT 2,2" {
		t.Error("Expected 'ORDER BY username DESC LIMIT 2,2'. got " + s)
	}
}
