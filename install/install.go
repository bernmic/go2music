package install

import (
	"go2music/configuration"
	"go2music/model"
	"gopkg.in/yaml.v2"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
)

type InstallParameters struct {
	DatabaseType     string
	DatabaseServer   string
	DatabaseSchema   string
	DatabaseUser     string
	DatabasePassword string
	ServerPort       string
	MediaPath        string
}

var installServer http.Server

func root(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "/install", http.StatusFound)
}

func install(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		t, err := template.ParseFiles("assets/install.html")
		if err != nil {
			panic(err)
		}
		err = t.Execute(w, createInstallParameter())
		if err != nil {
			panic(nil)
		}
		return
	}
	if r.Method == http.MethodPost {
		log.Println("POST")
		r.ParseForm()
		c := model.Config{}
		c.Database.Type = r.Form.Get("databasetype")
		c.Database.Schema = r.Form.Get("databaseschema")
		c.Database.Username = r.Form.Get("databaseuser")
		c.Database.Password = r.Form.Get("databasepassword")
		s := r.Form.Get("databasehost")
		switch c.Database.Type {
		case "mysql":
			c.Database.Url = "${username}:${password}@tcp(" + s + ")/${schema}"
		case "postgres":
			c.Database.Url = "postgresql://${username}:${password}@" + s + "/${schema}"
		}
		c.Server.Port, _ = strconv.Atoi(r.Form.Get("serverport"))
		c.Media.Path = r.Form.Get("mediapath")
		c.Media.SyncAtStart = true
		c.Media.Syncfrequency = "1800s"
		c.Application.Mode = "release"
		c.Application.Loglevel = "info"
		c.Application.Cors = "all"
		log.Println(c)
		b, err := yaml.Marshal(c)
		if err != nil {
			panic(err)
		}
		ioutil.WriteFile(configuration.ConfigFile, b, 0777)
	}
}

func InstallHandler() error {
	http.HandleFunc("/install", install)
	return http.ListenAndServe(":8080", nil)
}

func createInstallParameter() InstallParameters {
	p := InstallParameters{
		DatabaseType:     "mysql",
		DatabaseServer:   "localhost:3306",
		DatabaseSchema:   "go2music",
		DatabaseUser:     "go2music",
		DatabasePassword: "go2music",
		ServerPort:       "8080",
		MediaPath:        "/data",
	}

	if v := os.Getenv("GO2MUSIC_DBTYPE"); v != "" {
		p.DatabaseType = v
	}

	if v := os.Getenv("GO2MUSIC_DBSERVER"); v != "" {
		p.DatabaseServer = v
	}

	if v := os.Getenv("GO2MUSIC_DBSCHEMA"); v != "" {
		p.DatabaseSchema = v
	}

	if v := os.Getenv("GO2MUSIC_DBUSERNAME"); v != "" {
		p.DatabaseUser = v
	}

	if v := os.Getenv("GO2MUSIC_DBPASSWORD"); v != "" {
		p.DatabasePassword = v
	}

	if v := os.Getenv("GO2MUSIC_DBSERVER"); v != "" {
		p.DatabaseServer = v
	}

	if v := os.Getenv("GO2MUSIC_PORT"); v != "" {
		p.ServerPort = v
	}

	if v := os.Getenv("GO2MUSIC_MEDIA"); v != "" {
		p.MediaPath = v
	}

	return p
}
