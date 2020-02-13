import { Component, OnInit } from '@angular/core';
import { AdminReportMenuService } from '../admin-report-menu.service';

@Component({
  selector: 'eas-admin-report-home',
  templateUrl: './admin-report-home.component.html',
  styleUrls: ['./admin-report-home.component.css']
})
export class AdminReportHomeComponent implements OnInit {

  constructor(private adminReportMenuService: AdminReportMenuService) { 
    if(!this.adminReportMenuService.FIRST_MENU.active){
      this.adminReportMenuService.menuClicked(this.adminReportMenuService.FIRST_MENU);
    }
  }

  ngOnInit() {
  }

}
