import { Component, OnInit } from '@angular/core';
import { SuperAdminCircleMenuService } from '../super-admin-circle-menu.service';

@Component({
  selector: 'eas-super-admin-circle-home',
  templateUrl: './super-admin-circle-home.component.html',
  styleUrls: ['./super-admin-circle-home.component.css']
})
export class SuperAdminCircleHomeComponent implements OnInit {

  constructor(private superAdminCircleMenuService: SuperAdminCircleMenuService) { 
    if(!this.superAdminCircleMenuService.FIRST_MENU.active){
      this.superAdminCircleMenuService.menuClicked(this.superAdminCircleMenuService.FIRST_MENU);
    }
  }

  ngOnInit() {
  }

}
