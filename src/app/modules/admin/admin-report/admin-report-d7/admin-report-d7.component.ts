import { Component, OnInit } from '@angular/core';
import { AdminReportMenuService } from '../admin-report-menu.service';

@Component({
  selector: 'eas-admin-report-d7',
  templateUrl: './admin-report-d7.component.html',
  styleUrls: ['./admin-report-d7.component.css']
})
export class AdminReportD7Component implements OnInit {

  constructor(private adminReportMenuService: AdminReportMenuService) { 
    if(!this.adminReportMenuService.ELEVENTH_MENU.active){
      this.adminReportMenuService.menuClicked(this.adminReportMenuService.ELEVENTH_MENU);
    }
  }

  ngOnInit() {
  }

}
