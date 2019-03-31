import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";

import {AppComponent} from './app.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {AlbumModule} from "./album/album.module";
import {ArtistModule} from "./artist/artist.module";
import {SongModule} from "./song/song.module";
import {SharedModule} from "./shared/shared.module";
import {OverviewModule} from "./overview/overview.module";
import {PlaylistModule} from "./playlist/playlist.module";
import {ConfigModule} from "./config/config.module";
import {UserModule} from "./user/user.module";
import {PlayerModule} from "./player/player.module";
import {SecurityModule} from "./security/security.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {AlbumRoutingModule} from "./album/album-routing.module";
import {ArtistRoutingModule} from "./artist/artist-routing.module";
import {UserRoutingModule} from "./user/user-routing.module";
import {ConfigRoutingModule} from "./config/config-routing.module";
import {SongRoutingModule} from "./song/song-routing.module";
import {OverviewRoutingModule} from "./overview/overview-routing.module";
import {SecurityRoutingModule} from "./security/security-routing.module";
import {PlaylistRoutingModule} from "./playlist/playlist-routing.module";
import {ManagementModule} from "./management/management.module";
import {ManagementRoutingModule} from "./management/management-routing.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AlbumRoutingModule,
    ArtistRoutingModule,
    ConfigRoutingModule,
    ManagementRoutingModule,
    OverviewRoutingModule,
    PlaylistRoutingModule,
    SecurityRoutingModule,
    SongRoutingModule,
    UserRoutingModule,
    AppRoutingModule,
    AlbumModule,
    ArtistModule,
    ConfigModule,
    ManagementModule,
    OverviewModule,
    PlayerModule,
    PlaylistModule,
    SecurityModule,
    SharedModule,
    SongModule,
    UserModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
