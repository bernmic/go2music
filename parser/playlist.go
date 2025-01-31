package parser

import (
	"bufio"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"go/ast"
	"go/parser"
	"go/token"
	"strings"
)

const (
	EmptySqlString = "''"
)

// EvalPlaylistExpression evaluate the given expression and returns an SQL where clause.
// Expression is a Go expression
func EvalPlaylistExpression(expression string) (string, error) {
	scanner := bufio.NewScanner(strings.NewReader(expression))
	scanned := scanner.Scan()
	if !scanned {
		return "", errors.New("Nothings to scan")
	}

	line := scanner.Text()
	exp, err := parser.ParseExpr(line)
	if err != nil {
		log.Errorf("parsing failed: %s\n", err)
		return "", err
	}
	return evalAST(exp)
}

func evalAST(exp ast.Expr) (string, error) {
	switch exp := exp.(type) {
	case *ast.BinaryExpr:
		return evalBinary(exp)
	case *ast.ParenExpr:
		return evalParen(exp)
	case *ast.Ident:
		switch exp.Name {
		case "album":
			return "album.title", nil
		case "artist":
			return "artist.name", nil
		case "song":
			return "song.title", nil
		case "genre":
			return "song.genre", nil
		case "duration":
			return "song.duration", nil
		case "year":
			return "song.yearpublished", nil
		case "rating":
			return "song.rating", nil
		case "track":
			return "song.track", nil
		case "path":
			return "song.path", nil
		case "bitrate":
			return "song.bitrate", nil
		case "samplerate":
			return "song.samplerate", nil
		}
		return exp.Name, nil
	case *ast.BasicLit:
		val := exp.Value
		switch exp.Kind {
		case token.STRING:
			val = strings.Replace(val, "\"", "'", -1)
		}
		return val, nil
	default:
		log.Errorf("%v\n", exp)
	}
	return "", errors.Errorf("Illegal expression")
}
func evalParen(expr *ast.ParenExpr) (string, error) {
	r, err := evalAST(expr.X)
	if err != nil {
		return "", err
	}
	return "(" + r + ")", nil
}

func evalBinary(exp *ast.BinaryExpr) (string, error) {
	left, err := evalAST(exp.X)
	if err != nil {
		return "", err
	}
	right, err := evalAST(exp.Y)
	if err != nil {
		return "", err
	}
	switch exp.Op {
	case token.LAND:
		return left + " AND " + right, nil
	case token.LOR:
		return left + " OR " + right, nil
	case token.EQL:
		if strings.Contains(left, "*") ||
			strings.Contains(left, "?") {
			left = strings.Replace(left, "*", "%", -1)
			left = strings.Replace(left, "?", "_", -1)
			return right + " LIKE " + left, nil
		}
		if strings.Contains(right, "*") ||
			strings.Contains(right, "?") {
			right = strings.Replace(right, "*", "%", -1)
			right = strings.Replace(right, "?", "_", -1)
			return left + " LIKE " + right, nil
		}
		if left == EmptySqlString {
			return right + " IS NULL OR " + right + "=''", nil
		}
		if right == EmptySqlString {
			return left + " IS NULL OR " + left + "=''", nil
		}
		return left + "=" + right, nil
	case token.NEQ:
		if strings.Contains(left, "*") ||
			strings.Contains(left, "?") {
			left = strings.Replace(left, "*", "%", -1)
			left = strings.Replace(left, "?", "_", -1)
			return right + " NOT LIKE " + left, nil
		}
		if strings.Contains(right, "*") ||
			strings.Contains(right, "?") {
			right = strings.Replace(right, "*", "%", -1)
			right = strings.Replace(right, "?", "_", -1)
			return left + " NOT LIKE " + right, nil
		}
		if left == EmptySqlString {
			return right + " IS NOT NULL AND " + right + "!=''", nil
		}
		if right == EmptySqlString {
			return left + " IS NOT NULL AND " + left + "!=''", nil
		}
		return left + "!=" + right, nil
	case token.LSS:
		return left + "<" + right, nil
	case token.LEQ:
		return left + "<=" + right, nil
	case token.GTR:
		return left + ">" + right, nil
	case token.GEQ:
		return left + ">=" + right, nil
	}
	return "", errors.New("Illegal token")
}
