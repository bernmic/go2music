import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreListComponent } from './genre-list.component';
import {GenreService} from "./genre.service";
import {SharedModule} from "../shared/shared.module";
import {MatListModule} from "@angular/material/list";



@NgModule({
  declarations: [GenreListComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatListModule
  ],
  exports: [
    GenreListComponent
  ],
  providers: [
    GenreService
  ]
})
export class GenreModule { }
