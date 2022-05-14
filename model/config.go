package model

// Server contains the configuration of the web server
type Server struct {
	Port int `yaml:"port,omitempty" json:"port, omitempty"`
}

// Database contains the configuration of the database backend
type Database struct {
	Username string `yaml:"username,omitempty" json:"username,omitempty"`
	Password string `yaml:"password,omitempty" json:"password,omitempty"`
	Schema   string `yaml:"schema,omitempty" json:"schema,omitempty"`
	Type     string `yaml:"type,omitempty" json:"type,omitempty"`
	Url      string `yaml:"url,omitempty" json:"url,omitempty"`
}

// Media contains the configuration of the media and sync
type Media struct {
	Path          string `yaml:"path,omitempty" json:"path,omitempty"`
	Syncfrequency string `yaml:"syncfrequency,omitempty" json:"syncfrequency,omitempty"`
	SyncAtStart   bool   `yaml:"syncatstart,omitempty" json:"syncatstart,omitempty"`
}

// Application contains the application relevant configurations
type Application struct {
	Mode          string `yaml:"mode,omitempty" json:"mode,omitempty"`
	Loglevel      string `yaml:"loglevel,omitempty" json:"loglevel,omitempty"`
	Cors          string `yaml:"cors,omitempty" json:"cors,omitempty"`
	TokenLifetime string `yaml:"tokenlifetime,omitempty" json:"tokenlifetime,omitempty"`
}

// Config is the root structure of the configuration
type Config struct {
	Application Application `yaml:"application,omitempty" json:"application,omitempty"`
	Server      Server      `yaml:"server,omitempty" json:"server,omitempty"`
	Database    Database    `yaml:"database,omitempty" json:"database,omitempty"`
	Media       Media       `yaml:"media,omitempty" json:"media,omitempty"`
	Tagging     Tagging     `yaml:"tagging,omitempty" json:"tagging,omitempty"`
}

// Tagging contains the configuration for the tagging features
type Tagging struct {
	Path string `yaml:"path,omitempty" json:"path,omitempty"`
}
