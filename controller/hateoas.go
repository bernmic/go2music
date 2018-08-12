package controller

import (
	"log"
	"net/http"
)

func BaseUrl(r *http.Request) string {
	if r.TLS != nil {
		log.Println("INFO Scheme: https")
	} else {
		log.Println("INFO Scheme: http")
	}
	log.Println("INFO Host:   " + r.Host)
	log.Println("INFO Path:   " + r.RequestURI)

	return ""
}
