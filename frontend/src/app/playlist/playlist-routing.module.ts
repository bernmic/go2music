import {RouterModule, Routes} from "@angular/router";
import {AuthGuardService} from "../security/auth-guard.service";
import {NgModule} from "@angular/core";
import {PlaylistComponent} from "./playlist.component";
import {PlaylistDetailComponent} from "./playlist-detail.component";

const playlistRoutes: Routes = [
  { path: 'playlist', component: PlaylistComponent, canActivate: [AuthGuardService] },
  { path: 'playlist/:id', component: PlaylistDetailComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [
    RouterModule.forChild(playlistRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class PlaylistRoutingModule {}
