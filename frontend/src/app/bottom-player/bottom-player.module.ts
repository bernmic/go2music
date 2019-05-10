import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BottomPlayerComponent} from "./bottom-player.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";

@NgModule({
  imports: [
    BrowserModule,
    FlexLayoutModule,
    MatBottomSheetModule,
    MatCardModule,
    MatIconModule,
    MatListModule
  ],
  declarations: [
    BottomPlayerComponent
  ],
  exports: [
    BottomPlayerComponent
  ],
  providers: []
})
export class BottomPlayerModule {
}
