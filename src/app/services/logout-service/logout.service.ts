import { Injectable } from '@angular/core';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { GlobalResources } from '@eas-utility/global.resources';
import { Router } from '@angular/router';
import { AuthenticationService } from '@eas-services/authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  public logout() {
    console.log("Logout called in Authorization Service");
    let loggedInUser = this.authenticationService.getUserDetails();
    if (loggedInUser) {
      this.authenticationService.clearSessionStorage();
      this.router.navigate(['login']);
    }
  }

}
