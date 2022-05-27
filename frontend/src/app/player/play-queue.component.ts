import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {PlayerService} from "./player.service";
import {Song} from "../song/song.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-play-queue',
  templateUrl: './play-queue.component.html',
  styleUrls: ['./play-queue.component.scss']
})
export class PlayQueueComponent implements OnInit, OnDestroy {
  songs: Song[];
  songListSubscription: Subscription;

  constructor(
    private router: Router,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.songListSubscription = this.playerService.listchange$.subscribe(songs => {
      this.songs = songs;
    });
    this.playerService.loadPlayqueue();
  }

  ngOnDestroy(): void {
    this.songListSubscription.unsubscribe();
  }

  playSong(song: Song) {
    this.playerService.playSong(song);
  }

  isCurrentSong(song: Song): boolean {
    return this.playerService.currentSong === song;
  }

  playIndex(i: number) {
    this.playerService.playSongByIndex(i);
  }

  deleteIndex(i: number) {
    this.playerService.removeSongByIndex(i);
  }

  albumIndex(i: number) {
    console.log(this.songs[i].album)
    if (i < this.songs.length && this.songs[i].album) {
      this.router.navigate(["/song/album/" + this.songs[i].album.albumId]);
    }
  }

  hasAlbum(i: number): boolean {
    if (i < this.songs.length && this.songs[i] && this.songs[i].album.title) {
      return true
    }
    return false
  }

  artistIndex(i: number) {
    if (i < this.songs.length && this.songs[i].artist) {
      this.router.navigate(["/song/artist/" + this.songs[i].artist.artistId]);
    }
  }

  hasArtist(i: number): boolean {
    if (i < this.songs.length && this.songs[i] && this.songs[i].artist.name) {
      return true
    }
    return false
  }
}
