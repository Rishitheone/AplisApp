import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpEventType, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
   
  private _baseUrl=' https://samydigital.com/api/admin'
  // private _getAllAuthorList = "http://35.173.187.82/aplis/public/api/admin/get-all-authors"
  // private _saveAuthorList = "http://35.173.187.82/aplis/public/api/admin/save-author"
  // private _deleteAuthorList = "http://35.173.187.82/aplis/public/api/admin/delete-author?author_id="
  

  constructor(private _http: HttpClient) { }

  getAllAuthor() {
    return this._http.get<any>(this._baseUrl+'/get-all-authors').pipe(
      catchError(this.handleError)
    );
  }
  getAuthorByid(id:number) {
    return this._http.get<any>(this._baseUrl+'/author-details?author_id='+id).pipe(
      catchError(this.handleError)
    );
  }
 
  deleteAuthor(id) {
    return this._http.post<number[]>(this._baseUrl+'/delete-author?author_id=' + id, id).pipe(
      catchError(this.handleError)
    );
  }
  // updateAuthor(form,id:number){
  //   return this._http.post<any>(this._baseUrl+'/update-author'+id,form) .pipe(
  //     catchError(this.handleError)
  //   );
  // }
  // private _updateAuthor = "http://35.173.187.82/aplis/public/api/admin/update-author"
  updateAuthor(formData): Observable<any> {
    return this._http.post<any>(this._baseUrl+"/update-author", formData, {
      // reportProgress: true,
      // observe: 'events',
    //  headers: new HttpHeaders({ "Accept": "application/json" })
    //   headers: new HttpHeaders({
    //     'Content-type': 'application/json'
    //   })
     }).pipe(
      catchError(this.handleError)
    );
  }
  createAuthor(formData): Observable<any> {
    return this._http.post<any>(this._baseUrl+'/save-author', formData, {
      reportProgress: true,
      observe: 'events',
     // headers: new HttpHeaders({ "Accept": "application/json" })
      // headers: new HttpHeaders({
      //   'Content-type': 'application/json'
      // })
    })
    .pipe(
      map(event => this.getEventMessage(event, formData)),
      catchError(this.handleError)
    );
  }



  private getEventMessage(event: HttpEvent<any>, formData) {

    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
		break;
      case HttpEventType.Response:
        return this.apiResponse(event);
		break;
      default:
        return `File "${formData.get('profile_pic').name}" surprising upload event: ${event.type}.`;
    }
  }

  private fileUploadProgress(event) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    return { status: 'progress', message: percentDone };
  }

  private apiResponse(event) {
    return event.body;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }

}