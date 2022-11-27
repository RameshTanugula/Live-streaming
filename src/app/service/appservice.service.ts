import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:3000/'
  }
  getData(url: any) {
    var mainUrl = this.apiUrl + url
    return this.http.get(mainUrl).pipe(map(res => res));
  }
  postData(url: any, object: any) {
    var mainUrl = this.apiUrl + url
    // object.user_id=3;
    return this.http.post(mainUrl, object).pipe(map(res => res));
  }

}
