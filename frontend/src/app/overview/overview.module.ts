import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {OverviewComponent} from "./overview.component";
import {OverviewService} from "./overview.service";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";

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

export class OverviewModule {
}
