import { Component, OnInit } from '@angular/core';
import { AdminReportMenuService } from '../admin-report-menu.service';

@Component({
  selector: 'eas-admin-report-d2',
  templateUrl: './admin-report-d2.component.html',
  styleUrls: ['./admin-report-d2.component.css']
})
export class AdminReportD2Component implements OnInit {

  constructor(private adminReportMenuService: AdminReportMenuService) { 
    if(!this.adminReportMenuService.SIXTH_MENU.active){
      this.adminReportMenuService.menuClicked(this.adminReportMenuService.SIXTH_MENU);
    }
  }

  ngOnInit() {
  }

}
