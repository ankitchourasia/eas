import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { DivisionService } from '@eas-services/division-service/division.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { ReportService } from '@eas-services/report-service/report.service';

@Component({
  selector: 'eas-report-nsc-monitoring',
  templateUrl: './report-nsc-monitoring.component.html',
  styleUrls: ['./report-nsc-monitoring.component.css']
})
export class ReportNscMonitoringComponent implements OnInit {

  COMPONENT_NAME: string = "ReportNscMonitoringComponent";
  formData: any;
  regionList: any;
  circleList: any;
  divisionList:any;
  zoneList:any;
  _submintClicked: boolean;
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private regionService: RegionService, private circleService: CircleService, 
    private divisionService: DivisionService, private zoneService: ZoneService, 
    private reportService: ReportService) { }

  ngOnInit() {
    this.setInitialData();
  }

  setInitialData(){
    console.log(this.globalResources.getUserDetails());
    this.formData = {};
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    this.zoneList = [];
    let user = this.globalResources.getUserDetails();
    if(user.role === this.globalConstants.ROLE_SUPER_ADMIN){
      this.getRegionList();
    }else if(user.role === this.globalConstants.ROLE_ADMIN){
      this.regionList.push(user.zone.division.circle.region);
      this.circleList.push(user.zone.division.circle);
      this.divisionList.push(user.zone.division);
      this.formData.region = user.zone.division.circle.region;
      this.formData.circle = user.zone.division.circle;
      this.formData.division = user.zone.division;
      this.getZoneListByDivisionId(this.formData.division.id);
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
    this.formData.circle = undefined;
    this.formData.division = undefined;
    this.formData.zone = undefined;
    this.getCircleListByRegionId(region.id);
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
    this.formData.division = undefined;
    this.formData.zone = undefined;
    this.getDivisionListByCircleId(circle.id);
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
    this.formData.zone = undefined;
    this.getZoneListByDivisionId(division.id);
  }

  getZoneListByDivisionId(divisionId){
    this.zoneList = [];
    this.zoneService.getZonseByDivisionId(divisionId, false).subscribe(successResponse =>{
      if(successResponse){
        this.zoneList = successResponse;
      }
    },errorResponse =>{
      console.log(errorResponse);
    });
  }
  
  zoneChanged(zone){
  }

  billMonthChanged(){
    if(this.formData.month && this.formData.year){
      this.formData.billMonth = this.formData.month + "-" + this.formData.year;
    }
  }

  billMonthYearChanged(){
    if(this.formData.month && this.formData.year){
      this.formData.billMonth = this.formData.month + "-" + this.formData.year;
    }
  }

  submitClicked(nscMonitoringInput){
    let methodName = "submitClicked"
    this._submintClicked = true;
    
    this.formData.regionId = this.formData.region.id;
    this.formData.circleId = this.formData.circle.id;
    this.formData.divisionId = this.formData.division.id;
    this.formData.zoneId = this.formData.zone.id;

    this.formData.totalPendingNSC = this.formData.previousPendingNSC + this.formData.currentAppliedNSC;
    this.formData.currentPendingNSC = this.formData.totalPendingNSC - this.formData.currentReleasedNSC;
    this.formData.nscBeyondSERCTime = this.formData.currentReleasedNSC - this.formData.nscWithinSERCTime;

    this.reportService.saveNscMonitoringInput(this.formData, false).subscribe(successResponse =>{
      this._submintClicked = false;
      this.setInitialData();
      this.globalResources.resetValidateForm(nscMonitoringInput);
      this.globalResources.successAlert("Data saved successfully");
      console.log(successResponse);
    },errorResponse =>{
      this._submintClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

}
