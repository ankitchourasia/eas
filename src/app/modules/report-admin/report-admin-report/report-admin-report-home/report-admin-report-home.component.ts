import { Component, OnInit } from '@angular/core';
import { ReportAdminReportMenuService } from '../report-admin-report-menu.service';

@Component({
  selector: 'eas-report-admin-report-home',
  templateUrl: './report-admin-report-home.component.html',
  styleUrls: ['./report-admin-report-home.component.css']
})
export class ReportAdminReportHomeComponent implements OnInit {

  constructor(private adminReportMenuService: ReportAdminReportMenuService) { 
    if(!this.adminReportMenuService.START_MENU.active){
      this.adminReportMenuService.menuClicked(this.adminReportMenuService.START_MENU);
    }
  }

  ngOnInit(): void {
  }

}
