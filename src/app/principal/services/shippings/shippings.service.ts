import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IUser } from '@principal/models/user';
import { IPost } from '@principal/models/post';

@Injectable({
  providedIn: 'root'
})
export class ShippingsService {
  private url: string;
  private headersJSON: HttpHeaders;

  constructor(
    private _http: HttpClient
  ) {
    this.url = environment.httpUrl;
    this.headersJSON = new HttpHeaders().set('Content-Type', 'application/json');
  }

  sendUser(body: IUser) {
    return this._http.post<{ data: IUser }>(`${this.url}/register`, body, { headers: this.headersJSON });
  }

  sendPost(body: FormData) {
    return this._http.post<{ data: IPost }>(`${this.url}/post`, body);
  }
}
