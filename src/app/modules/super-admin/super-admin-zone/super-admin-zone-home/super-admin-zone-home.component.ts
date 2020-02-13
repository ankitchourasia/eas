import { Component, OnInit } from '@angular/core';
import { SuperAdminZoneMenuService } from '../super-admin-zone-menu.service';

@Component({
  selector: 'eas-super-admin-zone-home',
  templateUrl: './super-admin-zone-home.component.html',
  styleUrls: ['./super-admin-zone-home.component.css']
})
export class SuperAdminZoneHomeComponent implements OnInit {

  constructor(private superAdminZoneMenuService: SuperAdminZoneMenuService) { 
    if(!this.superAdminZoneMenuService.FIRST_MENU.active){
      this.superAdminZoneMenuService.menuClicked(this.superAdminZoneMenuService.FIRST_MENU);
    }
  }

  ngOnInit() {
  }

}
