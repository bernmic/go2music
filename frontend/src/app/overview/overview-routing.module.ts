import {RouterModule, Routes} from "@angular/router";
import {AuthGuardService} from "../security/auth-guard.service";
import {NgModule} from "@angular/core";
import {OverviewComponent} from "./overview.component";

const overviewRoutes: Routes = [
  { path: 'overview', component: OverviewComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [
    RouterModule.forChild(overviewRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class OverviewRoutingModule {}
