import { Component, OnInit } from '@angular/core';
import { TownAdminReportMenuService } from '../town-admin-report-menu.service';

@Component({
  selector: 'eas-town-admin-report-home',
  templateUrl: './town-admin-report-home.component.html',
  styleUrls: ['./town-admin-report-home.component.css']
})
export class TownAdminReportHomeComponent implements OnInit {

  constructor(private adminReportMenuService: TownAdminReportMenuService) { 
    if(!this.adminReportMenuService.START_MENU.active){
      this.adminReportMenuService.menuClicked(this.adminReportMenuService.START_MENU);
    }
  }

  ngOnInit(): void {
  }

}
