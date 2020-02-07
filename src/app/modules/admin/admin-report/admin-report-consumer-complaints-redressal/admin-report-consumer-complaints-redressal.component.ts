import { Component, OnInit } from '@angular/core';
import { AdminReportMenuService } from '../admin-report-menu.service';

@Component({
  selector: 'eas-admin-report-consumer-complaints-redressal',
  templateUrl: './admin-report-consumer-complaints-redressal.component.html',
  styleUrls: ['./admin-report-consumer-complaints-redressal.component.css']
})
export class AdminReportConsumerComplaintsRedressalComponent implements OnInit {

  constructor(private adminReportMenuService: AdminReportMenuService) { 
    if(!this.adminReportMenuService.THIRD_MENU.active){
      this.adminReportMenuService.menuClicked(this.adminReportMenuService.THIRD_MENU);
    }
  }

  ngOnInit() {
  }

}
