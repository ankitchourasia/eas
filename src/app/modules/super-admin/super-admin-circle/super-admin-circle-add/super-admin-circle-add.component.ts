import { Component, OnInit } from '@angular/core';
import { SuperAdminCircleMenuService } from '../super-admin-circle-menu.service';

@Component({
  selector: 'eas-super-admin-circle-add',
  templateUrl: './super-admin-circle-add.component.html',
  styleUrls: ['./super-admin-circle-add.component.css']
})
export class SuperAdminCircleAddComponent implements OnInit {

  constructor(private superAdminCircleMenuService: SuperAdminCircleMenuService) { 
    if(!this.superAdminCircleMenuService.SECOND_MENU.active){
      this.superAdminCircleMenuService.menuClicked(this.superAdminCircleMenuService.SECOND_MENU);
    }
  }


  ngOnInit() {
  }

}
