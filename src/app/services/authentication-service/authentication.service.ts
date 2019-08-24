import { Injectable } from '@angular/core';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  private AUTHENTICATION_URL : string = "authentication/";
  
  constructor() { }

}
