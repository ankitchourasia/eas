import { Component, OnInit } from '@angular/core';
import { SuperAdminDivisionMenuService } from '../super-admin-division-menu.service';

@Component({
  selector: 'eas-super-admin-division-add',
  templateUrl: './super-admin-division-add.component.html',
  styleUrls: ['./super-admin-division-add.component.css']
})
export class SuperAdminDivisionAddComponent implements OnInit {

  constructor(private superAdminDivisionMenuService: SuperAdminDivisionMenuService) { 
    if(!this.superAdminDivisionMenuService.SECOND_MENU.active){
      this.superAdminDivisionMenuService.menuClicked(this.superAdminDivisionMenuService.SECOND_MENU);
    }
  }

  ngOnInit() {
  }

}
