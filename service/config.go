package service

import (
	"go2music/model"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"os"
)

var config model.Config
var configLoaded = false
var secrets = map[string]string{}

type Secret string

const (
	ConfigFile     string = "go2music.yaml"
	SecretsFile    string = "secrets.yaml"
	PasswordSecret Secret = "password"
	TokenSecret    Secret = "token"
)

func Configuration() *model.Config {
	if !configLoaded {
		config = model.Config{}

		configdata, err := ioutil.ReadFile(ConfigFile)
		if err == nil {
			yaml.Unmarshal([]byte(configdata), &config)
		}

		if config.Application.Mode == "" {
			config.Application.Mode = "debug"
		}

		if config.Application.Loglevel == "" {
			config.Application.Loglevel = "info"
		}

		if config.Server.Port == 0 {
			config.Server.Port = 8080
		}
		if config.Media.Path == "" {
			config.Media.Path = "${home}/Music"
		}
		if config.Database.Type == "" {
			config.Database.Username = os.Getenv("GO2MUSIC_DBUSERNAME")
			if config.Database.Username == "" {
				config.Database.Username = "go2music"
			}
			config.Database.Password = os.Getenv("GO2MUSIC_DBPASSWORD")
			if config.Database.Password == "" {
				config.Database.Password = "go2music"
			}
			config.Database.Url = os.Getenv("GO2MUSIC_DBURL")
			if config.Database.Url == "" {
				//dburl = "tcp(newmedia:3307)/go2music"
				config.Database.Url = "tcp(localhost:3306)/go2music"
			}
			config.Database.Type = os.Getenv("GO2MUSIC_DBTYPE")
			if config.Database.Type == "" {
				config.Database.Type = "mysql"
			}
		}
		configLoaded = true
	}
	return &config
}

func Secrets(secret Secret) string {
	if len(secrets) == 0 {
		secretdata, err := ioutil.ReadFile(SecretsFile)
		if err == nil {
			yaml.Unmarshal([]byte(secretdata), &config)
		}
	}
	return ""
}
