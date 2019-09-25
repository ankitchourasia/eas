import { Injectable } from '@angular/core';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { GlobalResources } from '@eas-utility/global.resources';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  private AUTHENTICATION_URL : string = "authentication/";

  constructor(private router: Router, private globalResources: GlobalResources) { }

  public logout() {
    console.log("Logout called in Authorization Service");
    let loggedInUser = this.globalResources.getUserDetails();
    if (loggedInUser) {
      console.log(loggedInUser);
      this.clearStorage('encodedCredentials');
      this.clearStorage('userDetails');
      this.router.navigate(['login']);
    }
  }

  private clearStorage(key) {
    sessionStorage.removeItem(key);
  }

}
