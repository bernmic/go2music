import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {PlayerComponent} from "./player.component";
import {PlayerService} from "./player.service";
import {
  MatButtonModule,
  MatCardModule, MatDividerModule, MatIconModule,
  MatProgressBarModule,
  MatSliderModule,
  MatSnackBarModule
} from "@angular/material";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatProgressBarModule,
    MatSliderModule,
    MatSnackBarModule
  ],
  declarations: [
    PlayerComponent
  ],
  exports: [
    PlayerComponent
  ],
  providers: [
    PlayerService
  ]
})

export class PlayerModule {}
