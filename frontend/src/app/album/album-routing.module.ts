import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AlbumListComponent} from "./album-list.component";
import {AuthGuardService} from "../security/auth-guard.service";
import {AlbumListNewComponent} from "./album-list-new.component";
import {AlbumDetailComponent} from "./album-detail.component";

const albumRoutes: Routes = [
  { path: 'album', component: AlbumListComponent, canActivate: [AuthGuardService] },
  { path: 'album-new', component: AlbumListNewComponent, canActivate: [AuthGuardService] },
  { path: 'album/:id', component: AlbumDetailComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [
    RouterModule.forChild(albumRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AlbumRoutingModule {}
