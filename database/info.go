package database

import "go2music/model"

// InfoManager defines the database functions for info (eg. dashboards)
type InfoManager interface {
	Info(chached bool) (*model.Info, error)
	GetDecades() ([]*model.NameCount, error)
	GetYears(decade string) ([]*model.NameCount, error)
	GetGenres() ([]*model.NameCount, error)
}

const (
	SqlInfoDecades = `
select 
	count(id) count,
	concat(left(yearpublished, 3), '0s') as decade
from 
	song
where
	length(yearpublished)>=4
group by
	concat(left(yearpublished, 3), '0s')
`
	SqlInfoYears = `
select 
	count(id) count,
	LEFT(yearpublished, 4)
from 
	song
where LEFT(yearpublished, 3) = LEFT(?, 3)
group by
	LEFT(yearpublished, 4)`

	SqlInfoGenres = `
select 
	count(id) count,
	genre
from 
	song
group by
	genre
order by
	genre
`
)
