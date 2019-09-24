import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { DivisionService } from '@eas-services/division-service/division.service';
import { ZoneService } from '@eas-services/zone/zone.service';
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
  divisionList: any;
  zoneList: any;
  user: any;
  _generateClicked: boolean;
  viewResultList: any;
  reportGenerated: boolean;
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private paginationService: PaginationService, private regionService: RegionService, 
    private circleService: CircleService, private divisionService: DivisionService,
    private zoneService: ZoneService, private reportService: ReportService) { }

  ngOnInit() {
    this.searchFormData = {};
    this.setPartialData()
  }

  setPartialData(){
    this.zoneList = [];
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === this.globalConstants.ROLE_SUPER_ADMIN){
      this.getRegionList();
    }else if(this.user.role === this.globalConstants.ROLE_ADMIN){
      this.zoneList = (this.user.zoneList);
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      this.searchFormData.region = this.user.region;
      this.searchFormData.circle = this.user.circle;
      this.searchFormData.division = this.user.division;
    }else if(this.user.role === this.globalConstants.ROLE_FIELD_ADMIN){
      this.zoneList.push(this.user.zone);
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      this.searchFormData.region = this.user.region;
      this.searchFormData.circle = this.user.circle;
      this.searchFormData.division = this.user.division;
      this.searchFormData.zone = this.user.zone;
    }
  }
  
  getRegionList(){
    this.regionService.getRegions(false).subscribe(successResponse =>{
      this.regionList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  regionChanged(region){
    if(this.user.role === this.globalConstants.ROLE_SUPER_ADMIN){
      this.circleList = null;
      this.searchFormData.circle = undefined;
      this.divisionList = null;
      this.searchFormData.division = undefined;
      this.zoneList = null;
      this.searchFormData.zone = undefined;
      this.getCircleListByRegionId(region.id);
    }
  }

  getCircleListByRegionId(regionId){
    this.circleService.getCirclesByRegionId(regionId, false).subscribe(successResponse =>{
      this.circleList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  circleChanged(circle){
    if(this.user.role === this.globalConstants.ROLE_SUPER_ADMIN){
      this.divisionList = null;
      this.searchFormData.division = undefined;
      this.zoneList = null;
      this.searchFormData.zone = undefined;
      this.getDivisionListByCircleId(circle.id);
    }
  }

  getDivisionListByCircleId(circleId){
    this.divisionService.getDivisionsByCircleId(circleId, false).subscribe(successResponse =>{
      this.divisionList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  divisionChanged(division){
    if(this.user.role === this.globalConstants.ROLE_SUPER_ADMIN){
      this.zoneList = null;
      this.searchFormData.zone = undefined;
      this.getZoneListByDivisionId(division.id);
    }
  }

  getZoneListByDivisionId(divisionId){
    this.zoneList = this.user.zoneList;
    this.zoneService.getZonseByDivisionId(divisionId, false).subscribe(successResponse =>{
      this.zoneList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }
  
  zoneChanged(zone){
    this.billingStatusList = null;
    console.log(zone);
  }

    billMonthChanged(){
      this.billingStatusList = null;
    if(this.searchFormData.billMonth && this.searchFormData.billMonthYear){
      this.searchFormData.billingMonth = this.searchFormData.billMonth + "-" + this.searchFormData.billMonthYear;
    }
  }

  billMonthYearChanged(){
    this.billingStatusList = null;
    if(this.searchFormData.billMonth && this.searchFormData.billMonthYear){
      this.searchFormData.billingMonth = this.searchFormData.billMonth + "-" + this.searchFormData.billMonthYear;
    }
  }

  _searchClicked: boolean;
  searchClicked(){
    this.reportGenerated = false;
    this.billingStatusList = null;
    if(this.searchFormData.zone === "ALL"){
      this.getNGBBillingStatusByDivisionIdAndBillMonth(this.searchFormData.division.id, this.searchFormData.billingMonth);
    }else{
      this.getNGBBillingStatusByZoneIdAndBillMonth(this.searchFormData.zone.id, this.searchFormData.billingMonth);
    }
  }

  billingStatusList: any;
  getNGBBillingStatusByDivisionIdAndBillMonth(divisionId, billMonth){
    let methodName = "getNGBBillingStatusByDivisionIdAndBillMonth";
    this._searchClicked = true;
    this.billingStatusList = [];
    this.reportService.getNGBBillingStatusByDivisionIdAndBillMonth(divisionId, billMonth, false).subscribe(successResponse =>{
      this._searchClicked = false;
      this.billingStatusList =successResponse;
      this.setBillingStatusFlag(this.billingStatusList);
    },errorResponse =>{
      this._searchClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  getNGBBillingStatusByZoneIdAndBillMonth(zoneId, billMonth){
    let methodName = "getNGBBillingStatusByZoneIdAndBillMonth";
    this._searchClicked = true;
    this.billingStatusList = [];
    this.reportService.getNGBBillingStatusByZoneIdAndBillMonth(zoneId, billMonth, false).subscribe(successResponse =>{
      this._searchClicked = false;
      this.billingStatusList.push(successResponse);
      this.setBillingStatusFlag(this.billingStatusList);
    },errorResponse =>{
      this._searchClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  billingStatusFlag: boolean;
  setBillingStatusFlag(billingStatusList){
    this.billingStatusFlag = billingStatusList.every(element => element.billingStatus);
  }

  generateClicked(){
    this._generateClicked = true;
    this.reportGenerated = false
    let d7: any = {};
    d7.regionId = this.searchFormData.region.id;
    d7.circleId = this.searchFormData.circle.id;
    d7.divisionId = this.searchFormData.division.id;
    d7.billMonth = this.searchFormData.billingMonth;
    this._generateClicked = false;
    if(this.searchFormData.zone === "ALL"){
      this.generateD7ReportForDivision(d7);
    }else{
      d7.zoneId = this.searchFormData.zone.id;
      d7.zoneName = this.searchFormData.zone.name;
      this.generateD7ReportForZone(d7);
    }
  }

  generateD7ReportForDivision(d7Object){
    this._generateClicked = true;
    this.reportService.generateD7ReportForDivision(d7Object, true).subscribe(successResponse =>{
      this._generateClicked = false;
      let result = <any>successResponse;
      if(result && result.status === 201){
        this.reportGenerated = true;
        this.globalResources.successAlert("Report generated successfully !");
      }else{
        console.log("success with invalid result");
      }
    },errorResponse =>{
      console.log(errorResponse);
      this._generateClicked = false;
      if(errorResponse.status === 417){
        this.reportGenerated = true;
      }
      this.globalResources.errorAlert(errorResponse.error.errorMessage);
    });
  }

  generateD7ReportForZone(d7Object){
    this._generateClicked = true;
    this.reportService.generateD7ReportForZone(d7Object, true).subscribe(successResponse =>{
      this._generateClicked = false;
      let result = <any>successResponse;
      if(result && result.status === 201){
        this.reportGenerated = true;
        this.globalResources.successAlert("Report generated successfully !");
      }else{
        console.log("success with invalid result");
      }
    },errorResponse =>{
      console.log(errorResponse);
      this._generateClicked = false;
      if(errorResponse.status === 417){
        this.reportGenerated = true;
      }
      this.globalResources.errorAlert(errorResponse.error.errorMessage);
    });
  }

  viewClicked(){
    if(this.searchFormData.zone === "ALL"){
      this.viewByDivisionIdAndBillMonth();
    }else{
      this.viewByZoneIdAndBillMonth();
    }
  }

  viewByZoneIdAndBillMonth(){
    this.viewResultList = [];
    this.reportService.getD7ByZoneIdAndBillMonth(this.searchFormData.zone.id, this.searchFormData.billingMonth, false).subscribe(successResponse =>{
      console.log(successResponse);
      if(successResponse){
        this.viewResultList.push(successResponse);
      }
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  viewByDivisionIdAndBillMonth(){
    this.viewResultList = [];
    this.reportService.getD7ByDivisionIdAndBillMonth(this.searchFormData.division.id, this.searchFormData.billingMonth, false).subscribe(successResponse =>{
      console.log(successResponse);
      if(successResponse){
        this.viewResultList = successResponse;
      }
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  exportClicked(exportElementId){
    console.log(exportElementId);
    this.globalResources.exportTableToExcel(exportElementId, "d-7_Report_" + this.searchFormData.billingMonth);
    // let encodedCredentials = sessionStorage.getItem('encodedCredentials');
    // let params = {
    //   Authorization: "Basic " + encodedCredentials,
    // };
    // let fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "report/d7-report/export/division/id/" + this.searchFormData.division.id + "/bill-month/" + this.searchFormData.billingMonth;
    // this.globalResources.downloadFile(fileUrl,params);
  }
}