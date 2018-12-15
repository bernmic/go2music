package model

type Server struct {
	Port int `yaml:"port,omitempty", json:"port, omitempty"`
}

type Database struct {
	Username string `yaml:"username,omitempty", json:"username,omitempty"`
	Password string `yaml:"password,omitempty", json:"password,omitempty"`
	Schema   string `yaml:"schema,omitempty", json:"schema,omitempty"`
	Type     string `yaml:"type,omitempty", json:"type,omitempty"`
	Url      string `yaml:"url,omitempty", json:"url,omitempty"`
}

type Media struct {
	Path          string `yaml:"path,omitempty", json:"path,omitempty"`
	Syncfrequency string `yaml:"syncfrequency,omitempty", json:"syncfrequency,omitempty"`
	SyncAtStart   bool   `yaml:"syncatstart,omitempty", json:"syncatstart,omitempty"`
}

type Application struct {
	Mode     string `yaml:"mode,omitempty", json:"mode,omitempty"`
	Loglevel string `yaml:"loglevel,omitempty", json:"loglevel,omitempty"`
	Cors     string `yaml:"cors,omitempty", json:"cors,omitempty"`
}

type Config struct {
	Application Application `yaml:"application,omitempty", json:"application,omitempty"`
	Server      Server      `yaml:"server,omitempty", json:"server,omitempty"`
	Database    Database    `yaml:"database,omitempty", json:"database,omitempty"`
	Media       Media       `yaml:"media,omitempty", json:"media,omitempty"`
}
