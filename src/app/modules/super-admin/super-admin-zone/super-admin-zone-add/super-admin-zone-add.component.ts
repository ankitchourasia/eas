import { Component, OnInit } from '@angular/core';
import { SuperAdminZoneMenuService } from '../super-admin-zone-menu.service';

@Component({
  selector: 'eas-super-admin-zone-add',
  templateUrl: './super-admin-zone-add.component.html',
  styleUrls: ['./super-admin-zone-add.component.css']
})
export class SuperAdminZoneAddComponent implements OnInit {

  constructor(private superAdminZoneMenuService: SuperAdminZoneMenuService) { 
    if(!this.superAdminZoneMenuService.SECOND_MENU.active){
      this.superAdminZoneMenuService.menuClicked(this.superAdminZoneMenuService.SECOND_MENU);
    }
  }

  ngOnInit() {
  }

}
