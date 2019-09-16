import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { DivisionService } from '@eas-services/division-service/division.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { ReportService } from '@eas-services/report-service/report.service';

@Component({
  selector: 'eas-report-feeder-json-file',
  templateUrl: './report-feeder-json-file.component.html',
  styleUrls: ['./report-feeder-json-file.component.css']
})
export class ReportFeederJsonFileComponent implements OnInit {

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
    this.viewResultList = null;
    this.reportGenerated = false;
    console.log(zone);
  }

  billMonthChanged(){
    this.viewResultList = null;
    this.reportGenerated = false;
    if(this.searchFormData.billMonth && this.searchFormData.billMonthYear){
      this.searchFormData.billingMonth = this.searchFormData.billMonth + "-" + this.searchFormData.billMonthYear;
    }
  }

  billMonthYearChanged(){
    this.viewResultList = null;
    this.reportGenerated = false;
    if(this.searchFormData.billMonth && this.searchFormData.billMonthYear){
      this.searchFormData.billingMonth = this.searchFormData.billMonth + "-" + this.searchFormData.billMonthYear;
    }
  }

  generateClicked(){
    this._generateClicked = true;
    this.reportGenerated = false
    let generateInput: any = {};
    generateInput.regionId = this.searchFormData.region.id;
    generateInput.circleId = this.searchFormData.circle.id;
    generateInput.divisionId = this.searchFormData.division.id;
    generateInput.billMonth = this.searchFormData.billingMonth;
    this._generateClicked = false;
    generateInput.zoneId = this.searchFormData.zone.id;
    generateInput.zoneName = this.searchFormData.zone.name;
    this.generateJsonInputForZone(generateInput);
  }

  generateJsonInputForZone(generateInputObject){
    this._generateClicked = true;
    this.reportService.generateJsonInputForZone(generateInputObject, true).subscribe(successResponse =>{
      this._generateClicked = false;
      let result = <any>successResponse;
      if(result && result.status === 201){
        this.reportGenerated = true;
        // this.viewClicked();
        let alertResponse = this.globalResources.successAlert("Report generated successfully !");
      }else{
        console.log("success with invalid result");
      }
    },errorResponse =>{
      console.log(errorResponse);
      this._generateClicked = false;
      if(errorResponse.status === 417){
        this.reportGenerated = true;
        // this.viewClicked();
        let alertResponse = this.globalResources.errorAlert(errorResponse.error.errorMessage);
      }else{
        this.globalResources.errorAlert(errorResponse.error.errorMessage);
      }
    });
  }

  viewClicked(){
      this.viewByZoneIdAndBillMonth();
  }

  viewByZoneIdAndBillMonth(){
    this.viewResultList = [];
    this.reportService.getJsonInputByZoneIdAndBillMonth(this.searchFormData.zone.id, this.searchFormData.billingMonth, false).subscribe(successResponse =>{
      console.log(successResponse);
      if(successResponse){
        this.viewResultList = successResponse;
      }
    },errorResponse =>{
      console.log(errorResponse);
    });
  }
}
