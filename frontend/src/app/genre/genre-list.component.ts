import { Component, OnInit } from '@angular/core';
import {GenreService} from "./genre.service";
import {NameCount} from "../shared/namecount.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit {

  genres: NameCount[];

  constructor(
    private router: Router,
    private genreService: GenreService
  ) { }

  ngOnInit() {
    this.genreService.getGenres().subscribe(genres => this.genres = genres);
  }

  gotoSongs(genre: string) {
    this.router.navigate(["/song/genre/" + genre]);
  }
}
