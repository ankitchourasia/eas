import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalResources, EASModal } from '@eas-utility/global.resources';
import { LoginService } from '@eas-services/login/login.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { AuthenticationService } from '@eas-services/authentication-service/authentication.service';

@Component({
  selector: 'eas-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  user : any;
  loginErrorText: any;
  loginError: boolean;
  _submitClicked : boolean;

  constructor(private router: Router, private authenticationService: AuthenticationService,
    private globalResources: GlobalResources, private loginService : LoginService, private modal: EASModal) { }

  ngOnInit() {
    this.user = {};
    this.loginErrorText = undefined;
    this.authenticationService.clearSessionStorage();
    this.modal.open('loginModal', {backdrop: false, keyboard: false});
  }

  loginClicked(loginForm){
    if (this.globalResources.validateForm(loginForm)) {
      this.processLoginForm();
    }
  }

  processLoginForm(){
    this._submitClicked = true;
    this.loginService.authenticate(this.user, true).subscribe(successResponse =>{
      let result: any = successResponse;
      if(result && result.status === 200){
        this.modal.close('loginModal');
        let user = result.body;
        this.authenticationService.setUserDetails(user);
        
        if(user.role === GlobalConfiguration.ROLE_ADMIN){
          this.router.navigate(["/admin"]);
          return;
        }
        if(user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
          this.router.navigate(["/super_admin"]);
          return;
        }
        if(user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
          this.router.navigate(["/admin"]);
          return;
        }
        if(user.role === GlobalConfiguration.ROLE_REPORT_ADMIN){
          this.router.navigate(["/report_admin"]);
          return;
        }
        if(user.role === GlobalConfiguration.ROLE_TOWN_ADMIN){
          this.router.navigate(["/town_admin"]);
          return;
        }
        return;
      }
      this.loginError= true;
      this._submitClicked = false;
      this.loginErrorText = "Invalid credential. Try again!";
    }, errorResponse =>{
      this.loginError= true;
      this._submitClicked = false;
      this.loginErrorText = "Invalid credential. Try again!";
    });

    
  }
}
