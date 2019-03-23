import {RouterModule, Routes} from "@angular/router";
import {AuthGuardService} from "../security/auth-guard.service";
import {NgModule} from "@angular/core";
import {SongListComponent} from "./song-list.component";

const songRoutes: Routes = [
  { path: 'song', component: SongListComponent, canActivate: [AuthGuardService] },
  { path: 'song/:type/:id', component: SongListComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [
    RouterModule.forChild(songRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class SongRoutingModule {}
