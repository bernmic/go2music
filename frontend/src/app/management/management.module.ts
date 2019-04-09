import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {ManagementComponent} from "./management.component";
import {ManagementService} from "./management.service";
import {MatButtonModule, MatExpansionModule, MatIconModule, MatListModule, MatSnackBarModule} from "@angular/material";

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
