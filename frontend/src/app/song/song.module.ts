import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {SongListComponent} from "./song-list.component";
import {PlaylistSelectDialogComponent} from "./playlist-select-dialog.component";
import {SongService} from "./song.service";
import {SharedModule} from "../shared/shared.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule,
        SharedModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule
    ],
    declarations: [
        SongListComponent,
        PlaylistSelectDialogComponent
    ],
    exports: [
        SongListComponent
    ],
    providers: [
        SongService
    ]
})

export class SongModule {
}
