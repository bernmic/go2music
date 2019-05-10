import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {PlaylistComponent} from "./playlist.component";
import {PlaylistDetailComponent} from "./playlist-detail.component";
import {PlaylistService} from "./playlist.service";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
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

export class PlaylistModule {
}
