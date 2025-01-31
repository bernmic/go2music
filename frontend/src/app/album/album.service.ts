import { Injectable } from "@angular/core";
import { Observable } from "rxjs/index";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Album, AlbumCollection } from "./album.model";
import { SongService } from "../song/song.service";
import { AuthService } from "../security/auth.service";
import { Paging } from "../shared/paging.model";
import { BaseService } from "../shared/base.service";
import { map } from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable()
export class AlbumService extends BaseService {
  constructor(
    private http: HttpClient,
    private songService: SongService,
    private authService: AuthService,
    private sanitizer: DomSanitizer) {
    super();
  }

  getAllAlbums(filter: string, paging?: Paging): Observable<AlbumCollection> {
    let parameter = this.getPagingForUrl(paging);
    if (filter !== null && filter !== undefined && filter !== "") {
      if (parameter === "") {
        parameter = "?filter=" + filter;
      } else {
        parameter += "&filter=" + filter;
      }
    }
    if (parameter === "") {
      parameter = "?title=notempty";
    } else {
      parameter += "&title=notempty";
    }
    return this.http.get<AlbumCollection>(environment.restserver + "/api/album" + parameter);
  }

  getAlbum(id: string): Observable<Album> {
    return this.http.get<Album>(environment.restserver + "/api/album/" + id);
  }

  getAlbumInfo(id: string): Observable<Album> {
    return this.http.get<any>(environment.restserver + "/api/album/" + id + "/info");
  }

  getCover(album: Album): any {
    return this.http.get(environment.restserver + "/api/album/" + album.albumId + "/cover", {
      responseType: 'blob'
    })
      .pipe(
        map((res: any) => {
          const urlCreator = window.URL;
          return this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(res));
        })
      );
  }

  albumCoverUrl(album: Album): string {
    return environment.restserver + "/api/album/" + album.albumId + "/cover?bearer=" + encodeURIComponent(this.authService.getToken());
  }
}
