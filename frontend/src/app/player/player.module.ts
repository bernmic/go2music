import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {PlayerComponent} from "./player.component";
import {PlayerService} from "./player.service";
import {
  MatButtonModule,
  MatCardModule, MatDividerModule, MatIconModule, MatListModule, MatMenuModule,
  MatProgressBarModule,
  MatSliderModule,
  MatSnackBarModule
} from "@angular/material";
import {SharedModule} from "../shared/shared.module";
import {PlayQueueComponent} from "./play-queue.component";
import {DragDropModule} from "@angular/cdk/drag-drop";

@NgModule({
  imports: [
    BrowserModule,
    DragDropModule,
    SharedModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSliderModule,
    MatSnackBarModule
  ],
  declarations: [
    PlayerComponent,
    PlayQueueComponent
  ],
  exports: [
    PlayerComponent
  ],
  providers: [
    PlayerService
  ]
})

export class PlayerModule {}
