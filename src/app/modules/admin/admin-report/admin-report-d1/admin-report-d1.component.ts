import { Component, OnInit } from '@angular/core';
import { AdminReportMenuService } from '../admin-report-menu.service';

@Component({
  selector: 'eas-admin-report-d1',
  templateUrl: './admin-report-d1.component.html',
  styleUrls: ['./admin-report-d1.component.css']
})
export class AdminReportD1Component implements OnInit {

  constructor(private adminReportMenuService: AdminReportMenuService) { 
    if(!this.adminReportMenuService.FIFTH_MENU.active){
      this.adminReportMenuService.menuClicked(this.adminReportMenuService.FIFTH_MENU);
    }
  }

  ngOnInit() {
  }

}
