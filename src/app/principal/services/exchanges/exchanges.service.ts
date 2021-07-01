import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ExchangesService {
  private url: string;
  private headersJSON: HttpHeaders;


  constructor(
    private _http: HttpClient
  ) {
    this.url = environment.httpUrl;
    this.headersJSON = new HttpHeaders().set('Content-Type', 'application/json');
  }

  updateLike(toogle: boolean, post: string, user: string) {
    const body = { toogle, post, user }
    return this._http.put<{ data: { toogle: boolean } }>(`${this.url}/like`, body, { headers: this.headersJSON })
  }
}
