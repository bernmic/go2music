import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export class TextinputData {
  constructor(public title: string, public prompt: string, public input: string) {}
}

@Component({
  selector: 'textinput-dialog',
  templateUrl: 'textinput-dialog.component.html',
})
export class TextinputDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TextinputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TextinputData) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
