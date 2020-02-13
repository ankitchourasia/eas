import { Component, OnInit } from '@angular/core';
import { SuperAdminZoneMenuService } from '../super-admin-zone-menu.service';

@Component({
  selector: 'eas-super-admin-zone-view',
  templateUrl: './super-admin-zone-view.component.html',
  styleUrls: ['./super-admin-zone-view.component.css']
})
export class SuperAdminZoneViewComponent implements OnInit {

  constructor(private superAdminZoneMenuService: SuperAdminZoneMenuService) { 
    if(!this.superAdminZoneMenuService.LAST_MENU.active){
      this.superAdminZoneMenuService.menuClicked(this.superAdminZoneMenuService.LAST_MENU);
    }
  }

  ngOnInit() {
  }

}
