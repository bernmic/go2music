import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export class AuthService {
  private AUTH = "go2music_auth";
  private auth: Auth = JSON.parse(localStorage.getItem(this.AUTH));

  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: string = null;

  constructor(private router: Router, private http: HttpClient) {
    if (this.auth) {
      console.log("Found auth for user " + this.auth.username + ". Reusing this.");
      this.token = this.auth.token;
      this.loggedIn.next(true);
    }
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  isAdmin() {
    if (this.isNullOrUndefined(this.auth)) {
      return false;
    }
    return this.auth.isAdmin;
  }

  getToken() {
    return this.token;
  }

  getLoggedInUsername(): string {
    if (!this.isNullOrUndefined(this.auth)) {
      return this.auth.username;
    }
    return "";
  }

  login(username: string, password: string) {
    if (username !== '' && password !== '') {
      let headers = new HttpHeaders();
      headers = headers.append("Authorization", "Basic " + btoa(username + ":" + password));
      // headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
      this.http.get(environment.restserver + "/token", { headers: headers }).subscribe(response => {
        this.token = response['token'];
        this.auth = new Auth(response['token'], username, response['role'] === "admin");
        console.log("Successfully logged in with token " + this.token);
        this.loggedIn.next(true);
        localStorage.setItem(this.AUTH, JSON.stringify(this.auth));
        this.router.navigate(['/']);
      }, error => {
        console.log("Got an error while logging in");
        this.loggedIn.next(false);
      });
    }
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    this.auth = null;
    localStorage.removeItem(this.AUTH);
    this.router.navigate(['/login']);
  }

  // for debugging
  clearToken(): void {
    this.token = null;
  }

  private isNullOrUndefined(o: any): boolean {
    return o === null || o === undefined;
  }
}

export class Auth {
  constructor(public token: string, public username: string, public isAdmin: boolean) { }
}
