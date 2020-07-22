import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { AuthenticationService } from '@eas-services/authentication-service/authentication.service';

@Injectable()
export class LoginService {

  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  
  constructor(private httpClient: HttpClient,
    private authenticationService: AuthenticationService) { }

  AUTHENTICATION_URL : string = this.URL_PREFIX + "authentication/login";

  // public authenticate(user : any, response: boolean){
  //   let options : any = {}
  //   let headers = new Headers()
  //   headers.append('Authorization', 'Basic ' + btoa(user.username + ':' + user.password));
  //   options = { headers : headers};
  //   if(response){ options['observe'] = "response"; }
  //   return this.http.get(this.AUTHENTICATION_URL, options);
  // }

  public authenticate(user : any, response: boolean){
    let options: any = {};
    if(response){ options['observe'] = "response"; }
    this.authenticationService.createAuthorizationToken(user);
    return this.httpClient.get(this.AUTHENTICATION_URL, options);
  }

}
