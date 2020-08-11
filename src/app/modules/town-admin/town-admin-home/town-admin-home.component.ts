import { Component, OnInit } from '@angular/core';
import { TownAdminMenuService } from '../town-admin-menu.service';

@Component({
  selector: 'eas-town-admin-home',
  templateUrl: './town-admin-home.component.html',
  styleUrls: ['./town-admin-home.component.css']
})
export class TownAdminHomeComponent implements OnInit {

  constructor(private adminMenuService: TownAdminMenuService) {
    if (!this.adminMenuService.START_MENU.active) {
      this.adminMenuService.menuClicked(this.adminMenuService.START_MENU);
    }
  }

  ngOnInit(): void {
  }

}
