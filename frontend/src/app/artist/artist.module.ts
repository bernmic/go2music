import {NgModule} from "@angular/core";
import {ArtistListComponent} from "./artist-list.component";
import {ArtistNewListComponent} from "./artist-new-list.component";
import {ArtistService} from "./artist.service";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {ArtistDetailComponent} from "./artist-detail.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    ScrollingModule
  ],
  declarations: [
    ArtistListComponent,
    ArtistNewListComponent,
    ArtistDetailComponent
  ],
  exports: [
    ArtistListComponent,
    ArtistNewListComponent,
    ArtistDetailComponent
  ],
  providers: [
    ArtistService
  ]
})

export class ArtistModule {
}
