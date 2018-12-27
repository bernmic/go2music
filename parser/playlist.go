package parser

import (
	"bufio"
	"fmt"
	"github.com/pkg/errors"
	"go/ast"
	"go/parser"
	"go/token"
	"strings"
)

const (
	EMPTY_SQL_STRING = "''"
)

func EvalPlaylistExpression(expression string) (string, error) {
	scanner := bufio.NewScanner(strings.NewReader(expression))
	scanned := scanner.Scan()
	if !scanned {
		return "", errors.New("Nothings to scan")
	}

	line := scanner.Text()
	exp, err := parser.ParseExpr(line)
	if err != nil {
		fmt.Printf("parsing failed: %s\n", err)
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
		fmt.Printf("%v\n", exp)
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
			strings.Contains(left, "?") ||
			strings.Contains(right, "*") ||
			strings.Contains(right, "?") {
			left = strings.Replace(left, "*", "%", -1)
			left = strings.Replace(left, "?", "_", -1)
			right = strings.Replace(right, "*", "%", -1)
			right = strings.Replace(right, "?", "_", -1)
			return left + " LIKE " + right, nil
		}
		if left == EMPTY_SQL_STRING {
			return right + " IS NULL", nil
		}
		if right == EMPTY_SQL_STRING {
			return left + " IS NULL", nil
		}
		return left + "=" + right, nil
	case token.NEQ:
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
