import {Component} from "@angular/core";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'bottom-player',
  templateUrl: './bottom-player.component.html',
  styleUrls: ['./bottom-player.component.scss']
})
export class BottomPlayerComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomPlayerComponent>) {}
}
