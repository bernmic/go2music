import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {AgeDecadesComponent} from './age-decades.component';
import {AgeService} from "./age.service";
import {MatExpansionModule} from "@angular/material/expansion";


@NgModule({
  declarations: [
    AgeDecadesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    MatExpansionModule
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
