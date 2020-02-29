import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpEvent, HttpEventType, HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookPageCreateService {
  id:number;
  private _baseUrl = ' https://samydigital.com/api/admin'
  constructor(private _http: HttpClient) { }

  createTopic(form): Observable<any> {
    return this._http.post<any>(this._baseUrl + '/save-topic', form, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }
  createSubTopic(form): Observable<any> {
    return this._http.post<any>(this._baseUrl + '/save-sub-topic', form, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }

  setData(id) {
    this.id = id
  }

  getData() {
    return this.id;
  }
}
