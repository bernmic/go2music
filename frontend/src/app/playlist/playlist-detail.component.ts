import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlaylistService } from "./playlist.service";
import { Playlist } from "./playlist.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent implements OnInit {
  playlist: Playlist;

  @ViewChild('name', { static: true }) nameInput: ElementRef;
  @ViewChild('query') queryInput: ElementRef;

  KIND_QUERY = "query";
  KIND_EMPTY = "empty";

  kind = this.KIND_QUERY;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private playlistService: PlaylistService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id') === null || params.get('id') === "new") {
        this.playlist = new Playlist("", "", "");
        return;
      }
      this.playlistService.getPlaylist(params.get('id')).subscribe((playlist: Playlist) => {
        this.playlist = playlist;
        this.nameInput.nativeElement.value = this.playlist.name;
        if (this.queryInput !== null && this.queryInput !== undefined) {
          this.queryInput.nativeElement.value = this.playlist.query;
          this.kind = this.KIND_QUERY;
        } else {
          this.kind = this.KIND_EMPTY;
        }
      });
    });
  }

  save() {
    this.playlist.name = this.nameInput.nativeElement.value;
    if (this.queryInput !== null && this.queryInput !== undefined) {
      this.playlist.query = this.queryInput.nativeElement.value;
    }
    this.playlistService.savePlaylist(this.playlist).subscribe(() => {
      this.router.navigate(["/playlist"]);
    });
  }

  isNew(): boolean {
    if (this.playlist !== null && this.playlist !== undefined) {
      if (this.playlist.playlistId === "" || this.playlist.playlistId === null) {
        return true;
      }
    }
    return false;
  }

  queryAdd(s: string) {
    this.queryInput.nativeElement.value = this.queryInput.nativeElement.value + s;
    this.queryInput.nativeElement.focus();
  }
}
