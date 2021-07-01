import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

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
}
