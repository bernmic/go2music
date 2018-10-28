package database

import "go2music/model"

type InfoManager interface {
	Info() (*model.Info, error)
}
