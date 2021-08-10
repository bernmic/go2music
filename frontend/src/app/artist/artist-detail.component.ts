import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ArtistService} from "./artist.service";
import {Artist} from "./artist.model";

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {

  artistInfo: any;
  artistId: string;
  artist: Artist;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private artistService: ArtistService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id') === null) {
        return;
      }
      this.artistId = params.get("id");
      this.artistService.getArtistInfo(params.get('id')).subscribe(a => {
        this.artistInfo = a.info;
        this.artist = a;
        this.artistId = a.artistId;
      });
    });
  }

  cover(size: string): string {
    if (this.artistInfo !== null && this.artistInfo !== undefined && this.artistInfo.image != null && this.artistInfo.image !== undefined) {
      for (let image of this.artistInfo.image) {
        if (image["size"] === size) {
          return image["#text"];
        }
      }
    }
    return "";
  }
}
