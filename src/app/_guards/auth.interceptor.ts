import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders} from '@angular/common/http';
import { UserService } from '../shared/user.service';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
   
    constructor(private injector:Injector) { }

    intercept(req,next){
      let authService = this.injector.get(UserService)
      let tokenizedReq = req.clone({
        setHeaders:{
          Authorization:`Bearer ${authService.getToken()}`
        }
      })
      return next.handle(tokenizedReq)
    }
  }