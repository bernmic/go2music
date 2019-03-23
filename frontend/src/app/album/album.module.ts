import {NgModule} from "@angular/core";
import {AlbumCoverComponent} from "./album-cover.component";
import {AlbumCoverNewComponent} from "./album-cover.new.component";
import {AlbumListComponent} from "./album-list.component";
import {AlbumListNewComponent} from "./album-list-new.component";
import {AlbumService} from "./album.service";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule, MatInputModule,
  MatPaginatorModule,
  MatTooltipModule
} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  declarations: [
    AlbumCoverComponent,
    AlbumCoverNewComponent,
    AlbumListComponent,
    AlbumListNewComponent
  ],
  exports: [
    AlbumListComponent,
    AlbumListNewComponent
  ],
  providers: [
    AlbumService
  ]
})

export class AlbumModule {}
