import {Paging} from "../shared/paging.model";
import {Artist} from "../artist/artist.model";

export class Album {
  constructor(public albumId: string, public title: string, public path: string, public artist?: Artist, public info?: any) {}
}

export class AlbumCollection {
  constructor(public albums: Album[], public paging: Paging, public total: number) {}
}
