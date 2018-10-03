package model

type Server struct {
	Port int `yaml:"port,omitempty"`
}

type Database struct {
	Username string `yaml:"username,omitempty"`
	Password string `yaml:"password,omitempty"`
	Schema   string `yaml:"schema,omitempty"`
	Type     string `yaml:"type,omitempty"`
	Url      string `yaml:"url,omitempty"`
}

type Media struct {
	Path          string `yaml:"path,omitempty"`
	Syncfrequency string `yaml:"syncfrequency,omitempty"`
	SyncAtStart   bool   `yaml:"syncatstart,omitempty"`
}

type Application struct {
	Mode     string `yaml:"mode,omitempty"`
	Loglevel string `yaml:"loglevel,omitempty"`
	Cors     string `yaml:"cors,omitempty"`
}

type Config struct {
	Application Application `yaml:"application,omitempty"`
	Server      Server      `yaml:"server,omitempty"`
	Database    Database    `yaml:"database,omitempty"`
	Media       Media       `yaml:"media,omitempty"`
}
