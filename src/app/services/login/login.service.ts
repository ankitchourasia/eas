import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalConfiguration } from 'app/utility/global-configuration';

@Injectable()
export class LoginService {

  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  
  constructor(private http: Http) { }

  AUTHENTICATION_URL : string = this.URL_PREFIX + "authentication/login";
  public authenticate(user : any){
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(user.username + ':' + user.password));
    let options : any = { headers : headers};
    options['observe'] = "response";
    return this.http.get(this.AUTHENTICATION_URL, options);
  }
}
