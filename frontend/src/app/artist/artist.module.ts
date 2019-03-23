import {NgModule} from "@angular/core";
import {ArtistListComponent} from "./artist-list.component";
import {ArtistNewListComponent} from "./artist-new-list.component";
import {ArtistService} from "./artist.service";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule, MatInputModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSortModule,
  MatTableModule
} from "@angular/material";
import {ScrollingModule} from "@angular/cdk/scrolling";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTableModule,
    ScrollingModule
  ],
  declarations: [
    ArtistListComponent,
    ArtistNewListComponent
  ],
  exports: [
    ArtistListComponent,
    ArtistNewListComponent
  ],
  providers: [
    ArtistService
  ]
})

export class ArtistModule {}
