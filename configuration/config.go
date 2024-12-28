package configuration

import (
	"flag"
	"fmt"
	"go2music/model"
	"io/ioutil"
	"os"
	"strconv"

	log "github.com/sirupsen/logrus"
	"gopkg.in/yaml.v2"
)

var config model.Config
var configLoaded = false
var secrets = map[string]string{}

// Secret not used at this moment
type Secret string

const (
	SecretsFile    string = "secrets.yaml"
	PasswordSecret Secret = "password"
	TokenSecret    Secret = "token"
)

// ConfigFile is the name of the configuration file
var ConfigFile = "go2music.yaml"

// Configuration returns the actual configuration.
// If not loaded previously or force is requested, it will load / create a configuration.
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

		configdata, err := os.ReadFile(ConfigFile)
		if err == nil {
			err = yaml.Unmarshal([]byte(configdata), &config)
			if err != nil {
				log.Errorf("error unmarshalling config file: %v", err)
			}
		} else {
			log.Warnf("Config file not found. Use default parameters.")
		}

		if config.Application.Mode == "" {
			config.Application.Mode = "release"
		}

		if config.Application.Loglevel == "" {
			config.Application.Loglevel = "info"
		}

		if config.Application.Cors == "" {
			config.Application.Cors = os.Getenv("GO2MUSIC_CORS")
			if config.Application.Cors == "" {
				config.Application.Cors = "direct"
			}
		}

		if config.Application.TokenLifetime == "" {
			config.Application.TokenLifetime = "1h"
		}

		if config.Application.TokenSecret == "" {
			ts := os.Getenv("GO2MUSIC_TOKENSECRET")
			if ts == "" {
				fmt.Println("*********************************")
				fmt.Println("**** TOKEN SECRET IS NOT SET ****")
				fmt.Println("**** USING DEFAULT **************")
				fmt.Println("*********************************")
				ts = "VerySecret"
			}
			config.Application.TokenSecret = ts
		}
		if config.Server.Port == 0 {
			config.Server.Port = 8080
		}
		if config.Media.Path == "" {
			config.Media.Path = os.Getenv("GO2MUSIC_MEDIAPATH")
			if config.Media.Path == "" {
				config.Media.Path = "${home}/Music"
			}
		}
		if config.Media.Syncfrequency == "" {
			config.Media.Syncfrequency = "30m"
			config.Media.SyncAtStart = true
		}
		if config.Tagging.Path == "" {
			config.Tagging.Path = os.Getenv("GO2MUSIC_TAGGINGPATH")
			if config.Tagging.Path == "" {
				config.Tagging.Path = "${home}/Music"
			}
		}
		if config.Metrics.Collect == false {
			s := os.Getenv("GO2MUSIC_METRICS_COLLECT")
			if s != "" {
				b, err := strconv.ParseBool(s)
				if err == nil {
					config.Metrics.Collect = b
				} else {
					log.Warnf("format error in metrics.collect. expecting bool got %s", s)
				}
			}
		}
		if config.Metrics.Port == 0 {
			config.Metrics.Port = 2112
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
		if config.Database.RetryCounter == 0 {
			config.Database.RetryCounter = 1
		}
		if config.Database.RetryDelay == "" {
			config.Database.RetryDelay = "0s"
		}
		configLoaded = true
	}
	return &config
}

// Secrets returns the requested secret
func Secrets(secret Secret) string {
	if len(secrets) == 0 {
		secretData, err := ioutil.ReadFile(SecretsFile)
		if err == nil {
			err = yaml.Unmarshal([]byte(secretData), &config)
			if err != nil {
				log.Errorf("error unmarshalling secrets file: %v", err)
			}
		}
	}
	return ""
}

// ChangeConfiguration writes the given configuration to the config file
func ChangeConfiguration(config *model.Config) (*model.Config, error) {
	newConfig := Configuration(true)

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
