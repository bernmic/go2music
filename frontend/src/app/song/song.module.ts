import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
  MatSortModule,
  MatTableModule
} from "@angular/material";
import {SongListComponent} from "./song-list.component";
import {PlaylistSelectDialogComponent} from "./playlist-select-dialog.component";
import {SongService} from "./song.service";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule
  ],
  declarations: [
    SongListComponent,
    PlaylistSelectDialogComponent
  ],
  exports: [
    SongListComponent
  ],
  providers: [
    SongService
  ],
  entryComponents: [PlaylistSelectDialogComponent]
})

export class SongModule {}
