import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { RootObject } from './all.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private title = new BehaviorSubject<String>('App title');
  private title$ = this.title.asObservable();

  private _baseUrl = 'https://samydigital.com/api/admin'
  
  constructor(private http:HttpClient,private _router:Router) { }

  setTitle(title: String) {
    this.title.next(title);
  }

  getTitle(): Observable<String> {
    return this.title$;
  }
  loginUser(user){
    return this.http.post<any>(this._baseUrl+'/sign-in',user)
  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  getToken(){
    return localStorage.getItem('token')
  }
  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }
  

}