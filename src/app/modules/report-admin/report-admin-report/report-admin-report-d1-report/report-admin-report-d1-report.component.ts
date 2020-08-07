import { Component, OnInit } from '@angular/core';
import { ReportAdminReportMenuService } from '../report-admin-report-menu.service';
import { ReportService } from '@eas-services/report-service/report.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { GlobalResources } from '@eas-utility/global.resources';

@Component({
  selector: 'eas-report-admin-report-d1-report',
  templateUrl: './report-admin-report-d1-report.component.html',
  styleUrls: ['./report-admin-report-d1-report.component.css']
})
export class ReportAdminReportD1ReportComponent implements OnInit {

  missingTowns : any;
  billingMonth : any = {};
  downloadReport : boolean;
  constructor(private adminReportMenuService: ReportAdminReportMenuService, private reportService : ReportService, 
    public globalConstants : GlobalConstants, private globalResources : GlobalResources) { 
    if(!this.adminReportMenuService.D1_REPORT_MENU.active){
      this.adminReportMenuService.menuClicked(this.adminReportMenuService.D1_REPORT_MENU);
    }
  }

  ngOnInit(): void {
  }

  getMissingTownWiseBillData(billMonth){
    this.reportService.getMissingTownWiseBillDataByBillMonth(billMonth, false).subscribe(success =>{
      console.log(success);
      this.missingTowns = success;
      if(!this.missingTowns || this.missingTowns.length === 0){
        this.downloadReport = true;
      }
    }, error =>{
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
    this.reportService.generateAllTownD1ReportByBillMonth(this.billingMonth.billMonth, false).subscribe(success =>{
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
    let fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "report/d1-report/export/bill-month/" + this.billingMonth.billMonth;
    this.globalResources.downloadFile(fileUrl,params);
  }

}
