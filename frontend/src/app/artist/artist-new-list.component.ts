import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";

import {ArtistService} from "./artist.service";
import {Artist} from "./artist.model";
import {ArtistNewDataSource} from "./artist-new.datasource";

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-new-list.component.html',
  styleUrls: ['./artist-new-list.component.scss']
})
export class ArtistNewListComponent implements OnInit, AfterViewInit {
  dataSource: ArtistNewDataSource;

  @ViewChild(CdkVirtualScrollViewport, { static: true })
  viewport: CdkVirtualScrollViewport;

  constructor(
    private router: Router,
    private artistService: ArtistService
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new ArtistNewDataSource(this.artistService);
  }

  gotoSongs(artist: Artist) {
    this.router.navigate(["/song/artist/" + artist.artistId]);
  }

  ngAfterViewInit(): void {
    this.viewport.setTotalContentSize(20000);
  }
}
