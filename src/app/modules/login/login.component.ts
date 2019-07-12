import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalResources } from 'app/utility/global.resources';
import { LoginService } from '@eas-services/login/login.service';
import { GlobalConstants } from 'app/utility/global.constants';
import { ZoneService } from '@eas-services/zone/zone.service';

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

  constructor(private router: Router, private globalResources: GlobalResources, private loginService : LoginService, private globalConstants : GlobalConstants,
    private zoneService : ZoneService) { }

  ngOnInit() {
    this.user = {};
    this.loginErrorText = undefined;
  }

  processLoginForm(){
    this.submitButtonClicked = true;
    this.loginService.authenticate(this.user).subscribe((successResponse) =>{
      if(successResponse && successResponse.status === 200){
        sessionStorage.setItem('encodedCredentials', btoa(this.user.username + ':' + this.user.password));
        let user = successResponse.json();
        if(user.role === this.globalConstants.ROLE_ADMIN){
          this.getZones(user);
          this.router.navigate(["/admin"]);
          this.submitButtonClicked = false;
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
    this.zoneService.getZonesFromDivisionId(user.division.id).subscribe(successResponse =>{
      user.zoneList = successResponse;
      sessionStorage.setItem('userDetails', JSON.stringify(user));
    }, errorResponse =>{
      console.log(errorResponse);
    });
  }

}
