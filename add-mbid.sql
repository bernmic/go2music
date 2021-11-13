ALTER TABLE album ADD mbid VARCHAR(36);
CREATE INDEX album_mbid ON album(mbid);

ALTER TABLE artist ADD mbid VARCHAR(36);
CREATE INDEX artist_mbid ON artist(mbid);

ALTER TABLE song ADD mbid VARCHAR(36);
CREATE INDEX song_mbid ON song(mbid);
