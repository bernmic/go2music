import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export class AlertData {
  constructor(public title: string, public prompt: string) {}
}

@Component({
  selector: 'yesno-alert',
  templateUrl: 'yesno-alert.component.html',
})
export class YesnoAlertComponent {
  constructor(
    public dialogRef: MatDialogRef<YesnoAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertData) {}
}
