import {RouterModule, Routes} from "@angular/router";
import {AuthGuardService} from "../security/auth-guard.service";
import {NgModule} from "@angular/core";
import {AgeDecadesComponent} from "./age-decades.component";

const ageRoutes: Routes = [
  {path: 'age', component: AgeDecadesComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [
    RouterModule.forChild(ageRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AgeRoutingModule {
}
