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

| Environment variable     | Description                                       |
|--------------------------|---------------------------------------------------|
| GO2MUSIC_MEDIAPATH       | Path to the media library                         |
| GO2MUSIC_DBUSERNAME      | database user (default go2music)                  |
| GO2MUSIC_DBPASSWORD      | database password (default go2music)              |
| GO2MUSIC_DBSCHEMA        | database schema (default go2music)                |
| GO2MUSIC_DBURL           | URL to the database                               |
| GO2MUSIC_DBTYPE          | Type of database (mysql or postgres)              |
| GO2MUSIC_BULK_INSERT     | use bulk inserts to database (true or false)      |
| GO2MUSIC_METRICS_COLLECT | collect metric for Prometheus (true or false)     |
| GO2MUSIC_TAGGINGPATH     | path to files to be tagged                        |
| GO2MUSIC_TOKENSECRET     | secret for encrypting JWT                         |
| GO2MUSIC_CORS            | add CORS middleware (all or direct)               |
| GO2MUSIC_CONFIG          | path to the go2music.yaml config file (default .) |

They do the same than the parameters in de go2music.yaml

## Database

Supported databases are
* MySQL 8.0+ for full support)
* MariaDB
* PostgreSQL
* CockroachDB

MariaDB and MySQL are fully tested. The other not. There is a db-create.sql in database-scripts which create the database and user for a MySQL or MariaDB and PostgreSQL.
MariaDB can be used with database type 'mysql'.

## Docker

The Dockerfile works in two steps. The first step will build the executable, the second step creates the image from scratch.
The docker-compose.yml can build the go2music image and creates the container for MySQL and go2music and links them together.

## Frontend

There is a complete web frontend for go2music in the frontend folder. It is a single page application written in typescript with Angular and Angular Material. You can build this in the frontend folder.
```
ng build -c production
```
This will build the frontend and copy the result to assets/front folder.

## Dynamic playlists
Dynamic playlists have an expression which will be converted into a SQL where clause.
Strings have to be in double quotes. Numbers are not quoted. Parenthesis are supported. Wildcards can be used in strings. '*' means zero or more character. '?' means exact one character.

### Fields in queries
| field    | description                    | type   |
|----------|--------------------------------|--------|
| album    | title of the album             | string |
| artist   | name of the artist             | string |
| song     | title of the song              | string |
| genre    | genre of the song              | string |
| duration | duration of the song (seconds) | number |
| year     | year the song was published    | string |
| rating   | rating of the song (0-255)     | number |
| track | track number on album             | number |
| path | path where the song is stored      | string |
| bitrate | bitrate of the song             | number |
| samplerate | samplerate of the song       | number |

### Logical operators
| operator | description     |
|----------|-----------------|
| ==       | equal           |
| !=       | not equal       |
| >=       | equal or higher |
| <=       | equal or lower  |
| \>       | higher          |
| <        | lower           |
| \|\| | logical OR |
| && | logical AND |

### Examples
- artist=="ABBA"
- artist=="Edguy" || artist=="Avantasia"
- album=="Bravo\*Hits\*"
- artist=="Nightwish" && year>="2013"

## Next steps

- bind artists, albums, songs to a musicbrainz id
- bring playcount and rating to the frontend
- Rewrite authentication and authorization.
- reduce dependencies in go.mod
- rewrite frontend with latest Angular and put it in a separate repo
- ~~Bulk-Insert~~
- SQlite support (https://pkg.go.dev/modernc.org/sqlite)

[Jetbrains](https://www.jetbrains.com/?from=go2music) supports this project with GoLand/IntelliJ Idea licenses. We appreciate their support for free and open source software!
