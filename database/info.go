package database

import "go2music/model"

// InfoManager defines the database functions for info (eg. dashboards)
type InfoManager interface {
	Info() (*model.Info, error)
	GetDecades() ([]*model.NameCount, error)
	GetYears(decade string) ([]*model.NameCount, error)
	GetGenres() ([]*model.NameCount, error)
}
