import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalResources } from 'app/utility/global.resources';

@Component({
  selector: 'eas-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user : any;
  constructor(private router: Router, public globalResources: GlobalResources) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
  }

  titleClicked(){
    this.router.navigate(['/' + this.user.role + '/home']);
  }

  logoutClicked() {
    this.router.navigate(['/']);
  }

  settingClicked() {
    this.router.navigate(['setting'],{ queryParams: { source: this.router.url }, queryParamsHandling: "merge" });
  }

}
