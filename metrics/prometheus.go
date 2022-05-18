package metrics

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

var (
	status  map[int]prometheus.Counter
	pages   map[string]prometheus.Counter
	methods *prometheus.CounterVec
	collect bool = false
)

func init() {
	pages = make(map[string]prometheus.Counter, 0)
	status = make(map[int]prometheus.Counter, 0)
	methods = prometheus.NewCounterVec(prometheus.CounterOpts{
		Name: "http_total",
		Help: "The total number of http requests",
	}, []string{"method"})
	prometheus.MustRegister(methods)
}

func PrometheusHandler() gin.HandlerFunc {
	collect = true
	h := promhttp.Handler()

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}

func PrometheusMetricsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		methods.With(prometheus.Labels{"method": c.Request.Method}).Inc()
		c.Next()
		if status[c.Writer.Status()] == nil {
			status[c.Writer.Status()] = promauto.NewCounter(prometheus.CounterOpts{
				Name: fmt.Sprintf("http_%d_total", c.Writer.Status()),
				Help: fmt.Sprintf("The total number of http requests with status %d", c.Writer.Status()),
			})
		}
		status[c.Writer.Status()].Inc()
	}
}

func PageRequest(url string) {
	if collect {
		if pages[url] == nil {
			pages[url] = promauto.NewCounter(prometheus.CounterOpts{
				Name: fmt.Sprintf("page_%s_total", url),
				Help: fmt.Sprintf("The total number of requests for page %s", url),
			})
		}
		pages[url].Inc()
	}
}
