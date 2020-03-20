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
  selector: 'eas-report-d2',
  templateUrl: './report-d2.component.html',
  styleUrls: ['./report-d2.component.css']
})
export class ReportD2Component implements OnInit {

  searchFormData: any;
  regionList: any;
  circleList: any;
  divisionList:any;
  zoneList:any;
  viewResultList: any;
  _viewClicked: boolean;
  user: any;
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private regionService: RegionService, private circleService: CircleService, 
    private divisionService: DivisionService, private zoneService: ZoneService, 
    private reportService: ReportService) { }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.zoneList = [];
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    this.viewResultList = [];
    this.searchFormData = {};
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.getRegionList();
    }else if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
      // this.zoneList = (this.user.zoneList);
      this.getZoneListByDivisionId(this.user.division.id);
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      this.searchFormData.region = this.user.region;
      this.searchFormData.circle = this.user.circle;
      this.searchFormData.division = this.user.division;
    }else if(this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
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
    this.regionList = [];
    this.regionService.getRegions(false).subscribe(successResponse =>{
      if(successResponse){
        this.regionList = successResponse;
      }
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  regionChanged(region){
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.circleList = [];
      this.searchFormData.circle = undefined;
      this.divisionList = [];
      this.searchFormData.division = undefined;
      this.zoneList = [];
      this.searchFormData.zone = undefined;
      this.getCircleListByRegionId(region.id);
    }
  }

  getCircleListByRegionId(regionId){
    this.circleList = [];
    this.circleService.getCirclesByRegionId(regionId, false).subscribe(successResponse =>{
      if(successResponse){
        this.circleList = successResponse;
      }
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  circleChanged(circle){
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.divisionList = [];
      this.searchFormData.division = undefined;
      this.zoneList = [];
      this.searchFormData.zone = undefined;
      this.getDivisionListByCircleId(circle.id);
    }
  }

  getDivisionListByCircleId(circleId){
    this.divisionList = [];
    this.divisionService.getDivisionsByCircleId(circleId, false).subscribe(successResponse =>{
      if(successResponse){
        this.divisionList = successResponse;
      }
    },errorResponse =>{
      console.log(errorResponse);
    });
  }
  
  divisionChanged(division){
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.zoneList = [];
      this.searchFormData.zone = undefined;
      this.getZoneListByDivisionId(division.id);
    }
  }

  getZoneListByDivisionId(divisionId){
    this.zoneList = [];
    this.zoneService.getZonesByDivisionId(divisionId, false).subscribe(successResponse =>{
      console.log(successResponse);
      if(successResponse){
        this.zoneList = successResponse;
      }
    },errorResponse =>{
      console.log(errorResponse);
    });
  }
  
  zoneChanged(zone){
    this.viewResultList = [];
  }

  billMonthChanged(){
    this.viewResultList = [];
    if(this.searchFormData.month && this.searchFormData.year){
      this.searchFormData.billMonth = this.searchFormData.month + "-" + this.searchFormData.year;
    }
  }

  billMonthYearChanged(){
    this.viewResultList = [];
    if(this.searchFormData.month && this.searchFormData.year){
      this.searchFormData.billMonth = this.searchFormData.month + "-" + this.searchFormData.year;
    }
  }

  viewClicked(){
    if(this.searchFormData.zone === "ALL"){
      this.viewByDivisionIdAndBillMonth();
    }else{
      this.viewByZoneIdAndBillMonth();
    }
  }

  viewByZoneIdAndBillMonth(){
    this._viewClicked = true;
    this.viewResultList = [];
    this.reportService.getD2ByZoneIdAndBillMonth(this.searchFormData.zone.id, this.searchFormData.billMonth, false).subscribe(successResponse =>{
      this._viewClicked = false;
      console.log(successResponse);
      if(successResponse){
        this.viewResultList.push(successResponse);
      }
    },errorResponse =>{
      this._viewClicked = false;
      console.log(errorResponse);
    });
  }

  viewByDivisionIdAndBillMonth(){
    this._viewClicked = true;
    this.viewResultList = [];
    this.reportService.getD2ByDivisionIdAndBillMonth(this.searchFormData.division.id, this.searchFormData.billMonth, false).subscribe(successResponse =>{
      this._viewClicked = false;
      console.log(successResponse);
      if(successResponse){
        this.viewResultList = successResponse;
      }
    },errorResponse =>{
      this._viewClicked = false;
      console.log(errorResponse);
    });
  }

  //exportClicked(exportElementId){
   // this.globalResources.exportTableToExcel(exportElementId, "d-2_Report_" + this.searchFormData.billMonth);
    // let encodedCredentials = sessionStorage.getItem('encodedCredentials');
    // let params = {
    //   Authorization: "Basic " + encodedCredentials,
    // };
    // let fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "report/d2-report/export/division/id/" + this.searchFormData.division.id + "/bill-month/" + this.searchFormData.billMonth;
    // this.globalResources.downloadFile(fileUrl,params);
  //}

  exportClicked(){
    let encodedCredentials = sessionStorage.getItem('encodedCredentials');
    let params = {
      Authorization: "Basic " + encodedCredentials,
    };
    let fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "report/d2-report/export/division/id/" + this.searchFormData.division.id + "/bill-month/" + this.searchFormData.billMonth;
    this.globalResources.downloadFile(fileUrl,params);
  }
}