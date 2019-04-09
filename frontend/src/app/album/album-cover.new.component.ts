import {Component, Input, OnInit} from '@angular/core';
import {Album} from "./album.model";
import {AlbumService} from "./album.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-album-cover-new',
  templateUrl: './album-cover-new.component.html',
  styleUrls: ['./album-cover-new.component.scss']
})
export class AlbumCoverNewComponent implements OnInit{
  @Input() album: Album;
  cover: any;

  constructor(private albumService: AlbumService, private router: Router) {}

  ngOnInit() {
    this.albumService.getCover(this.album).subscribe(
      (res: any) => { this.cover = res; },
      error => {
        this.cover = "/assets/img/defaultAlbum.png";
      }
      )
  }

  gotoAlbum() {
    this.router.navigate(["/song/album/" + this.album.albumId]);
  }
}
