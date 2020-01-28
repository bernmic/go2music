import { Injectable } from '@angular/core';
import {BaseService} from "../shared/base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NameCount} from "../shared/namecount.model";
import {environment} from "../../environments/environment";

@Injectable()
export class GenreService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getGenres(): Observable<NameCount[]> {
    return this.http.get<NameCount[]>(environment.restserver + "/api/info/genres");
  }
}
