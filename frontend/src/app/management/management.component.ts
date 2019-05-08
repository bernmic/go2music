import {Component, OnInit} from "@angular/core";
import {ManagementService} from "./management.service";
import {Sync} from "./management.model";
import {MatSnackBar} from "@angular/material";
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  sync: Sync;

  constructor(
    private managementService: ManagementService,
    public snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.managementService.getSync().subscribe(s => this.sync = s)
  }

  removeDanglingSong(id: string) {
    console.log("Remove song " + id);
    this.managementService.removeDanglingSong(id).subscribe(s => {
      this.sync = s;
      this.openSnackBar(`Removed dangling song`, "Show");
    });
  }

  removeAllDanglingSongs() {
    console.log("Remove all dangling songs");
    this.managementService.deleteSync().subscribe(s => {
      this.sync = s;
      this.openSnackBar(`Removed all dangling songs`, "Show");
    });
  }

  removeAllEmptyAlbums() {
    console.log("Remove all empty albums");
    this.managementService.removeEmptyAlbums().subscribe(s => {
      this.sync = s;
      this.openSnackBar(`Removed all empty albums`, "Show");
    });
  }

  startSync() {
    this.managementService.startSync().subscribe(s => {
      this.sync = s;
      this.openSnackBar(`Syncronize started`, "Show");
    });
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  emptyAlbumsCount(): number {
    if (isNullOrUndefined(this.sync) || isNullOrUndefined(this.sync.empty_albums)) {
      return 0;
    }
    return Object.keys(this.sync.empty_albums).length;
  }

  albumsWithoutTitleCount(): number {
    if (isNullOrUndefined(this.sync) || isNullOrUndefined(this.sync.albums_without_title)) {
      return 0;
    }
    return Object.keys(this.sync.albums_without_title).length;
  }

  artistsWithoutNameCount(): number {
    if (isNullOrUndefined(this.sync) || isNullOrUndefined(this.sync.artists_without_name)) {
      return 0;
    }
    return Object.keys(this.sync.artists_without_name).length;
  }

  renameAlbum(id: string) {
    console.log("Rename album " + id);
    this.managementService.renameAlbum(id).subscribe(s => {
      this.sync = s;
      this.openSnackBar(`Album renamed`, "Show");
    });
  }

}
