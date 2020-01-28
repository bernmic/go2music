import {Component, OnInit} from '@angular/core';
import {AgeService} from "./age.service";
import {Router} from "@angular/router";
import {NameCount} from "../shared/namecount.model";

@Component({
  selector: 'app-age-decades',
  templateUrl: './age-decades.component.html',
  styleUrls: ['./age-decades.component.scss']
})
export class AgeDecadesComponent implements OnInit {

  decadeMap: Map<string, NameCount[]> = new Map();
  decades: NameCount[];

  constructor(
    private router: Router,
    private ageService: AgeService
  ) {}

  ngOnInit() {
    this.ageService.getDecades().subscribe(decades => this.decades = decades);
  }

  getYears(decade: string) {
    this.ageService.getYears(decade).subscribe(years => this.decadeMap[decade] = years);
  }

  gotoSongs(year: string) {
    this.router.navigate(["/song/age/" + year]);
  }
}
