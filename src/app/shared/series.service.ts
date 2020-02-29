import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { saveSeries, allSeries } from './all.model';
import { FormBuilder, FormControl } from '@angular/forms';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  form: saveSeries;
  private _baseUrl = 'https://samydigital.com/api/admin'

  constructor(private _http: HttpClient, private fb: FormBuilder, ) { }

  saveSeries(form: saveSeries): Observable<saveSeries> {
    return this._http.post<saveSeries>(this._baseUrl+"/save-series", form, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }

  updateSeries(form: saveSeries): Observable<saveSeries[]> {
    return this._http.post<saveSeries[]>(this._baseUrl+'/update-series', form, {
      // headers: new HttpHeaders({
      //   'Content-type': 'application/json'
      // })
    })
  }
  getSeriesById(id:number):Observable<any>{
    return this._http.get<any>(this._baseUrl+'/series-details?book_id='+id)
 }


  getAllSeries(): Observable<allSeries> {
    return this._http.get<allSeries>(this._baseUrl+'/get-all-series');
  }

  deleteSeries(id): Observable<number[]> {
    return this._http.post<number[]>(this._baseUrl+'/delete-series?series_id='+ id, id)
  }
  
}
