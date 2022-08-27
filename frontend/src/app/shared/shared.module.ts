import {NgModule} from "@angular/core";
import {DurationPipe} from "./duration.pipe";
import {UnixdatePipe} from "./unixdate.pipe";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {TextinputDialogComponent} from "./textinput-dialog.component";
import {FormsModule} from "@angular/forms";
import {YesnoAlertComponent} from "./yesno-alert.component";

@NgModule({
    imports: [
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule
    ],
    declarations: [
        DurationPipe,
        UnixdatePipe,
        TextinputDialogComponent,
        YesnoAlertComponent
    ],
    exports: [
        DurationPipe,
        UnixdatePipe,
        TextinputDialogComponent,
        YesnoAlertComponent
    ]
})

export class SharedModule {}
