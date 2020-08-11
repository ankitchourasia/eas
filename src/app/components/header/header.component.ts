import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalResources } from '@eas-utility/global.resources';
import { LogoutService } from '@eas-services/logout-service/logout.service';

@Component({
  selector: 'eas-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user : any;
  constructor(private router: Router, public globalResources: GlobalResources, 
    private logoutService: LogoutService) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
    // console.log(this.user);
  }

  titleClicked(){
    let role = this.user.role.toLowerCase();
    this.router.navigate(['/' + role]);
  }

  logoutClicked() {
    this.logoutService.logout();
  }

  settingClicked() {
    this.router.navigate(['setting'],{ queryParams: { source: this.router.url }, queryParamsHandling: "merge" });
  }

}
