import { Component, OnInit } from '@angular/core';
import { TownAdminReportMenuService } from '../town-admin-report-menu.service';
import { ReportService } from '@eas-services/report-service/report.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-town-admin-report-d7-report',
  templateUrl: './town-admin-report-d7-report.component.html',
  styleUrls: ['./town-admin-report-d7-report.component.css']
})
export class TownAdminReportD7ReportComponent implements OnInit {

  COMPONENT_NAME = "TownAdminReportD7ReportComponent";
  billingMonth : any = {};
  downloadReport : boolean;
  user : any;
  town : any;
  constructor(private adminReportMenuService: TownAdminReportMenuService, private reportService : ReportService, 
    public globalConstants : GlobalConstants, private globalResources : GlobalResources) { 
    if(!this.adminReportMenuService.D7_REPORT_MENU.active){
      this.adminReportMenuService.menuClicked(this.adminReportMenuService.D7_REPORT_MENU);
    }
  }

  ngOnInit(): void {
    this.user = this.user = this.globalResources.getUserDetails();
    console.log(this.user);
    this.getTownByZoneId();
  }

  getTownByZoneId(){
    this.reportService.getTownByZoneId(this.user.zone.id, false).subscribe(success =>{
      console.log(success);
      this.town = success;
    }, error =>{
      console.log(error);
    });
  }

  billMonthChanged(){
    this.downloadReport = false;
    this.billingStatusList = [];
    if(this.billingMonth.month && this.billingMonth.year){
      this.billingMonth.billMonth = this.billingMonth.month + "-" + this.billingMonth.year;
    }
  }

  searchButtonClicked : boolean;
  searchClicked(){
    this.billingStatusList = [];
    if(this.billingMonth.billMonth){
      this.getNGBBillingStatusByTownIdAndBillMonth(this.town.id, this.billingMonth.billMonth);
    }
  }

  billingStatusList : any = [];
  billingStatusFlag : boolean;
  getNGBBillingStatusByTownIdAndBillMonth(townId, billMonth){
    let methodName = "getNGBBillingStatusByTownIdAndBillMonth";
    this.searchButtonClicked = true;
    this.billingStatusList = [];
    this.reportService.getNGBBillingStatusByTownIdAndBillMonth(townId, billMonth, false).subscribe(successResponse =>{
      this.searchButtonClicked = false;
      this.billingStatusList = successResponse;
      this.billingStatusFlag = this.setBillingStatusFlag(this.billingStatusList);
    },errorResponse =>{
      this.searchButtonClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  setBillingStatusFlag(billingStatusList){
    if(billingStatusList && billingStatusList.length > 0){
      for(let status of billingStatusList){
        if(!status.billingStatus){
          return false;
        }
      }
    } else {
      return false;
    }
    return true;
  }

  fetchClicked : boolean;
  generateClicked(){
    this.fetchClicked = true;
    let d7: any = {};
    d7.billMonth = this.billingMonth.billMonth;
    this.fetchClicked = false;
    d7.townId = this.town.id;
    this.generateD7ReportForTown(d7);
  }

  generateD7ReportForTown(d7Object){
    let methodName = "generateD7ReportForTown";
    this.fetchClicked = true;
    this.reportService.generateD7ReportForTown(d7Object, true).subscribe(successResponse =>{
      this.fetchClicked = false;
      let result = <any>successResponse;
      if(result && result.status === 201){
        this.globalResources.successAlert("Report generated successfully !");
        this.exportClicked();
      }else{
        this.globalResources.handleError(result, this.COMPONENT_NAME, methodName, "Unable to generate report");
      }
    },errorResponse =>{
      this.fetchClicked = false;
      if(errorResponse.status === 417){
        this.exportClicked();
      }else{
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
      }
    });
  }

  exportClicked(){
    // this.globalResources.exportTableToExcel(exportElementId, "d-7_Report_" + this.searchFormData.billingMonth);
    let encodedCredentials = sessionStorage.getItem('encodedCredentials');
    let params = {
      Authorization: "Basic " + encodedCredentials,
    };
    let fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "report/d7-report/export/town/id/" + this.town.id + "/bill-month/" + this.billingMonth.billMonth;
    this.globalResources.downloadFile(fileUrl,params);
  }

}
