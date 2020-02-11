import { Component, OnInit } from '@angular/core';
import { SuperAdminRegionMenuService } from '../super-admin-region-menu.service';

@Component({
  selector: 'eas-super-admin-region-home',
  templateUrl: './super-admin-region-home.component.html',
  styleUrls: ['./super-admin-region-home.component.css']
})
export class SuperAdminRegionHomeComponent implements OnInit {

  constructor(private superAdminRegionMenuService: SuperAdminRegionMenuService) { 
    if(!this.superAdminRegionMenuService.FIRST_MENU.active){
      this.superAdminRegionMenuService.menuClicked(this.superAdminRegionMenuService.FIRST_MENU);
    }
  }

  ngOnInit() {
  }

}
