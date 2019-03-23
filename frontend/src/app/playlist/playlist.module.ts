import {NgModule} from "@angular/core";
import {importExpr} from "@angular/compiler/src/output/output_ast";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {PlaylistComponent} from "./playlist.component";
import {PlaylistDetailComponent} from "./playlist-detail.component";
import {PlaylistService} from "./playlist.service";
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatListModule
} from "@angular/material";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule
  ],
  declarations: [
    PlaylistComponent,
    PlaylistDetailComponent
  ],
  exports: [
    PlaylistComponent
  ],
  providers: [
    PlaylistService
  ]
})

export class PlaylistModule {}
