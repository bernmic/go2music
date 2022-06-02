package metrics

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"go2music/database"
)

var (
	requests       *prometheus.CounterVec
	collect        = false
	databaseAccess *database.DatabaseAccess
	statistics     *prometheus.GaugeVec
)

func init() {
	statistics = prometheus.NewGaugeVec(prometheus.GaugeOpts{
		Name: "statistics",
		Help: "statistics about songs, artist, etc",
	}, []string{"value"})
	prometheus.MustRegister(statistics)
	requests = prometheus.NewCounterVec(prometheus.CounterOpts{
		Name: "http_total",
		Help: "The total number of http requests",
	}, []string{"method", "uri", "status"})
	prometheus.MustRegister(requests)
}

func PrometheusHandler(da *database.DatabaseAccess) gin.HandlerFunc {
	collect = true
	databaseAccess = da
	h := promhttp.Handler()

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}

func PrometheusMetricsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()
		m, err := databaseAccess.InfoManager.Info(true)
		if err == nil {
			statistics.With(prometheus.Labels{"value": "songs"}).Set(float64(m.SongCount))
			statistics.With(prometheus.Labels{"value": "artists"}).Set(float64(m.ArtistCount))
			statistics.With(prometheus.Labels{"value": "albums"}).Set(float64(m.AlbumCount))
			statistics.With(prometheus.Labels{"value": "playlists"}).Set(float64(m.PlaylistCount))
			statistics.With(prometheus.Labels{"value": "users"}).Set(float64(m.UserCount))
			statistics.With(prometheus.Labels{"value": "totalLength"}).Set(float64(m.TotalLength))
		}
		requests.With(prometheus.Labels{"method": c.Request.Method, "uri": c.FullPath(), "status": fmt.Sprintf("%d", c.Writer.Status())}).Inc()
	}
}
