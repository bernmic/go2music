import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {PlayerComponent} from "./player.component";
import {PlayerService} from "./player.service";
import {SharedModule} from "../shared/shared.module";
import {PlayQueueComponent} from "./play-queue.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSliderModule} from "@angular/material/slider";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {PlayerDialog} from "./player.dialog";

@NgModule({
  imports: [
    BrowserModule,
    DragDropModule,
    SharedModule,
    FlexLayoutModule,
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
    PlayQueueComponent,
    PlayerDialog
  ],
  exports: [
    PlayerComponent
  ],
  providers: [
    PlayerService
  ],
  entryComponents: [
    PlayerDialog
  ]
})

export class PlayerModule {
}
