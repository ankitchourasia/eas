import { Component, OnInit } from '@angular/core';
import { AdminReportMenuService } from '../admin-report-menu.service';

@Component({
  selector: 'eas-admin-report-d5',
  templateUrl: './admin-report-d5.component.html',
  styleUrls: ['./admin-report-d5.component.css']
})
export class AdminReportD5Component implements OnInit {

  constructor(private adminReportMenuService: AdminReportMenuService) { 
    if(!this.adminReportMenuService.NINETH_MENU.active){
      this.adminReportMenuService.menuClicked(this.adminReportMenuService.NINETH_MENU);
    }
  }

  ngOnInit() {
  }

}
