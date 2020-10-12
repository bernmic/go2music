package database

type DatabaseAccess struct {
	SongManager     SongManager
	AlbumManager    AlbumManager
	ArtistManager   ArtistManager
	PlaylistManager PlaylistManager
	UserManager     UserManager
	InfoManager     InfoManager
}
