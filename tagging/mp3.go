package tagging

import (
	"github.com/bogem/id3v2/v2"
	log "github.com/sirupsen/logrus"
)

// ParseMP3 gets ID3V2 metadata from a mp3 file
func (m *Media) ParseMP3(f string) (*TaggingSong, error) {
	//log.Printf("Parsing %s\n", f)
	tag, err := id3v2.Open(f, id3v2.Options{Parse: true})
	if err != nil {
		log.Println("Error while opening mp3 file: ", err)
		return nil, err
	}
	defer func() {
		err := tag.Close()
		if err != nil {
			log.Errorf("error closing tag for mp3: %v", err)
		}
	}()

	songData, err := m.mp3Song(tag)
	songData.File = f[len(m.MediaPath)+1:]
	return songData, err
}

func (m *Media) mp3Song(tag *id3v2.Tag) (*TaggingSong, error) {
	var songData TaggingSong
	songData.Type = "mp3"
	songData.Title = tag.Title()
	songData.Artist = tag.Artist()
	songData.Album = tag.Album()
	songData.AlbumArtist = tag.GetTextFrame(tag.CommonID("Band/Orchestra/Accompaniment")).Text
	songData.Year = tag.Year()
	songData.Genre = tag.Genre()
	songData.Track = tag.GetTextFrame(tag.CommonID("Track number/Position in set")).Text
	songData.Length = tag.GetTextFrame(tag.CommonID("Length")).Text
	songData.Composer = tag.GetTextFrame(tag.CommonID("Composer")).Text
	songData.Publisher = tag.GetTextFrame(tag.CommonID("Publisher")).Text
	songData.Copyright = tag.GetTextFrame(tag.CommonID("Copyright message")).Text
	songData.Language = tag.GetTextFrame(tag.CommonID("Language")).Text
	commFrames := tag.GetFrames(tag.CommonID("Comments"))
	for _, f := range commFrames {
		comment, ok := f.(id3v2.CommentFrame)
		if !ok {
			//log.Fatal("Couldn't assert comment frame")
			continue
		}

		// Do something with comment frame.
		// For example, print the text:
		songData.Comments = append(songData.Comments, comment.Text)
	}
	songData.Version = tag.Version()
	pictures := tag.GetFrames(tag.CommonID("Attached picture"))
	for _, f := range pictures {
		pic, ok := f.(id3v2.PictureFrame)
		if !ok {
			log.Println("Couldn't assert picture frame")
			continue
		}

		c := Cover{
			Mimetype: pic.MimeType,
			Data:     pic.Picture,
		}
		songData.Cover = c
	}

	return &songData, nil
}

// SongMP3 writes ID3V2 metadata to a mp3 file
func (m *Media) SongMP3(TaggingSong *TaggingSong, tag *id3v2.Tag) error {
	tag.SetTitle(TaggingSong.Title)
	tag.SetArtist(TaggingSong.Artist)
	tag.SetAlbum(TaggingSong.Album)
	tag.DeleteFrames(tag.CommonID("Band/Orchestra/Accompaniment"))
	tag.AddTextFrame(tag.CommonID("Band/Orchestra/Accompaniment"), tag.DefaultEncoding(), TaggingSong.AlbumArtist)
	tag.SetGenre(TaggingSong.Genre)
	tag.SetYear(TaggingSong.Year)
	tag.DeleteFrames(tag.CommonID("Track number/Position in set"))
	tag.AddTextFrame(tag.CommonID("Track number/Position in set"), tag.DefaultEncoding(), TaggingSong.Track)
	tag.DeleteFrames(tag.CommonID("Composer"))
	tag.AddTextFrame(tag.CommonID("Composer"), tag.DefaultEncoding(), TaggingSong.Composer)
	tag.DeleteFrames(tag.CommonID("Publisher"))
	tag.AddTextFrame(tag.CommonID("Publisher"), tag.DefaultEncoding(), TaggingSong.Publisher)
	tag.DeleteFrames(tag.CommonID("Copyright message"))
	tag.AddTextFrame(tag.CommonID("Copyright message"), tag.DefaultEncoding(), TaggingSong.Copyright)
	tag.DeleteFrames(tag.CommonID("Language"))
	tag.AddTextFrame(tag.CommonID("Language"), tag.DefaultEncoding(), TaggingSong.Language)
	tag.DeleteFrames(tag.CommonID("Comments"))
	for _, c := range TaggingSong.Comments {
		tag.AddCommentFrame(id3v2.CommentFrame{
			Encoding:    id3v2.EncodingUTF8,
			Language:    "eng",
			Description: "",
			Text:        c,
		})
	}
	return nil
}
