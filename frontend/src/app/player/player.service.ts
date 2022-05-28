import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Song } from "../song/song.model";
import { environment } from "../../environments/environment";
import { AuthService } from "../security/auth.service";
import { PlaylistService } from "../playlist/playlist.service";
import { Playlist } from "../playlist/playlist.model";

@Injectable()
export class PlayerService {
  private playSource: Subject<Song> = new Subject<Song>();
  private listChange: Subject<Song[]> = new Subject<Song[]>();
  play$ = this.playSource.asObservable();
  listchange$ = this.listChange.asObservable();

  currentSong: Song;
  songlist: Song[] = [];

  constructor(private authService: AuthService, private playlistService: PlaylistService) { }

  playSong(song: Song) {
    this.currentSong = song;
    this.playSource.next(song);
  }

  addAndPlaySong(song: Song) {
    let found = this.songlist.find(s => s.songId == song.songId);
    if (found === null || found === undefined) {
      this.addSong(song);
      found = song;
    }
    this.playSong(found);
  }

  addSong(song: Song) {
    this.songlist.push(song);
    this.storePlayqueue();
    this.listChange.next(this.songlist);
  }

  clearQueue() {
    this.songlist = [];
    this.storePlayqueue();
    this.listChange.next(this.songlist);
  }

  createPlaylist(name: string) {
    let pl: Playlist = new Playlist(null, name, null);
    this.playlistService.savePlaylist(pl).subscribe(p => {
      let songIds: string[] = [];
      for (let song of this.songlist) {
        songIds.push(song.songId);
      }
      this.playlistService.addSongsToPlaylist(p.playlistId, songIds).subscribe(() => {
        console.log("Success writing playlist")
      }, error => { console.log("Error writing playlist: " + error) });
    }, error => { console.log("Error creating playlist: " + error) });
  }

  nextSong() {
    if (this.songlist.length > 0) {
      if (this.currentSong === null || this.currentSong === undefined) {
        this.playSong(this.songlist[0]);
      } else {
        const index = this.songlist.indexOf(this.currentSong) + 1;
        if (index < this.songlist.length) {
          this.playSong(this.songlist[index]);
        }
      }
    }
  }

  previousSong() {
    if (this.songlist.length > 0) {
      if (this.currentSong === null || this.currentSong === undefined) {
        this.playSong(this.songlist[0]);
      } else {
        const index = this.songlist.indexOf(this.currentSong) - 1;
        if (index >= 0) {
          this.playSong(this.songlist[index]);
        }
      }
    }
  }

  removeSongByIndex(i: number) {
    if (i < this.songlist.length) {
      this.songlist.splice(i, 1);
      this.storePlayqueue();
      this.listChange.next(this.songlist);
    }
  }

  playSongByIndex(i: number) {
    if (i < this.songlist.length) {
      this.playSong(this.songlist[i]);
    }
  }

  songCoverUrl(song: Song): string {
    return environment.restserver + "/api/song/" + song.songId + "/cover?bearer=" + encodeURIComponent(this.authService.getToken());
  }

  songStreamUrl(song: Song): string {
    return environment.restserver + "/api/song/" + song.songId + "/stream?bearer=" + encodeURIComponent(this.authService.getToken());
  }

  private LOCALSTORAGE_PREFIX = "PLAYQUEUE-";

  storePlayqueue() {
    let username = this.authService.getLoggedInUsername();
    localStorage.setItem(this.LOCALSTORAGE_PREFIX + username, JSON.stringify(this.songlist));
    console.log("Saved currend playqueue");
  }

  loadPlayqueue() {
    console.log("Try to load playqueue");
    let username = this.authService.getLoggedInUsername();
    let s = localStorage.getItem(this.LOCALSTORAGE_PREFIX + username);
    if (s !== null) {
      this.songlist = JSON.parse(s);
      console.log("loaded currend playqueue");
      this.listChange.next(this.songlist);
    }
  }
}
