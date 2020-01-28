import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {AgeDecadesComponent} from './age-decades.component';
import {AgeService} from "./age.service";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    AgeDecadesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    MatExpansionModule,
    MatListModule,
    SharedModule
  ],
  exports: [
    AgeDecadesComponent
  ],
  providers: [
    AgeService
  ]
})
export class AgeModule {
}
