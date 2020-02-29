import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { savCategoryObject, DropUser } from './all.model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private valueid = "";
  // types:DropUser[];
  private _baseUrl = ' https://samydigital.com/api/admin'
  
  constructor(private http: HttpClient) {
  }
  getAllSubCategory(valueid): Observable<any> {
    return this.http.get<any>(this._baseUrl+'/get-sub-categories?parent_category_id='+valueid);
  }
  saveAllCategory(user): Observable<savCategoryObject> {
    return this.http.post<savCategoryObject>(this._baseUrl+'/save-category', user, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })

    })
  }
  getAllDropDown() {
    return this.http.get<any>(this._baseUrl+'/get-all-categories?type=');
  }
  getAllCategory() {
    return this.http.get<any>(this._baseUrl+'/get-all-categories?type=primary');
  }

  getDropPrimary(): Observable<any> {
    return this.http.get<any>(this._baseUrl+'/get-all-categories?type='+'preschool');
  }
  getDropSecondary(): Observable<any> {
    return this.http.get<any>(this._baseUrl+'/get-all-categories?type=' + 'lower-middle-school');
  }
  getDropHigher(): Observable<any> {
    return this.http.get<any>(this._baseUrl+'/get-all-categories?type=' + 'upprer-middle-school');
  }
  getSecondarySchool(): Observable<any> {
    return this.http.get<any>(this._baseUrl+'/get-all-categories?type=' + 'secondary-school');
  }
  getFriction(): Observable<any> {
    return this.http.get<any>(this._baseUrl+'/get-all-categories?type=' + 'friction');
  }
  getNonFriction(): Observable<any> {
    return this.http.get<any>(this._baseUrl+'/get-all-categories?type='+ 'non-friction');
  }
  getComic(): Observable<any> {
    return this.http.get<any>(this._baseUrl+'/get-all-categories?type=' + 'comic ');
  }
  getEducationReference(): Observable<any> {
    return this.http.get<any>(this._baseUrl+'/get-all-categories?type=' + 'education-&-reference');
  }
  getLiteraryCollections(): Observable<any> {
    return this.http.get<any>(this._baseUrl+'/get-all-categories?type='+ 'literary-collections');
  }
  getNonClassifiable(): Observable<any> {
    return this.http.get<any>(this._baseUrl+'/get-all-categories?type=' + 'non-classifiable');
  }

  getType(type){
    return this.http.get<any>(this._baseUrl+'/get-all-categories?type='+ type);
  }
  deleteCategory(id): Observable<number[]> {
    return this.http.post<number[]>(this._baseUrl+'/delete-category?' +'category_id='+ id, id)

  }
  deleteSubCategory(id): Observable<number[]> {
    return this.http.post<number[]>(this._baseUrl+'/delete-category?' +'category_id='+ id, id)

  }

  getCategoryById(id:number):Observable<any>{
    return this.http.get<any>(this._baseUrl+'category-details?category_id='+id)
 }
  

  updateBook(formData): Observable<any> {
    return this.http.post<any>(this._baseUrl+'update-category', formData, {
      // reportProgress: true,
      // observe: 'events',
    //  headers: new HttpHeaders({ "Accept": "application/json" })
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
     })
  }

}
