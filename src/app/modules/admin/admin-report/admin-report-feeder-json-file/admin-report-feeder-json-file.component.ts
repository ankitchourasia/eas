import { Component, OnInit } from '@angular/core';
import { AdminReportMenuService } from '../admin-report-menu.service';

@Component({
  selector: 'eas-admin-report-feeder-json-file',
  templateUrl: './admin-report-feeder-json-file.component.html',
  styleUrls: ['./admin-report-feeder-json-file.component.css']
})
export class AdminReportFeederJsonFileComponent implements OnInit {

  constructor(private adminReportMenuService: AdminReportMenuService) { 
    if(!this.adminReportMenuService.FOURTH_MENU.active){
      this.adminReportMenuService.menuClicked(this.adminReportMenuService.FOURTH_MENU);
    }
  }

  ngOnInit() {
  }

}
