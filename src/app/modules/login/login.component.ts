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
  submitButtonClicked : boolean;

  constructor(private router: Router, private globalResources: GlobalResources, private loginService : LoginService, private zoneService : ZoneService) { }

  ngOnInit() {
    this.user = {};
    this.loginErrorText = undefined;
  }

  processLoginForm(){
    this.submitButtonClicked = true;
    this.loginService.authenticate(this.user).subscribe((successResponse) =>{
      console.log(this.user, successResponse);
      if(successResponse && successResponse.status === 200){
        sessionStorage.setItem('encodedCredentials', btoa(this.user.username + ':' + this.user.password));
        let user = successResponse.json();
        sessionStorage.setItem('userDetails', JSON.stringify(user));
        if(user.role === GlobalConfiguration.ROLE_ADMIN){
          console.log("inside admin");
          this.router.navigate(["/admin"]);
          this.submitButtonClicked = false;
        }else if(user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
          this.router.navigate(["/super_admin"]);
          this.submitButtonClicked = false;
          console.log("inside super-admin");
        }
        else if(user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
          this.router.navigate(["/admin"]);
          this.submitButtonClicked = false;
          console.log("inside field-admin");
        }
      }else{
        this.loginError= true;
        this.submitButtonClicked = false;
        this.loginErrorText = "Invalid username/password. Try again!";
      }
    }, errorResponse =>{
      console.log(errorResponse);
      this.loginError= true;
      this.submitButtonClicked = false;
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
