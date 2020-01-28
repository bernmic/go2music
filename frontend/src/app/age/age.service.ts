import {BaseService} from "../shared/base.service";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {NameCount} from "../shared/namecount.model";

@Injectable()
export class AgeService extends BaseService{

  constructor(private http: HttpClient) {
    super();
  }

  getDecades(): Observable<NameCount[]> {
    return this.http.get<NameCount[]>(environment.restserver + "/api/info/decades");
  }

  getYears(decade: string): Observable<NameCount[]> {
    return this.http.get<NameCount[]>(environment.restserver + "/api/info/decades/" + decade);
  }
}
