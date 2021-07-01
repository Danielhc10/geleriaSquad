import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { DataPaginated } from '@shared/models/interfaces';
import { IPost } from "../../models/post";


@Injectable({
  providedIn: 'root'
})
export class ArrivalsService {
  private url: string;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = environment.httpUrl;

  }

  getPosts(params: { page?: string, tags?: string[] } = {}) {
    return this._http.get<DataPaginated<IPost>>(`${this.url}/post`, { params });
  }

  getTrendsPosts() {
    return this._http.get<DataPaginated<IPost>>(`${this.url}/post/trends`);
  }

  getLicked(post: string, user: string) {
    const params = { post, user };
    return this._http.get<{ data: { toogle: boolean } }>(`${this.url}/like`, { params })
  }

}

