import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@eas-services/authentication-service/authentication.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let encodedCredentials = sessionStorage.getItem('encodedCredentials');
    let token = this.authenticationService.getToken();
    if(token && token.length > 0){
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${token}`
          // Authorization: "Basic " + encodedCredentials
        }
      });
    }
    return next.handle(request);
  }
}