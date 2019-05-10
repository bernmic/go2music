import {NgModule} from "@angular/core";
import {AlbumCoverComponent} from "./album-cover.component";
import {AlbumCoverNewComponent} from "./album-cover.new.component";
import {AlbumListComponent} from "./album-list.component";
import {AlbumListNewComponent} from "./album-list-new.component";
import {AlbumService} from "./album.service";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTooltipModule} from "@angular/material/tooltip";

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
