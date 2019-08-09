import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: "player-dialog",
  templateUrl: "player.dialog.html",
  styleUrls: ["player.dialog.scss"]
})
export class PlayerDialog {

  constructor(public dialogRef: MatDialogRef<PlayerDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  onCloseClicked(): void {
    this.dialogRef.close();
  }
}
