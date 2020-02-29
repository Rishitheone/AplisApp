import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExploreBrowseService {

  private _baseUrl = 'https://samydigital.com/api/admin'

  constructor(private _http:HttpClient) { }

  uploadExplore(formdata): Observable<any> {
   return this._http.post<any>(this._baseUrl+'/add-discover',formdata,{
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
   });
  }

  getAllDiscover(){
    return this._http.get<any>(this._baseUrl+'/get-all-discovers');
  }
  
  deleteDiscover(id): Observable<number[]> {
    return this._http.post<number[]>(this._baseUrl +'/delete-discover?discover_id='+ id, id)

  }
  getExploreById(id:number):Observable<any>{
    return this._http.get<any>(this._baseUrl+'/discover-details?discover_id='+id)
 }
  updateExplore(formData): Observable<any> {
    return this._http.post<any>(this._baseUrl+'/update-discover', formData, {
      // reportProgress: true,
      // observe: 'events',
    //  headers: new HttpHeaders({ "Accept": "application/json" })
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
     })
  }

  
  }