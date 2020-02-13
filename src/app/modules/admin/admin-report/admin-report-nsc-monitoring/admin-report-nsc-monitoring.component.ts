import { Component, OnInit } from '@angular/core';
import { AdminReportMenuService } from '../admin-report-menu.service';

@Component({
  selector: 'eas-admin-report-nsc-monitoring',
  templateUrl: './admin-report-nsc-monitoring.component.html',
  styleUrls: ['./admin-report-nsc-monitoring.component.css']
})
export class AdminReportNscMonitoringComponent implements OnInit {

  constructor(private adminReportMenuService: AdminReportMenuService) { 
    if(!this.adminReportMenuService.SECOND_MENU.active){
      this.adminReportMenuService.menuClicked(this.adminReportMenuService.SECOND_MENU);
    }
  }

  ngOnInit() {
  }

}
