import { Component, OnInit } from '@angular/core';
import { AdminMenuService } from '../admin-menu.service';

@Component({
  selector: 'eas-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private adminMenuService: AdminMenuService) {
    if (!this.adminMenuService.START_MENU.active) {
      this.adminMenuService.menuClicked(this.adminMenuService.START_MENU);
    }
  }

  ngOnInit() {
  
  }

}
