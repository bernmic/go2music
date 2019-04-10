package model

type SyncState struct {
	State              string            `json:"state"`
	LastSyncStarted    int64             `json:"last_sync_started"`
	LastSyncDuration   int64             `json:"last_sync_duration"`
	SongsFound         int               `json:"songs_found"`
	NewSongsAdded      int               `json:"new_songs_added"`
	NewSongsProblems   int               `json:"new_songs_problems"`
	DanglingSongsFound int               `json:"dangling_songs_found"`
	ProblemSongs       map[string]string `json:"problem_songs"`
	DanglingSongs      map[string]string `json:"dangling_songs"`
	EmptyAlbums        map[string]string `json:"empty_albums"`
	AlbumsWithoutTitle map[string]string `json:"albums_without_title"`
	ArtistsWithoutName map[string]string `json:"artists_without_name"`
}
