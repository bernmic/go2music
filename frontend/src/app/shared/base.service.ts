import { Paging } from "./paging.model";

export class BaseService {
  getPagingForUrl(paging?: Paging): string {
    let s = "";
    if (paging === null || paging === undefined) {
      return s;
    }
    if (paging.sort !== null && paging.sort !== undefined) {
      s += "sort=" + paging.sort;
      if (paging.dir === null || paging.dir === undefined) {
        s += "&dir=asc";
      } else {
        s += "&dir=" + paging.dir;
      }
    }
    if (paging.size > 0) {
      if (s !== "") {
        s += "&";
      }
      s += "size=" + paging.size;
      if (paging.page > 0) {
        s += "&page=" + paging.page;
      }
    }
    if (s !== "") {
      s = "?" + s;
    }
    return s;
  }
}
