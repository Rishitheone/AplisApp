import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private _baseUrl = 'https://samydigital.com/api/admin'

  constructor(private _http: HttpClient) { }

  uploadeImage(image): Observable<any> {
    return this._http.post<any>(this._baseUrl + '/upload-file', image, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getEventMessage(event, image)),
      catchError(this.handleError)
    );
  }

  uploadeAR(image): Observable<any> {
    return this._http.post<any>(this._baseUrl + '/upload-zip', image, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getEventMessage(event, image)),
      catchError(this.handleError)
    );
  }
  getAllImage(): Observable<any> {
    return this._http.get<any>(this._baseUrl + '/get-images')
  }
  getAllVideo(): Observable<any> {
    return this._http.get<any>(this._baseUrl + '/get-videos')
  }
  getAllGifs(): Observable<any> {
    return this._http.get<any>(this._baseUrl + '/get-gifs')
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
        return `File "${formData.get('file').name}" surprising upload event: ${event.type}.`;
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