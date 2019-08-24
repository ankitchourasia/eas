import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalResources } from '@eas-utility/global.resources';
import { AuthenticationService } from '@eas-services/authentication-service/authentication.service';

@Component({
  selector: 'eas-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user : any;
  constructor(private router: Router, public globalResources: GlobalResources, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
    console.log(this.user);
  }

  titleClicked(){
    this.router.navigate(['/' + this.user.role + '/home']);
  }

  logoutClicked() {
    this.router.navigate(['login']);
  }

  settingClicked() {
    this.router.navigate(['setting'],{ queryParams: { source: this.router.url }, queryParamsHandling: "merge" });
  }

}
