package model

import "net/http"

// HTTPError is the data type for a HTTP error
// swagger:response HTTPError
type HTTPError struct {
	// The HTTP code
	Code int `json:"code,omitempty"`
	// The error message
	Message string `json:"message,omitempty"`
}

// NotFoundError returns an Error struct for a NotFoundError
func NotFoundError(message string) HTTPError {
	e := HTTPError{Code: http.StatusNotFound, Message: message}
	return e
}

// InternalServerError returns an Error struct for an internal server error
func InternalServerError(message string) HTTPError {
	e := HTTPError{Code: http.StatusInternalServerError, Message: message}
	return e
}

// BadRequestError returns an Error struct for a bad request
func BadRequestError(message string) HTTPError {
	e := HTTPError{Code: http.StatusBadRequest, Message: message}
	return e
}

// UnauthorizedError returns an Error struct for a unauthorized request
func UnauthorizedError(message string) HTTPError {
	e := HTTPError{Code: http.StatusUnauthorized, Message: message}
	return e
}
