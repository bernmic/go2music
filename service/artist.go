package service

import (
	"fmt"
	"go2music/model"
	"log"
)

func InitializeArtist() {
	_, err := Database.Query("SELECT 1 FROM artist LIMIT 1")
	if err != nil {
		log.Print("INFO Table artist does not exists. Creating now.")
		stmt, err := Database.Prepare("CREATE TABLE IF NOT EXISTS artist (id BIGINT NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY (id));")
		if err != nil {
			log.Print("ERROR Error creating artist table")
			panic(fmt.Sprintf("%v", err))
		}
		_, err = stmt.Exec()
		if err != nil {
			log.Print("ERROR Error creating artist table")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Println("INFO Artist Table successfully created....")
		}
		stmt, err = Database.Prepare("ALTER TABLE artist ADD UNIQUE INDEX artist_name (name)")
		if err != nil {
			log.Print("ERROR Error creating artist table index for name")
			panic(fmt.Sprintf("%v", err))
		}
		_, err = stmt.Exec()
		if err != nil {
			log.Print("ERROR Error creating artist table index for name")
			panic(fmt.Sprintf("%v", err))
		} else {
			log.Println("INFO Index on name generated....")
		}
	}
}

func CreateArtist(artist model.Artist) (*model.Artist, error) {
	result, err := Database.Exec("INSERT IGNORE INTO artist (name) VALUES(?)", artist.Name)
	if err != nil {
		log.Fatal(err)
	}
	artist.Id, _ = result.LastInsertId()
	return &artist, err
}

func CreateIfNotExistsArtist(artist model.Artist) (*model.Artist, error) {
	existingArtist, findErr := FindArtistByName(artist.Name)
	if findErr == nil {
		return existingArtist, findErr
	}
	result, err := Database.Exec("INSERT INTO artist (name) VALUES(?)", artist.Name)
	if err != nil {
		log.Fatal(err)
	}
	artist.Id, _ = result.LastInsertId()
	return &artist, err
}

func UpdateArtist(artist model.Artist) (*model.Artist, error) {
	_, err := Database.Exec("UPDATE artist SET name=? WHERE id=?", artist.Name, artist.Id)
	return &artist, err
}

func DeleteArtist(id int64) error {
	_, err := Database.Exec("DELETE FROM artist WHERE id=?", id)
	return err
}

func FindArtistById(id int64) (*model.Artist, error) {
	artist := new(model.Artist)
	err := Database.QueryRow("SELECT id,name FROM artist WHERE id=?", id).Scan(&artist.Id, &artist.Name)
	if err != nil {
		log.Fatal(err)
	}
	return artist, err
}

func FindArtistByName(name string) (*model.Artist, error) {
	artist := new(model.Artist)
	err := Database.QueryRow("SELECT id,name FROM artist WHERE name=?", name).Scan(&artist.Id, &artist.Name)
	if err != nil {
		return artist, err
	}
	return artist, err
}

func FindAllArtists() ([]*model.Artist, error) {
	rows, err := Database.Query("SELECT id, name FROM artist")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	artists := make([]*model.Artist, 0)
	for rows.Next() {
		artist := new(model.Artist)
		err := rows.Scan(&artist.Id, &artist.Name)
		if err != nil {
			log.Fatal(err)
		}
		artists = append(artists, artist)
	}
	if err = rows.Err(); err != nil {
		log.Fatal(err)
	}

	return artists, err
}
