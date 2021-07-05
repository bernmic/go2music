import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuardService} from "../security/auth-guard.service";
import {ArtistListComponent} from "./artist-list.component";
import {ArtistNewListComponent} from "./artist-new-list.component";
import {ArtistDetailComponent} from "./artist-detail.component";

const artistRoutes: Routes = [
  { path: 'artist', component: ArtistListComponent, canActivate: [AuthGuardService] },
  { path: 'artist/:id', component: ArtistDetailComponent, canActivate: [AuthGuardService] },
  { path: 'artist-new', component: ArtistNewListComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [
    RouterModule.forChild(artistRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class ArtistRoutingModule {}
