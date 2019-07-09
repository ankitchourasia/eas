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

  constructor(private router: Router, private globalResources: GlobalResources, private loginService : LoginService, private globalConstants : GlobalConstants,
    private zoneService : ZoneService) { }

  ngOnInit() {
  }

  user : any = {};
  loading : boolean;

  processLoginForm(){
    this.loginService.authenticate(this.user).subscribe((success) =>{
      if(success.status === 200){
        sessionStorage.setItem('encodedCredentials', btoa(this.user.username + ':' + this.user.password));
        let user = success.json();
        if(user.role === this.globalConstants.ROLE_ADMIN){
          this.getZones(user);
          this.router.navigate(["/admin"]);
        }
      }
    }, error =>{
      console.log(error);
      alert("Invalid credentials");
    });

    
  }

  loginClicked(loginForm){
    if (this.globalResources.validateForm(loginForm)) {
      this.processLoginForm();
    }
  }

  getZones(user){
    this.zoneService.getZonesFromDivisionId(user.division.id).subscribe(success =>{
      user.zoneList = success;
      sessionStorage.setItem('userDetails', JSON.stringify(user));
    }, error =>{
      console.log(error);
    });
  }

}
