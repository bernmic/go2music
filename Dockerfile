FROM golang:alpine as builder
RUN apk update && apk add --no-cache git
COPY . $GOPATH/src/go2music/
WORKDIR $GOPATH/src/go2music/
RUN go get -d -v
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-extldflags "-static"' -o /go/bin/main .
RUN cp -r $GOPATH/src/go2music/assets /go/bin
FROM scratch
ENV GO2MUSIC_CONFIG /config/go2music.yaml
ENV GO2MUSIC_MEDIA /music
COPY --from=builder /go/bin/main /app/
COPY --from=builder /go/bin/assets/ /app/assets/
WORKDIR /app
VOLUME /music /config
CMD ["./main"]
