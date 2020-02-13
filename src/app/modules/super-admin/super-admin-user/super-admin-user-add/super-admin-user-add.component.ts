import { Component, OnInit } from '@angular/core';
import { SuperAdminUserMenuService } from '../super-admin-user-menu.service';

@Component({
  selector: 'eas-super-admin-user-add',
  templateUrl: './super-admin-user-add.component.html',
  styleUrls: ['./super-admin-user-add.component.css']
})
export class SuperAdminUserAddComponent implements OnInit {

  constructor(private superAdminUserMenuService: SuperAdminUserMenuService) { 
    if(!this.superAdminUserMenuService.SECOND_MENU.active){
      this.superAdminUserMenuService.menuClicked(this.superAdminUserMenuService.SECOND_MENU);
    }
  }

  ngOnInit() {
  }

}
