package assets

import "net/http"

var FrontendAssets http.FileSystem = http.Dir("assets/frontend")
