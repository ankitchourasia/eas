import { Component, OnInit } from '@angular/core';
import { SuperAdminDivisionMenuService } from '../super-admin-division-menu.service';

@Component({
  selector: 'eas-super-admin-division-view',
  templateUrl: './super-admin-division-view.component.html',
  styleUrls: ['./super-admin-division-view.component.css']
})
export class SuperAdminDivisionViewComponent implements OnInit {

  constructor(private superAdminDivisionMenuService: SuperAdminDivisionMenuService) { 
    if(!this.superAdminDivisionMenuService.LAST_MENU.active){
      this.superAdminDivisionMenuService.menuClicked(this.superAdminDivisionMenuService.LAST_MENU);
    }
  }

  ngOnInit() {
  }

}
