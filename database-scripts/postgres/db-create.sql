drop user if exists go2music;
create user go2music with encrypted password 'go2music';
create schema authorization go2music;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA go2music TO go2music;
GRANT USAGE ON SCHEMA go2music TO go2music;
