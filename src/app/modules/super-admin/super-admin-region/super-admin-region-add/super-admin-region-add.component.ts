import { Component, OnInit } from '@angular/core';
import { SuperAdminRegionMenuService } from '../super-admin-region-menu.service';

@Component({
  selector: 'eas-super-admin-region-add',
  templateUrl: './super-admin-region-add.component.html',
  styleUrls: ['./super-admin-region-add.component.css']
})
export class SuperAdminRegionAddComponent implements OnInit {

  constructor(private superAdminRegionMenuService: SuperAdminRegionMenuService) { 
    if(!this.superAdminRegionMenuService.SECOND_MENU.active){
      this.superAdminRegionMenuService.menuClicked(this.superAdminRegionMenuService.SECOND_MENU);
    }
  }

  ngOnInit() {
  }

}
