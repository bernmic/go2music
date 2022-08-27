import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AgeModule} from "./age/age.module";
import {AgeRoutingModule} from "./age/age-routing.module";
import {GenreRoutingModule} from "./genre/genre-routing.module";
import {GenreModule} from "./genre/genre.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        AgeRoutingModule,
        AlbumRoutingModule,
        ArtistRoutingModule,
        ConfigRoutingModule,
        GenreRoutingModule,
        ManagementRoutingModule,
        OverviewRoutingModule,
        PlaylistRoutingModule,
        SecurityRoutingModule,
        SongRoutingModule,
        UserRoutingModule,
        AppRoutingModule,
        AgeModule,
        AlbumModule,
        ArtistModule,
        ConfigModule,
        GenreModule,
        ManagementModule,
        OverviewModule,
        PlayerModule,
        PlaylistModule,
        SecurityModule,
        SharedModule,
        SongModule,
        UserModule,
        MatBottomSheetModule,
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
