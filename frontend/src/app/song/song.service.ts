import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Song, SongCollection } from "./song.model";
import { Observable } from "rxjs/index";
import { Paging } from "../shared/paging.model";
import { BaseService } from "../shared/base.service";

@Injectable()
export class SongService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getSongs(uri: string, filter: string, paging?: Paging): Observable<SongCollection> {
    let parameter = this.getPagingForUrl(paging);
    if (filter !== null && filter !== undefined && filter !== "") {
      if (parameter === "") {
        parameter = "?filter=" + filter;
      } else {
        parameter += "&filter=" + filter;
      }
    }
    return this.http.get<SongCollection>(environment.restserver + uri + parameter);
  }

  getAllSongs(filter: string, paging?: Paging): Observable<SongCollection> {
    let parameter = this.getPagingForUrl(paging);
    if (filter !== null && filter !== undefined && filter !== "") {
      if (parameter === "") {
        parameter = "?filter=" + filter;
      } else {
        parameter += "&filter=" + filter;
      }
    }
    return this.http.get<SongCollection>(environment.restserver + "/api/song" + parameter);
  }

  getAllSongsOfAlbum(id: string, paging?: Paging): Observable<SongCollection> {
    return this.http.get<SongCollection>(environment.restserver + "/api/album/" + id + "/songs" + this.getPagingForUrl(paging));
  }

  getAllSongsOfArtist(id: string, paging?: Paging): Observable<SongCollection> {
    return this.http.get<SongCollection>(environment.restserver + "/api/artist/" + id + "/songs" + this.getPagingForUrl(paging));
  }

  getAllSongsOfPlaylist(id: string, paging?: Paging): Observable<SongCollection> {
    return this.http.get<SongCollection>(environment.restserver + "/api/playlist/" + id + "/songs" + this.getPagingForUrl(paging));
  }

  getAllSongsOfYear(id: string, paging?: Paging): Observable<SongCollection> {
    return this.http.get<SongCollection>(environment.restserver + "/api/info/year/" + id + "/songs" + this.getPagingForUrl(paging));
  }

  getAllSongsOfGenre(id: string, paging?: Paging): Observable<SongCollection> {
    return this.http.get<SongCollection>(environment.restserver + "/api/info/genres/" + id + "/songs" + this.getPagingForUrl(paging));
  }

  getSong(id: string): Observable<Song> {
    return this.http.get<Song>(environment.restserver + "/api/song/" + id);
  }

  downloadAlbum(albumId: string) {
    return this.http.get(environment.restserver + "/api/album/" + albumId + "/download", { responseType: "blob" });
  }

  downloadPlaylist(playlistId: string) {
    return this.http.get(environment.restserver + "/api/playlist/" + playlistId + "/download", { responseType: "blob" });
  }
}
