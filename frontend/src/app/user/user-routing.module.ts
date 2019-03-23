import {RouterModule, Routes} from "@angular/router";
import {AuthGuardService} from "../security/auth-guard.service";
import {NgModule} from "@angular/core";
import {UserListComponent} from "./user-list.component";
import {UserDetailComponent} from "./user-detail.component";

const userRoutes: Routes = [
  { path: 'user', component: UserListComponent, canActivate: [AuthGuardService] },
  { path: 'user/:id', component: UserDetailComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class UserRoutingModule {}
