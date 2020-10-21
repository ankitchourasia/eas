import { Component, OnInit } from '@angular/core';
import { TownAdminReportMenuService } from '../town-admin-report-menu.service';

@Component({
  selector: 'eas-town-admin-report-town-wise-billing-data',
  templateUrl: './town-admin-report-town-wise-billing-data.component.html',
  styleUrls: ['./town-admin-report-town-wise-billing-data.component.css']
})
export class TownAdminReportTownWiseBillingDataComponent implements OnInit {

  constructor(private adminReportMenuService : TownAdminReportMenuService) { 
    if(!this.adminReportMenuService.TOWN_BILLING_DATA_REPORT_MENU.active){
      this.adminReportMenuService.menuClicked(this.adminReportMenuService.TOWN_BILLING_DATA_REPORT_MENU);
    }
  }

  ngOnInit(): void {
  }

}
