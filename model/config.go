package model

type Server struct {
	Port int `yaml: "port,omitempty"`
}

type Database struct {
	Username string `yaml:"username,omitempty"`
	Password string `yaml:"password,omitempty"`
	Type     string `yaml:"type,omitempty"`
	Url      string `yaml:"url,omitempty"`
}

type Media struct {
	Path string `yaml:"path,omitempty"`
}

type Config struct {
	Server   Server   `yaml:"server,omitempty"`
	Database Database `yaml:"database,omitempty"`
	Media    Media    `yaml:"media,omitempty"`
}
