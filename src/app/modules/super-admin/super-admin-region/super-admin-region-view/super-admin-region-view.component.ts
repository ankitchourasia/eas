import { Component, OnInit } from '@angular/core';
import { SuperAdminRegionMenuService } from '../super-admin-region-menu.service';

@Component({
  selector: 'eas-super-admin-region-view',
  templateUrl: './super-admin-region-view.component.html',
  styleUrls: ['./super-admin-region-view.component.css']
})
export class SuperAdminRegionViewComponent implements OnInit {

  constructor(private superAdminRegionMenuService: SuperAdminRegionMenuService) { 
    if(!this.superAdminRegionMenuService.LAST_MENU.active){
      this.superAdminRegionMenuService.menuClicked(this.superAdminRegionMenuService.LAST_MENU);
    }
  }

  ngOnInit() {
  }

}
