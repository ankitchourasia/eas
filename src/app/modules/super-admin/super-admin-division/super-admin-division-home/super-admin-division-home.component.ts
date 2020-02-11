import { Component, OnInit } from '@angular/core';
import { SuperAdminDivisionMenuService } from '../super-admin-division-menu.service';

@Component({
  selector: 'eas-super-admin-division-home',
  templateUrl: './super-admin-division-home.component.html',
  styleUrls: ['./super-admin-division-home.component.css']
})
export class SuperAdminDivisionHomeComponent implements OnInit {

  constructor(private superAdminDivisionMenuService: SuperAdminDivisionMenuService) { 
    if(!this.superAdminDivisionMenuService.FIRST_MENU.active){
      this.superAdminDivisionMenuService.menuClicked(this.superAdminDivisionMenuService.FIRST_MENU);
    }
  }

  ngOnInit() {
  }

}
