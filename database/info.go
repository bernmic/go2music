package database

import "go2music/model"

// InfoManager defines the database functions for info (eg. dashboards)
type InfoManager interface {
	Info() (*model.Info, error)
}
