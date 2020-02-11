import { Component, OnInit } from '@angular/core';
import { SuperAdminMenuService } from '../super-admin-menu.service';

@Component({
  selector: 'eas-super-admin-home',
  templateUrl: './super-admin-home.component.html',
  styleUrls: ['./super-admin-home.component.css']
})
export class SuperAdminHomeComponent implements OnInit {

  constructor(private superAdminMenuService: SuperAdminMenuService) {
    if (!this.superAdminMenuService.START_MENU.active) {
      this.superAdminMenuService.menuClicked(this.superAdminMenuService.START_MENU);
    }
  }

  ngOnInit() {
  }

}
