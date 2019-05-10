import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {ManagementComponent} from "./management.component";
import {ManagementService} from "./management.service";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule
  ],
  declarations: [
    ManagementComponent
  ],
  exports: [
    ManagementComponent
  ],
  providers: [
    ManagementService
  ]
})

export class ManagementModule {
}
