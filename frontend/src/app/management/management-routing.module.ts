import {RouterModule, Routes} from "@angular/router";
import {OverviewComponent} from "../overview/overview.component";
import {AuthGuardService} from "../security/auth-guard.service";
import {NgModule} from "@angular/core";
import {ManagementComponent} from "./management.component";

const managementRoutes: Routes = [
  { path: 'management', component: ManagementComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [
    RouterModule.forChild(managementRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class ManagementRoutingModule {}
