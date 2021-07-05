package thirdparty

// ARTIST related

type LastfmArtistInfoWrapper struct {
	Artist LastfmArtistInfo `json:"artist,omitempty"`
}
type LastfmArtistInfo struct {
	Name       string                `json:"name,omitempty"`
	Mbid       string                `json:"mbid,omitempty"`
	Url        string                `json:"url,omitempty"`
	Bio        *LastFmBio            `json:"bio,omitempty"`
	Stats      *LastfmStats          `json:"stats,omitempty"`
	Streamable string                `json:"streamable,omitempty"`
	Ontour     int                   `json:"ontour,omitempty"`
	Tags       *LastfmTags           `json:"tags,omitempty"`
	Image      []*LastfmImage        `json:"image,omitempty"`
	Similar    *LastfmSimilarArtists `json:"similar,omitempty"`
}

type LastFmBio struct {
	Published string       `json:"published,omitempty"`
	Summary   string       `json:"summary,omitempty"`
	Content   string       `json:"content,omitempty"`
	Links     *LastfmLinks `json:"links,omitempty"`
}

type LastfmLink struct {
	Rel  string `json:"rel,omitempty"`
	Href string `json:"href,omitempty"`
}

type LastfmLinks struct {
	Link *LastfmLink `json:"link,omitempty"`
}

type LastfmStats struct {
	Listeners int64 `json:"listeners,omitempty"`
	Plays     int64 `json:"plays,omitempty"`
}

type LastfmTags struct {
	Tag []*LastfmTag `json:"tag,omitempty"`
}

type LastfmTag struct {
	Name string `json:"name,omitempty"`
	Url  string `json:"url,omitempty"`
}

type LastfmImage struct {
	Size string `json:"size,omitempty"`
	Url  string `json:"#text,omitempty"`
}

type LastfmSimilarArtists struct {
	Artist []*LastfmArtistInfo `json:"artist,omitempty"`
}

// ALBUM related

type LastfmAlbumInfoWrapper struct {
	Album *LastfmAlbumInfo `json:"album,omitempty"`
}

type LastfmAlbumInfo struct {
	Name      string           `json:"name,omitempty"`
	Artist    string           `json:"artist,omitempty"`
	Mbid      string           `json:"mbid,omitempty"`
	Url       string           `json:"url,omitempty"`
	Tags      *LastfmTags      `json:"tags,omitempty"`
	Listeners string           `json:"listeners,omitempty"`
	Playcount string           `json:"playcount,omitempty"`
	Image     []*LastfmImage   `json:"image,omitempty"`
	Wiki      *LastfmAlbumWiki `json:"wiki,omitempty"`
	Tracks    *LastfmTracks    `json:"tracks,omitempty"`
}

type LastfmAlbumWiki struct {
	Published string `json:"published,omitempty"`
	Summary   string `json:"summary,omitempty"`
	Content   string `json:"content,omitempty"`
}

// TRACK related

type LastfmTracks struct {
	Track []*LastfmTrack `json:"track,omitempty"`
}

type LastfmTrack struct {
	Artist   *LastfmArtistInfo `json:"artist,omitempty"`
	Attr     *LastfmTrackAttr  `json:"@attr,omitempty"`
	Duration int               `json:"duration,omitempty"`
	Name     string            `json:"name,omitempty"`
	Url      string            `json:"url,omitempty"`
	Mbid     string            `json:"mbid,omitempty"`
}

type LastfmTrackAttr struct {
	Rank int `json:"rank,omitempty"`
}
