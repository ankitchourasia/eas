import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { ReportService } from '@eas-services/report-service/report.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-report-d7',
  templateUrl: './report-d7.component.html',
  styleUrls: ['./report-d7.component.css']
})
export class ReportD7Component implements OnInit {

  COMPONENT_NAME: string = "ReportD7Component";
  searchFormData: any;
  regionList: any;
  circleList: any;
  townList : any;
  user: any;
  billingStatusList: any;
  _searchClicked: boolean;
  _generateClicked: boolean;
  viewResultList: any;
  reportGenerated: boolean;
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private paginationService: PaginationService, private regionService: RegionService, 
    private circleService: CircleService, private reportService: ReportService) { }

  ngOnInit() {
    this.setPartialData()
  }

  setPartialData(){
    this.searchFormData = {};
    this.townList = [];
    this.regionList = [];
    this.circleList = [];
    this.billingStatusList = [];
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.getRegionList();
    }else {
      this.getTownListByCircleId(this.user.circle.id);
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.searchFormData.region = this.user.region;
      this.searchFormData.circle = this.user.circle;
    }
  }
  
  getRegionList(){
    this.regionList = [];
    this.regionService.getRegions(false).subscribe(successResponse =>{
      this.regionList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  regionChanged(region){
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.circleList = [];
      this.searchFormData.circle = undefined;
      this.townList = [];
      this.searchFormData.town = undefined;
      this.getCircleListByRegionId(region.id);
    }
  }

  getCircleListByRegionId(regionId){
    this.circleList = [];
    this.circleService.getCirclesByRegionId(regionId, false).subscribe(successResponse =>{
      this.circleList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  circleChanged(circle){
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.townList = [];
      this.searchFormData.town = undefined;
      this.getTownListByCircleId(circle.id);
    }
  }

  getTownListByCircleId(circleId){
    this.townList = [];
    this.circleService.getTownsByCircleId(circleId, false).subscribe(successResponse =>{
      this.townList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }
  
  townChanged(town){
    this.billingStatusList = [];
  }

  billMonthChanged(){
    this.billingStatusList = [];
    if(this.searchFormData.billMonth && this.searchFormData.billMonthYear){
      this.searchFormData.billingMonth = this.searchFormData.billMonth + "-" + this.searchFormData.billMonthYear;
    }
  }

  billMonthYearChanged(){
    this.billingStatusList = [];
    if(this.searchFormData.billMonth && this.searchFormData.billMonthYear){
      this.searchFormData.billingMonth = this.searchFormData.billMonth + "-" + this.searchFormData.billMonthYear;
    }
  }

  searchClicked(){
    this.reportGenerated = false;
    this.billingStatusList = [];
    this.getNGBBillingStatusByTownIdAndBillMonth(this.searchFormData.town.id, this.searchFormData.billingMonth);
  }

  getNGBBillingStatusByTownIdAndBillMonth(townId, billMonth){
    let methodName = "getNGBBillingStatusByTownIdAndBillMonth";
    this._searchClicked = true;
    this.billingStatusList = [];
    this.reportService.getNGBBillingStatusByTownIdAndBillMonth(townId, billMonth, false).subscribe(successResponse =>{
      this._searchClicked = false;
      this.billingStatusList = successResponse;
      this.billingStatusFlag = this.setBillingStatusFlag(this.billingStatusList);
    },errorResponse =>{
      this._searchClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  billingStatusFlag: boolean;
  setBillingStatusFlag(billingStatusList){
    // this.billingStatusFlag = billingStatusList.every(element => element.billingStatus);
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

  generateClicked(){
    this._generateClicked = true;
    this.reportGenerated = false
    let d7: any = {};
    d7.billMonth = this.searchFormData.billingMonth;
    this._generateClicked = false;
    d7.townId = this.searchFormData.town.id;
    this.generateD7ReportForTown(d7);
  }

  generateD7ReportForTown(d7Object){
    let methodName = "generateD7ReportForTown";
    this._generateClicked = true;
    this.reportService.generateD7ReportForTown(d7Object, true).subscribe(successResponse =>{
      this._generateClicked = false;
      let result = <any>successResponse;
      if(result && result.status === 201){
        this.reportGenerated = true;
        this.globalResources.successAlert("Report generated successfully !");
      }else{
        this.globalResources.handleError(result, this.COMPONENT_NAME, methodName, "Unable to generate report");
      }
    },errorResponse =>{
      this._generateClicked = false;
      if(errorResponse.status === 417){
        this.reportGenerated = true;
      }
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  viewClicked(){
    this.viewByTownIdAndBillMonth();
  }

  viewByTownIdAndBillMonth(){
    this.viewResultList = [];
    this.reportService.getD7ByTownIdAndBillMonth(this.searchFormData.town.id, this.searchFormData.billingMonth, false).subscribe(successResponse =>{
      console.log(successResponse);
      if(successResponse){
        this.viewResultList.push(successResponse);
      }
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  exportClicked(exportElementId){
    console.log(exportElementId);
    // this.globalResources.exportTableToExcel(exportElementId, "d-7_Report_" + this.searchFormData.billingMonth);
    let encodedCredentials = sessionStorage.getItem('encodedCredentials');
    let params = {
      Authorization: "Basic " + encodedCredentials,
    };
    let fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "report/d7-report/export/circle/id/" + this.searchFormData.circle.id + "/bill-month/" + this.searchFormData.billingMonth;
    this.globalResources.downloadFile(fileUrl,params);
  }
}