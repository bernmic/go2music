import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";

const securityRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(securityRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class SecurityRoutingModule {}
