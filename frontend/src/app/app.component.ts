import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {AuthService} from "./security/auth.service";
import {Observable} from "rxjs/index";
import {PlayerService} from "./player/player.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  theme = 'indigo-pink-light';

  constructor(
    private router: Router,
    private authService: AuthService,
    private playerService: PlayerService,
    private bottomPlayerSheet: MatBottomSheet,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    if (localStorage.getItem("theme") !== null) {
      this.theme = localStorage.getItem("theme");
    }
    this.authService.isLoggedIn.subscribe(b => {
      if (b) {
        this.playerService.loadPlayqueue();
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  currentTheme() {
    return {[this.theme]: true};
  }

  setCurrentTheme(theme: string) {
    this.theme = theme;
    localStorage.setItem("theme", theme);
  }

  goHome() {
    this.router.navigate(["/"])
  }

  gotoConfig() {
    this.router.navigate(["/config"])
  }

  gotoUsermanagement() {
    this.router.navigate(["/user"])
  }

  logout() {
    this.authService.logout()
  }

  isLoggedIn(): Observable<boolean> {
    return this.authService.isLoggedIn;
  }

  isAdmin(): boolean {
    return this.authService.isAdmin()
  }

  username(): string {
    return this.authService.getLoggedInUsername();
  }
}
