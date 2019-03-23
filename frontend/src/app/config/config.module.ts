import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
} from "@angular/material";
import {ConfigComponent} from "./config.component";
import {ConfigService} from "./config.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [
    ConfigComponent
  ],
  exports: [
    ConfigComponent
  ],
  providers: [ConfigService]
})

export class ConfigModule {}
