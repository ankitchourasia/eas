import { Injectable } from '@angular/core';
import { GlobalConfiguration } from 'app/utility/global-configuration';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  private AUTHENTICATION_URL : string = "authentication/";

  constructor() { }

}
