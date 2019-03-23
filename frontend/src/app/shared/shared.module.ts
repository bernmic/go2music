import {NgModule} from "@angular/core";
import {DurationPipe} from "./duration.pipe";
import {UnixdatePipe} from "./unixdate.pipe";

@NgModule({
  imports: [],
  declarations: [
    DurationPipe,
    UnixdatePipe
  ],
  exports: [
    DurationPipe,
    UnixdatePipe
  ]
})

export class SharedModule {}
