FROM golang:alpine as builder
RUN apk update && apk add --no-cache git
COPY . $GOPATH/src/go2music/
WORKDIR $GOPATH/src/go2music/
RUN go get -d -v
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-extldflags "-static"' -o /go/bin/main .
FROM scratch
ENV GO2MUSIC_CONFIG /app/go2music.yaml
ENV GO2MUSIC_MEDIA /data
COPY --from=builder /go/bin/main /app/
COPY --from=builder $GOPATH/src/go2music/assets /app/
COPY --from=builder $GOPATH/src/go2music/static /app/
WORKDIR /app
CMD ["./main"]
