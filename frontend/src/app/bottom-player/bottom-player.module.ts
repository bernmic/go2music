import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BottomPlayerComponent} from "./bottom-player.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatBottomSheetModule, MatCardModule, MatIconModule, MatListModule} from "@angular/material";

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
export class BottomPlayerModule {}
