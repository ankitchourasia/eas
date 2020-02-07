import { Component, OnInit } from '@angular/core';
import { AdminReportMenuService } from '../admin-report-menu.service';

@Component({
  selector: 'eas-admin-report-d6',
  templateUrl: './admin-report-d6.component.html',
  styleUrls: ['./admin-report-d6.component.css']
})
export class AdminReportD6Component implements OnInit {

  constructor(private adminReportMenuService: AdminReportMenuService) { 
    if(!this.adminReportMenuService.TENTH_MENU.active){
      this.adminReportMenuService.menuClicked(this.adminReportMenuService.TENTH_MENU);
    }
  }

  ngOnInit() {
  }

}
