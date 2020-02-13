import { Component, OnInit } from '@angular/core';
import { SuperAdminUserMenuService } from '../super-admin-user-menu.service';

@Component({
  selector: 'eas-super-admin-user-home',
  templateUrl: './super-admin-user-home.component.html',
  styleUrls: ['./super-admin-user-home.component.css']
})
export class SuperAdminUserHomeComponent implements OnInit {

  constructor(private superAdminUserMenuService: SuperAdminUserMenuService) { 
    if(!this.superAdminUserMenuService.FIRST_MENU.active){
      this.superAdminUserMenuService.menuClicked(this.superAdminUserMenuService.FIRST_MENU);
    }
  }

  ngOnInit() {
  }

}
