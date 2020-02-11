import { Component, OnInit } from '@angular/core';
import { SuperAdminCircleMenuService } from '../super-admin-circle-menu.service';

@Component({
  selector: 'eas-super-admin-circle-view',
  templateUrl: './super-admin-circle-view.component.html',
  styleUrls: ['./super-admin-circle-view.component.css']
})
export class SuperAdminCircleViewComponent implements OnInit {

  constructor(private superAdminCircleMenuService: SuperAdminCircleMenuService) { 
    if(!this.superAdminCircleMenuService.LAST_MENU.active){
      this.superAdminCircleMenuService.menuClicked(this.superAdminCircleMenuService.LAST_MENU);
    }
  }

  ngOnInit() {
  }

}
