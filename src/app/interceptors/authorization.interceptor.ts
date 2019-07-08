import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("inside interceptor");
    let encodedCredentials = sessionStorage.getItem('encodedCredentials');
    request = request.clone({
      setHeaders: {
        Authorization: "Basic " + encodedCredentials
      }
    });
    //request.headers.append('Authorization', "Basic " + encodedCredentials);
    return next.handle(request);
  }
}