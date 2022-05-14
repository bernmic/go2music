package tagging

import (
	"fmt"
	"strings"

	"github.com/go-flac/flacpicture"
	"github.com/go-flac/flacvorbis"
	"github.com/go-flac/go-flac"
)

func (m *Media) ParseFlac(file string) (*TaggingSong, error) {
	vc, pic, si := extractFLACComment(file)
	//fmt.Printf("%v, %d", vc, pic)
	s := TaggingSong{File: file[len(m.MediaPath)+1:], Type: "flac"}
	for _, p := range vc.Comments {
		kv := strings.Split(p, "=")
		if len(kv) == 2 {
			key := strings.ToLower(kv[0])
			switch key {
			case "title":
				s.Title = kv[1]
			case "artist":
				s.Artist = kv[1]
			case "album":
				s.Album = kv[1]
			case "albumartist":
				s.AlbumArtist = kv[1]
			case "date":
				s.Year = kv[1]
			case "copyright":
				s.Copyright = kv[1]
			case "composer":
				s.Composer = kv[1]
			case "organization":
				s.Publisher = kv[1]
			case "genre":
				s.Genre = kv[1]
			case "tracknumber":
				s.Track = kv[1]
			case "comment":
				s.Comments = append(s.Comments, kv[1])
			case "language":
				s.Language = kv[1]
			default:
				//fmt.Println(p)
			}
		}
	}

	s.Length = fmt.Sprintf("%d", si.SampleCount*1000/int64(si.SampleRate))

	if pic != nil {
		s.Cover = Cover{
			Mimetype: pic.MIME,
			Data:     pic.ImageData,
		}
	}

	return &s, nil
}

func extractFLACComment(fileName string) (*flacvorbis.MetaDataBlockVorbisComment, *flacpicture.MetadataBlockPicture, *flac.StreamInfoBlock) {
	f, err := flac.ParseFile(fileName)
	if err != nil {
		panic(err)
	}

	var cmt *flacvorbis.MetaDataBlockVorbisComment
	for _, meta := range f.Meta {
		if meta.Type == flac.VorbisComment {
			cmt, err = flacvorbis.ParseFromMetaDataBlock(*meta)
			if err != nil {
				panic(err)
			}
		}
	}
	var pic *flacpicture.MetadataBlockPicture
	for _, meta := range f.Meta {
		if meta.Type == flac.Picture {
			pic, err = flacpicture.ParseFromMetaDataBlock(*meta)
			if err != nil {
				panic(err)
			}
		}
	}

	streamInfo, err := f.GetStreamInfo()
	return cmt, pic, streamInfo
}
