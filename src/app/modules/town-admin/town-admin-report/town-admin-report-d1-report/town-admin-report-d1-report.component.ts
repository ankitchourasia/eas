import { Component, OnInit } from '@angular/core';
import { TownAdminReportMenuService } from '../town-admin-report-menu.service';
import { ReportService } from '@eas-services/report-service/report.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { GlobalResources } from '@eas-utility/global.resources';

@Component({
  selector: 'eas-town-admin-report-d1-report',
  templateUrl: './town-admin-report-d1-report.component.html',
  styleUrls: ['./town-admin-report-d1-report.component.css']
})
export class TownAdminReportD1ReportComponent implements OnInit {

  COMPONENT_NAME = "TownAdminReportD1ReportComponent";
  missingData : any;
  billingMonth : any = {};
  searching : boolean;
  downloadReport : boolean;
  _generateClicked : boolean;
  user : any;
  town : any;
  constructor(private adminReportMenuService: TownAdminReportMenuService, private reportService : ReportService, 
    public globalConstants : GlobalConstants, private globalResources : GlobalResources) { 
    if(!this.adminReportMenuService.D1_REPORT_MENU.active){
      this.adminReportMenuService.menuClicked(this.adminReportMenuService.D1_REPORT_MENU);
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
    this.missingData = undefined;
    if(this.billingMonth.month && this.billingMonth.year){
      this.billingMonth.billMonth = this.billingMonth.month + "-" + this.billingMonth.year;
    }
  }

  searchClicked(){
    if(this.billingMonth.billMonth){
      this.getMissingDataByTownIdAndBillMonth(this.billingMonth.billMonth);
    }
  }

  getMissingDataByTownIdAndBillMonth(billMonth){
    this.searching = true;
    this.missingData = undefined;
    this.reportService.getD1GenerationStatusByTownIdAndBillMonth(this.town.id, billMonth, false).subscribe(success =>{
      this.searching = false;
      console.log(success);
      this.missingData = success;
      this.downloadReport = this.checkGenerationStatus(this.missingData);
    }, error =>{
      this.searching = false;
      console.log(error);
    })
  }

  checkGenerationStatus(resultList):boolean{
    if(resultList && resultList.length){
      for(let item of resultList) {
        if(!item.billingData){
          return false;
        }
      }
    } else{
      return false;
    }
    return true;
  }

  fetchClicked : boolean;
  fetchButtonClicked(missingData){
    let methodName = "fetchButtonClicked";
    this.fetchClicked = true;
    this.reportService.getD1ReportDataByTownIdAndBillMonth(missingData.town.id, missingData.billMonth, false).subscribe(success =>{
      this.fetchClicked = false;
      let alertResponse = this.globalResources.successAlert("Data fetched successfully.");
      alertResponse.then(result =>{
        this.searchClicked();
      });
    }, errorResponse =>{
      this.fetchClicked = false;
      if(errorResponse.status === 417){
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
      }else{
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName, "Unable to generate report");
      }
    });
  }

  generateReportButtonClicked(){
    this.generateD1ReportForTown(this.town.id, this.billingMonth.billMonth);
  }

  generateD1ReportForTown(townId, billMonth){
    let methodName = "generateD1ReportForTown";
    this._generateClicked = true;
    this.reportService.generateD1ReportDataByTownIdAndBillMonth(townId, billMonth, true).subscribe(successResponse =>{
      this._generateClicked = false;
      let result = <any>successResponse;
      if(result && result.status === 201){
        this.globalResources.successAlert("Report generated successfully !");
        this.exportReport();
      }else{
        this.globalResources.handleError(successResponse, this.COMPONENT_NAME, methodName, "Unable to generate report");
      }
    },errorResponse =>{
      this._generateClicked = false;
      if(errorResponse.status === 417){
        this.exportReport();
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
      }else{
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName, "Unable to generate report");
      }
    });
  }

  exportReport(){
    let encodedCredentials = sessionStorage.getItem('encodedCredentials');
    let params = {
      Authorization: "Basic " + encodedCredentials,
    };
    let fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "report/d1-report/export/town/" + this.town.id + "/bill-month/" + this.billingMonth.billMonth;
    this.globalResources.downloadFile(fileUrl,params);
  }

}
