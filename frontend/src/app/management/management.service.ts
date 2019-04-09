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

  startSync(): Observable<Sync> {
    return this.http.post<Sync>(environment.restserver + "/api/admin/sync", null);
  }

  deleteSync(): Observable<Sync> {
    return this.http.delete<Sync>(environment.restserver + "/api/admin/sync/dangling")
  }

  removeDanglingSong(id: string): Observable<Sync> {
    return this.http.delete<Sync>(environment.restserver + "/api/admin/sync/dangling/" + id)
  }

  removeEmptyAlbums(): Observable<Sync> {
    return this.http.delete<Sync>(environment.restserver + "/api/admin/sync/emptyalbums")
  }
}
