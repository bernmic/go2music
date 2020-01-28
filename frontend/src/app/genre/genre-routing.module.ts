import {RouterModule, Routes} from "@angular/router";
import {AuthGuardService} from "../security/auth-guard.service";
import {NgModule} from "@angular/core";
import {GenreListComponent} from "./genre-list.component";

const genreRoutes: Routes = [
  {path: 'genre', component: GenreListComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [
    RouterModule.forChild(genreRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class GenreRoutingModule {
}
