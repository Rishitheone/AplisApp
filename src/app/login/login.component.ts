import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { RootObject } from '../shared/all.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: {};
  loginError: string;
  loginUserData = {};
  constructor(private _auth:UserService,
    private _router:Router
    ) { }

  ngOnInit() {
  }

  loginUser () {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        if(res.status === 1){
          console.log(res)
          localStorage.setItem('token', res.user.jwtToken)
          this._router.navigate(['/home'])
        }else{
          this.loginError = 'Username or password is incorrect.';
        }
        
      },
      error => this.error = error
    ) 
  }
}