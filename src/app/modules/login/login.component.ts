import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalResources } from '@eas-utility/global.resources';
import { LoginService } from '@eas-services/login/login.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

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

  constructor(private router: Router, private globalResources: GlobalResources, private loginService : LoginService, private zoneService : ZoneService) { }

  ngOnInit() {
    this.user = {};
    this.loginErrorText = undefined;
  }

  processLoginForm(){
    this._submitClicked = true;
    this.loginService.authenticate(this.user, true).subscribe((successResponse) =>{
      console.log(successResponse);
      if(successResponse && successResponse.status === 200){
        sessionStorage.setItem('encodedCredentials', btoa(this.user.username + ':' + this.user.password));
        let user = successResponse.json();
        sessionStorage.setItem('userDetails', JSON.stringify(user));
        if(user.role === GlobalConfiguration.ROLE_ADMIN){
          this.router.navigate(["/admin"]);
          // this._submitClicked = false;
        }else if(user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
          this.router.navigate(["/super_admin"]);
          this._submitClicked = false;
          // console.log("inside super-admin");
        }
        else if(user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
          this.router.navigate(["/admin"]);
          this._submitClicked = false;
          // console.log("inside field-admin");
        }
      }else{
        this.loginError= true;
        this._submitClicked = false;
        this.loginErrorText = "Invalid username/password. Try again!";
      }
    }, errorResponse =>{
      this.loginError= true;
      this._submitClicked = false;
      this.loginErrorText = "Invalid username/password. Try again!";
      // alert("Invalid credentials");
    });

    
  }

  loginClicked(loginForm){
    if (this.globalResources.validateForm(loginForm)) {
      this.processLoginForm();
    }
  }

  getZones(user){
    console.log(user);
    user.zoneList = [];
    this.zoneService.getZonesByDivisionId(user.division.id, false).subscribe(successResponse =>{
      user.zoneList = successResponse;
      sessionStorage.setItem('userDetails', JSON.stringify(user));
    }, errorResponse =>{
      console.log(errorResponse);
    });
  }

}
