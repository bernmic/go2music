import {Component, OnInit} from "@angular/core";
import {AlbumService} from "./album.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Playlist} from "../playlist/playlist.model";
import {Album} from "./album.model";

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {
  albumInfo: any;
  albumId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private albumService: AlbumService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id') === null) {
        return;
      }
      this.albumId = params.get("id");
      this.albumService.getAlbumInfo(params.get('id')).subscribe(ai => {
        this.albumInfo = ai;
        console.log(ai.tags);
      });
    });
  }

  cover(size: string): string {
    let album = new Album(this.albumId, "", "");
    return this.albumService.albumCoverUrl(album);
    if (this.albumInfo !== null && this.albumInfo !== undefined && this.albumInfo.image != null && this.albumInfo.image !== undefined) {
      for (let image of this.albumInfo.image) {
        if (image["size"] === size) {
          return image["#text"];
        }
      }
    }
    return "";
  }
}
