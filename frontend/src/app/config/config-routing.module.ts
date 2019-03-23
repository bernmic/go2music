import {RouterModule, Routes} from "@angular/router";
import {AuthGuardService} from "../security/auth-guard.service";
import {NgModule} from "@angular/core";
import {ConfigComponent} from "./config.component";

const configRoutes: Routes = [
  { path: 'config', component: ConfigComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [
    RouterModule.forChild(configRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class ConfigRoutingModule {}
