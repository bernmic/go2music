FROM hypriot/armhf-busybox
MAINTAINER Michael Bernards
RUN mkdir -p /app
WORKDIR /app
COPY go2music /app
COPY go2music.yaml /app
CMD /app/go2music
