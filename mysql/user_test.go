package mysql

import "testing"

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
