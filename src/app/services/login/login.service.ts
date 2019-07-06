import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpResponse } from "@angular/common/http";
import {map} from 'rxjs/operators';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  AUTHENTICATION_URL : string = "/backend/authentication/login";
  public authenticate(user : any){
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(user.username + ':' + user.password));
    let options : any = { headers : headers};
    options['observe'] = "response";
    return this.http.get(this.AUTHENTICATION_URL, options);
  }
}
