import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {saveAs} from 'file-saver';

import {PlaylistService} from "./playlist.service";
import {Playlist, PlaylistCollection} from "./playlist.model";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  playlists: Playlist[];

  constructor(private playlistService: PlaylistService, private router: Router) {
  }

  ngOnInit() {
    this.playlistService.getPlaylists().subscribe((playlists: PlaylistCollection) => {
      this.playlists = playlists.playlists;
    });
  }

  delete(playlistId: string) {
    this.playlistService.deletePlaylist(playlistId).subscribe(() => {
      console.log("Playlist deleted")
      this.router.navigate(["/playlist"]);
    });
  }

  xspf(playlistId: string) {
    this.playlistService.exportPlaylistToXSPF(playlistId).subscribe(
      data => {
        saveAs(data, playlistId + ".xspf");
      },
      error => console.error(error)
    );
  }
}
