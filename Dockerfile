FROM hypriot/armhf-busybox
MAINTAINER Michael Bernards
RUN mkdir -p /app
WORKDIR /app
RUN mkdir -p /data
COPY go2music /app
COPY static /app/static
COPY docker-data/go2music.yaml /app
CMD /app/go2music
