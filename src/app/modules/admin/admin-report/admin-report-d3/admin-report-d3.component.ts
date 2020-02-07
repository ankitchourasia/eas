import { Component, OnInit } from '@angular/core';
import { AdminReportMenuService } from '../admin-report-menu.service';

@Component({
  selector: 'eas-admin-report-d3',
  templateUrl: './admin-report-d3.component.html',
  styleUrls: ['./admin-report-d3.component.css']
})
export class AdminReportD3Component implements OnInit {

  constructor(private adminReportMenuService: AdminReportMenuService) { 
    if(!this.adminReportMenuService.SEVENTH_MENU.active){
      this.adminReportMenuService.menuClicked(this.adminReportMenuService.SEVENTH_MENU);
    }
  }

  ngOnInit() {
  }

}
