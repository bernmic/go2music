import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Sync} from "./management.model";

@Injectable()
export class ManagementService {
  constructor(
    private http: HttpClient
  ) {}

  getSync(): Observable<Sync> {
    return this.http.get<Sync>(environment.restserver + "/api/admin/sync")
  }
}
