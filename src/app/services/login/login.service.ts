import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  AUTHENTICATION_URL : string = "/ROOT/backend/authentication/login";
  public authenticate(user : any){
    return this.http.get(this.AUTHENTICATION_URL,user);
  }
}
