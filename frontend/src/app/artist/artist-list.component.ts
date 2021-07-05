import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

import {ArtistService} from "./artist.service";
import {ArtistDataSource} from "./artist.datasource";
import {Paging} from "../shared/paging.model";
import {Artist} from "./artist.model";

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('input', { static: true }) input: ElementRef;

  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 50];
  total = 0;

  columnDefs = [
    {name: 'id', title: 'ID'},
    {name: 'name', title: 'Name'}
  ];

  dataSource: ArtistDataSource;

  displayedColumns = ['name'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private artistService: ArtistService
  ) {
  }

  ngAfterViewInit(): void {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadArtistsPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadArtistsPage())
      )
      .subscribe();
  }

  ngOnInit(): void {
    if (localStorage.getItem("pageSize")) {
      this.pageSize = +localStorage.getItem("pageSize");
    }
    this.dataSource = new ArtistDataSource(this.artistService);
    this.route.paramMap.subscribe((params) => {
      this.dataSource.loadArtists("", new Paging(0, this.pageSize, "", "asc"));
      this.dataSource.artistTotalSubject.subscribe(total => {
        this.total = total;
      });
    });
  }

  loadArtistsPage() {
    localStorage.setItem("pageSize", "" + this.paginator.pageSize);
    this.dataSource.loadArtists(this.input.nativeElement.value, new Paging(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction));
  }

  getProperty = (obj, path) => (
    path.split('.').reduce((o, p) => o && o[p], obj)
  );

  gotoSongs(artist: Artist) {
    //this.router.navigate(["/song/artist/" + artist.artistId]);
    this.router.navigate(["/artist/" + artist.artistId]);
  }
}
