import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login.component";
import {FormsModule} from "@angular/forms";
import {MatCardModule, MatFormFieldModule, MatInputModule} from "@angular/material";
import {AuthService} from "./auth.service";
import {AuthGuardService} from "./auth-guard.service";
import {TokenInterceptor} from "./token.interceptor";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})

export class SecurityModule {}
