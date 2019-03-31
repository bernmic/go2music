import {Component, OnInit} from "@angular/core";
import {ManagementService} from "./management.service";
import {Sync} from "./management.model";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  sync: Sync;

  constructor(
    private managementService: ManagementService
  ) {}

  ngOnInit(): void {
    this.managementService.getSync().subscribe(s => this.sync = s)
  }
}
