package install

import (
	"context"
	log "github.com/sirupsen/logrus"
	"go2music/configuration"
	"go2music/model"
	"html/template"
	"net/http"
	"os"
	"strconv"
)

// InstallParameters contains the attributes for a setup
type InstallParameters struct {
	DatabaseType     string
	DatabaseServer   string
	DatabaseSchema   string
	DatabaseUser     string
	DatabasePassword string
	ServerPort       string
	MediaPath        string
}

// InstallServer contains the informations of the webserver started for a setup
type InstallServer struct {
	Server    *http.Server
	Terminate chan error
}

func (is *InstallServer) root(w http.ResponseWriter, r *http.Request) {
	// redirect to /install
	http.Redirect(w, r, "/install", http.StatusFound)
}

func (is *InstallServer) install(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		// GET send the installation form
		t, err := template.ParseFiles("assets/install/install.tpl")
		if err != nil {
			is.Terminate <- err
		}
		err = t.Execute(w, createInstallParameter())
		if err != nil {
			is.Terminate <- err
		}
		return
	}
	if r.Method == http.MethodPost {
		// POST receive the data and write config file
		err := r.ParseForm()
		if err != nil {
			log.Errorf("error parsing template: %v", err)
		}
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
		// write config
		_, err = configuration.ChangeConfiguration(&c)
		if err != nil {
			log.Errorf("error writing congiguration: %v", err)
		}
		log.Infof("Restart now.")
		http.Redirect(w, r, "/", http.StatusFound)
		// send shutdown signal
		is.Terminate <- nil
	}
}

// InstallHandler starts a webserver for setup purposes
func InstallHandler() error {
	// Installation. Start a http server on port 8080 and wait for shutdown.
	s := InstallServer{Server: &http.Server{Addr: ":8080"}, Terminate: make(chan error)}
	http.HandleFunc("/", s.root)
	http.HandleFunc("/install", s.install)
	go func() {
		if err := s.Server.ListenAndServe(); err != nil {
			log.Errorf("Httpserver: ListenAndServe() error: %s", err)
		}
	}()
	// wait for the shutdown signal
	<-s.Terminate
	return s.Server.Shutdown(context.TODO())
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
