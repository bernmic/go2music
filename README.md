# Go2Music

Simple project for first Go experiences.
It is a REST service with a database as backend. At this point, it can scan filesystem after MP3 files, read the metadata (id3v2) and store the data normalized in the database. After that it can deliver songs, albums and artists via REST calls.
It can also stream existing songs via http and serve existing covers.

For better organization, it supports playlists. There are manually created playlists and dynamic playlists which collects songs with a query. Simple Golang expressions (eg. album=="True") are supported.

There is a Dockerfile to create the smallest possible docker image and a docker-compose.yml to setup the complete app with a MySQL database.

## build

Clone this repository go to the cloned sources and run:

    go get ./...
    go build .

This will build the go2music executable.

## run

The executable can be started without any parameters. It tries to read the go2music.yaml where all configuration can be done. It supports also some environment variables:
* GO2MUSIC_MEDIAPATH
* GO2MUSIC_DBUSERNAME
* GO2MUSIC_DBPASSWORD
* GO2MUSIC_DBSCHEMA
* GO2MUSIC_DBURL
* GO2MUSIC_DBTYPE

They do the same than the parameters in de go2music.yaml

## database

Supported databases are
* MySQL
* MariaDB
* PostgreSQL
* CockroachDB

MariaDB and MySQL are fully tested. The other not. There is a db-create.sql which create the database and user for a MySQL or MariaDB.

## Docker

The Dockerfile works in two steps. The first step will build the executable, the second step creates the image from scratch.
The docker-compose.yml can build the go2music image and creates the container for MySQL and go2music and links them together.

## Frontend

There is a complete web frontend for go2music in the frontend folder. It is a single page application written in typescript with Angular and Angular Material. You can build this in the frontend folder and copy the contents of the dist folder to the static folder of go2music.

## Next steps

- bind artists, albums, songs to a musicbrainz id
- bring playcount and rating to the frontend
- Rewrite authentication and authorization.
- 