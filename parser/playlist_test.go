package parser

import (
	"testing"
)

const (
	test1           = `album=="Test Album"`
	expectedResult1 = `album.title='Test Album'`
	test2           = `album  == "Test Album"&&song=="X"`
	expectedResult2 = `album.title='Test Album' AND song.title='X'`
	test3           = `album == "*Test Album?"`
	expectedResult3 = `album.title LIKE '%Test Album_'`
	test4           = `album == "*Test Album?" || (duration >= 300 && genre=="Jazz")`
	expectedResult4 = `album.title LIKE '%Test Album_' OR (song.duration>=300 AND song.genre='Jazz')`
	test5           = `album==""`
	expectedResult5 = `album.title IS NULL`
)

func Test_Parser(t *testing.T) {
	r, err := EvalPlaylistExpression(test1)
	if err != nil {
		t.Errorf("Error parsing test1: %v\n", err)
	}
	if r != expectedResult1 {
		t.Errorf("Expected >>%s<<, got >>%s<<", expectedResult1, r)
	}

	r, err = EvalPlaylistExpression(test2)
	if err != nil {
		t.Errorf("Error parsing test2: %v\n", err)
	}
	if r != expectedResult2 {
		t.Errorf("Expected >>%s<<, got >>%s<<", expectedResult2, r)
	}

	r, err = EvalPlaylistExpression(test3)
	if err != nil {
		t.Errorf("Error parsing test3: %v\n", err)
	}
	if r != expectedResult3 {
		t.Errorf("Expected >>%s<<, got >>%s<<", expectedResult3, r)
	}

	r, err = EvalPlaylistExpression(test4)
	if err != nil {
		t.Errorf("Error parsing test4: %v\n", err)
	}
	if r != expectedResult4 {
		t.Errorf("Expected >>%s<<, got >>%s<<", expectedResult4, r)
	}

	r, err = EvalPlaylistExpression(test5)
	if err != nil {
		t.Errorf("Error parsing test5: %v\n", err)
	}
	if r != expectedResult5 {
		t.Errorf("Expected >>%s<<, got >>%s<<", expectedResult5, r)
	}
}
