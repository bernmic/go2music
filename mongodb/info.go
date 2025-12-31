package mongodb

import (
	"go2music/model"

	log "github.com/sirupsen/logrus"
)

func (db *MongoDB) Info(chached bool) (*model.Info, error) {
	log.Fatalf("Info not implemented")
	return nil, nil
}

func (db *MongoDB) GetDecades() ([]*model.NameCount, error) {
	log.Fatalf("GetDecades not implemented")
	return nil, nil
}

func (db *MongoDB) GetYears(decade string) ([]*model.NameCount, error) {
	log.Fatalf("GetYears not implemented")
	return nil, nil
}

func (db *MongoDB) GetGenres() ([]*model.NameCount, error) {
	log.Fatalf("GetGenres not implemented")
	return nil, nil
}
