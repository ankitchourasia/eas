import { Component, OnInit } from '@angular/core';
import { AdminReportMenuService } from '../admin-report-menu.service';

@Component({
  selector: 'eas-admin-report-d4',
  templateUrl: './admin-report-d4.component.html',
  styleUrls: ['./admin-report-d4.component.css']
})
export class AdminReportD4Component implements OnInit {

  constructor(private adminReportMenuService: AdminReportMenuService) { 
    if(!this.adminReportMenuService.EIGTH_MENU.active){
      this.adminReportMenuService.menuClicked(this.adminReportMenuService.EIGTH_MENU);
    }
  }

  ngOnInit() {
  }

}
