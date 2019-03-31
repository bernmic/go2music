import {Component, OnDestroy, OnInit} from "@angular/core";
import {PlayerService} from "./player.service";
import {Subscription} from "rxjs";
import {Song} from "../song/song.model";

@Component({
  selector: 'app-play-queue',
  templateUrl: './play-queue.component.html',
  styleUrls: ['./play-queue.component.scss']
})
export class PlayQueueComponent implements OnInit, OnDestroy {
  songs: Song[];
  songListSubscription: Subscription;

  constructor(
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
}
