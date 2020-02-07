import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Howl} from "howler";
import {isNullOrUndefined} from "util";
import {Subscription} from "rxjs";
import {MatSlider} from "@angular/material/slider";
import {MatSnackBar} from "@angular/material/snack-bar";

import {Song} from "../song/song.model";
import {PlayerService} from "./player.service";
import {PlayerDialog} from "./player.dialog";
import { MatDialog } from "@angular/material/dialog";
import {TextinputDialogComponent} from "../shared/textinput-dialog.component";
import {YesnoAlertComponent} from "../shared/yesno-alert.component";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit {
  audio: Howl;
  volume = 100;
  position = 0;
  progress = 0;
  songPlaySubscription: Subscription;
  hoverPosition = 0;

  @Output() newSongLoaded: EventEmitter<Song> = new EventEmitter();

  @ViewChild("volumeCtrl", { static: true })
  volumeControl: MatSlider;

  constructor(
    private playerService: PlayerService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.songPlaySubscription = this.playerService.play$.subscribe(song => {
      this.playSong(song);
      this.openSnackBar(`Now playing ${song.title} from ${song.artist.name}`, "Show");
    });
  }

  ngAfterViewInit(): void {
    this.volumeControl.input.subscribe(event => {
      this.volumeChanged(event.value);
    });
  }

  ngOnDestroy(): void {
    this.songPlaySubscription.unsubscribe();
    this.volumeControl.input.unsubscribe();
  }

  isCurrentSong(song: Song): boolean {
    return this.playerService.currentSong === song;
  }

  playerReady(): boolean {
    return !isNullOrUndefined(this.audio);
  }

  play() {
    this.audio.play();
  }

  pause() {
    if (this.audio.playing()) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
  }

  stop() {
    this.audio.stop();
    this.playerService.currentSong = null;
  }

  next() {
    this.playerService.nextSong();
  }

  previous() {
    this.playerService.previousSong();
  }

  openFullscreen(): void {
    let dialogRef = this.dialog.open(PlayerDialog, {
      width: '100vh',
      height:  '100vh',
      maxWidth: '100vh',
      maxHeight: '100vh',
      hasBackdrop: false
    });
  }

  cover(): string {
    if (isNullOrUndefined(this.playerService.currentSong)) {
      return "../assets/img/defaultAlbum.png";
    }
    return this.playerService.songCoverUrl(this.playerService.currentSong);
  }

  volumeChanged(volume) {
    this.volume = volume;
    if (!isNullOrUndefined(this.audio)) {
      this.audio.volume(this.volume / 100);
    }
  }

  canPlay(): boolean {
    return !isNullOrUndefined(this.playerService.currentSong);
  }

  isPlaying(): boolean {
    return !isNullOrUndefined(this.audio) && this.audio.playing();
  }

  isPaused(): boolean {
    return !isNullOrUndefined(this.audio) && !this.audio.playing() && this.position !== 0;
  }

  playSong(song: Song) {
    this.playerService.currentSong = song;
    if (!isNullOrUndefined(this.audio)) {
      this.audio.unload();
    }
    this.audio = new Howl({
      src: this.playerService.songStreamUrl(song),
      format: "mp3",
      volume: this.volume / 100,
      onend: soundId => this.next()
    });
    this.audio.play();
    setInterval(() => {
      const pos = this.audio.seek();
      this.position = (pos instanceof Howl) ? 0 : Math.round(pos);
      this.progress = (pos instanceof Howl) ? 0 : Math.round(pos * 100.0 / this.audio.duration());
    }, 1000);

    this.audio.on('load', (id) => {
      this.newSongLoaded.emit(song);
    });
  }

  seek(event) {
    const newPosition = this.calculateSongPosition(event.offsetX, event.srcElement.clientWidth.toFixed(0));
    this.audio.seek(newPosition);
  }

  setHoverPosition(event): void {
    this.hoverPosition = this.calculateSongPosition(event.offsetX, event.srcElement.clientWidth.toFixed(0));
  }

  currentSong(): Song {
    return this.playerService.currentSong;
  }

  createPlaylist() {
    const dialogRef = this.dialog.open(TextinputDialogComponent, {
      width: '400px',
      data: {title: "Create playlist from queue", prompt: "Enter playlist name", input: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!isNullOrUndefined(result) && result != "") {
        this.playerService.createPlaylist(result);
      }
    });
  }

  clearQueue() {
    const dialogRef = this.dialog.open(YesnoAlertComponent, {
      width: '400px',
      data: {title: "Empty play queue", prompt: "Are you sure?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.playerService.clearQueue();
      }
    });
  }

  private calculateSongPosition(position: number, size: number): number {
    if (this.canPlay()) {
      return Math.round(this.playerService.currentSong.duration * position / size);
    }
    return 0;
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
