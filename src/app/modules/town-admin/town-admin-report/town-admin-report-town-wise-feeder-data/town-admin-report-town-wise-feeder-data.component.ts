import { Component, OnInit } from '@angular/core';
import { TownAdminReportMenuService } from '../town-admin-report-menu.service';

@Component({
  selector: 'eas-town-admin-report-town-wise-feeder-data',
  templateUrl: './town-admin-report-town-wise-feeder-data.component.html',
  styleUrls: ['./town-admin-report-town-wise-feeder-data.component.css']
})
export class TownAdminReportTownWiseFeederDataComponent implements OnInit {

  constructor(private adminReportMenuService : TownAdminReportMenuService) { 
    if(!this.adminReportMenuService.TOWN_BILLING_DATA_REPORT_MENU.active){
      this.adminReportMenuService.menuClicked(this.adminReportMenuService.FEEDER_BILLING_DATA_REPORT_MENU);
    }
  }

  ngOnInit(): void {
  }

}
