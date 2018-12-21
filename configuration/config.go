package configuration

import (
	"flag"
	log "github.com/sirupsen/logrus"
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
	SecretsFile    string = "secrets.yaml"
	PasswordSecret Secret = "password"
	TokenSecret    Secret = "token"
)

var ConfigFile = "go2music.yaml"

func Configuration(force bool) *model.Config {
	if force || !configLoaded {
		if c := os.Getenv("GO2MUSIC_CONFIG"); c != "" {
			ConfigFile = c
		}
		if flag.Lookup("config-file") == nil {
			configPtr := flag.String("config-file", "", "Path to config file")
			flag.Parse()
			if *configPtr != "" {
				ConfigFile = *configPtr
			}
		}
		log.Infof("Reading config from %s", ConfigFile)

		config = model.Config{}

		configdata, err := ioutil.ReadFile(ConfigFile)
		if err == nil {
			yaml.Unmarshal([]byte(configdata), &config)
		} else {
			log.Warnf("Config file not found. Use default parameters.")
		}

		if config.Application.Mode == "" {
			config.Application.Mode = "debug"
		}

		if config.Application.Loglevel == "" {
			config.Application.Loglevel = "info"
		}

		if config.Application.Cors == "" {
			config.Application.Cors = "direct"
		}

		if config.Server.Port == 0 {
			config.Server.Port = 8080
		}
		if config.Media.Path == "" {
			config.Media.Path = os.Getenv("GO2MUSIC_MEDIAPATH")
			if config.Media.Syncfrequency == "" {
				config.Media.Path = "${home}/Music"
			}
		}
		if config.Media.Syncfrequency == "" {
			config.Media.Syncfrequency = "30m"
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
			config.Database.Schema = os.Getenv("GO2MUSIC_DBSCHEMA")
			if config.Database.Schema == "" {
				config.Database.Schema = "go2music"
			}
			config.Database.Url = os.Getenv("GO2MUSIC_DBURL")
			if config.Database.Url == "" {
				//dburl = "tcp(newmedia:3307)/go2music"
				config.Database.Url = "tcp(localhost:3306)"
			}
			config.Database.Type = os.Getenv("GO2MUSIC_DBTYPE")
		}
		configLoaded = true
		log.Infof("Database parameters: %v", config.Database)
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

func ChangeConfiguration(config *model.Config) (*model.Config, error) {
	newConfig := Configuration(true)

	if config.Application.Cors != "" {
		newConfig.Application.Cors = config.Application.Cors
	}
	if config.Application.Mode != "" {
		newConfig.Application.Mode = config.Application.Mode
	}
	if config.Application.Cors != "" {
		newConfig.Application.Cors = config.Application.Cors
	}
	if config.Application.Loglevel != "" {
		newConfig.Application.Loglevel = config.Application.Loglevel
	}
	if config.Server.Port != 0 {
		newConfig.Server.Port = config.Server.Port
	}
	if config.Media.Path != "" {
		newConfig.Media.Path = config.Media.Path
	}
	if config.Media.Syncfrequency != "" {
		newConfig.Media.Syncfrequency = config.Media.Syncfrequency
	}
	newConfig.Media.SyncAtStart = config.Media.SyncAtStart
	if config.Database.Type != "" {
		newConfig.Database.Type = config.Database.Type
	}
	if config.Database.Schema != "" {
		newConfig.Database.Schema = config.Database.Schema
	}
	if config.Database.Username != "" {
		newConfig.Database.Username = config.Database.Username
	}
	if config.Database.Password != "" {
		newConfig.Database.Password = config.Database.Password
	}
	if config.Database.Url != "" {
		newConfig.Database.Url = config.Database.Url
	}

	b, err := yaml.Marshal(newConfig)
	if err != nil {
		return nil, err
	}
	err = ioutil.WriteFile(ConfigFile, b, 0777)
	if err != nil {
		return nil, err
	}
	log.Infof("Config written to %s. Need to restart service.", ConfigFile)
	return newConfig, nil
}
