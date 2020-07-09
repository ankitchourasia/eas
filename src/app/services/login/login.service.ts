import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Injectable()
export class LoginService {

  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  
  constructor(private httpClient: HttpClient, private http: Http) { }

  AUTHENTICATION_URL : string = this.URL_PREFIX + "authentication/login";

  public authenticate(user : any, response: boolean){
    let headers = new Headers()
    headers.append('Authorization', 'Basic ' + btoa(user.username + ':' + user.password));
    let options : any = { headers : headers};
    if(response){ options['observe'] = "response"; }
    return this.http.get(this.AUTHENTICATION_URL, options);
  }

  public authenticates(user : any, response: boolean){
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(user.username + ':' + user.password));
    let options : any = { headers : headers};
    
    if(response){ options['observe'] = "response"; }

    return this.httpClient.get(this.AUTHENTICATION_URL, options);
  }
}
