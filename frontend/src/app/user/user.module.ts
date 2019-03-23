import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {UserListComponent} from "./user-list.component";
import {UserDetailComponent} from "./user-detail.component";
import {UserService} from "./user.service";
import {
  MatButtonModule, MatCardModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSortModule,
  MatTableModule
} from "@angular/material";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule
  ],
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  exports: [
    UserListComponent
  ],
  providers: [UserService]
})

export class UserModule {}
