import { Component, OnInit } from '@angular/core';
import { ReportAdminReportMenuService } from '../report-admin-report-menu.service';
import { ReportService } from '@eas-services/report-service/report.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-report-admin-report-d7-report',
  templateUrl: './report-admin-report-d7-report.component.html',
  styleUrls: ['./report-admin-report-d7-report.component.css']
})
export class ReportAdminReportD7ReportComponent implements OnInit {

  missingTowns : any;
  billingMonth : any = {};
  searching: boolean;
  downloadReport : boolean;
  constructor(private adminReportMenuService: ReportAdminReportMenuService, private reportService : ReportService, 
    public globalConstants : GlobalConstants, private globalResources : GlobalResources) { 
    if(!this.adminReportMenuService.D7_REPORT_MENU.active){
      this.adminReportMenuService.menuClicked(this.adminReportMenuService.D7_REPORT_MENU);
    }
  }

  ngOnInit(): void {
  }

  getMissingTownWiseBillData(billMonth){
    this.searching = true;
    this.missingTowns = undefined;
    this.reportService.getMissingD7DataByBillMonth(billMonth, false).subscribe(success =>{
      this.searching = false;
      console.log(success);
      this.missingTowns = success;
      this.missingTowns.sort(this.globalResources.dynamicSort("name","asc"));
      if(!this.missingTowns || this.missingTowns.length === 0){
        this.downloadReport = true;
      }
    }, error =>{
      this.searching = false;
      console.log(error);
    })
  }

  billMonthChanged(){
    this.downloadReport = false;
    this.missingTowns = [];
    if(this.billingMonth.month && this.billingMonth.year){
      this.billingMonth.billMonth = this.billingMonth.month + "-" + this.billingMonth.year;
    }
  }

  searchClicked(){
    if(this.billingMonth.billMonth){
      this.getMissingTownWiseBillData(this.billingMonth.billMonth);
    }
  }

  downloadReportButtonClicked(){
    this.reportService.generateAllTownD7ReportByBillMonth(this.billingMonth.billMonth, false).subscribe(success =>{
      console.log(success);
      this.exportReport();
    }, error =>{
      console.log(error);
    });
  }

  exportReport(){
    let encodedCredentials = sessionStorage.getItem('encodedCredentials');
    let params = {
      Authorization: "Basic " + encodedCredentials,
    };
    let fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "report/d7-report/export/bill-month/" + this.billingMonth.billMonth;
    this.globalResources.downloadFile(fileUrl,params);
  }

}
