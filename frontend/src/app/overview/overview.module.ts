import {NgModule} from "@angular/core";
import {OverviewComponent} from "./overview.component";
import {OverviewService} from "./overview.service";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {MatCardModule, MatGridListModule, MatListModule} from "@angular/material";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    MatCardModule,
    MatGridListModule,
    MatListModule
  ],
  declarations: [
    OverviewComponent
  ],
  exports: [OverviewComponent],
  providers: [
    OverviewService
  ]
})

export class OverviewModule {}
