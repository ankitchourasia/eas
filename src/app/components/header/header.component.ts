import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'eas-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  titleClicked(){
    this.router.navigate(['/admin/home']);
  }

  logoutClicked() {
    this.router.navigate(['/']);
  }

  settingClicked() {
    this.router.navigate(['setting'],{ queryParams: { source: this.router.url }, queryParamsHandling: "merge" });
  }

}
