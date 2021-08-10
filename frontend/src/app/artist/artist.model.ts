import {Album} from "../album/album.model";
import {Paging} from "../shared/paging.model";

export class Artist {
  constructor(public artistId: string, public name: string, public info: any) {}
}

export class ArtistCollection {
  constructor(public artists: Artist[], public paging: Paging, public total: number) {}
}
