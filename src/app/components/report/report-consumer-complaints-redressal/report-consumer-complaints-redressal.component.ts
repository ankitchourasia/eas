import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { DivisionService } from '@eas-services/division-service/division.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { ReportService } from '@eas-services/report-service/report.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-report-consumer-complaints-redressal',
  templateUrl: './report-consumer-complaints-redressal.component.html',
  styleUrls: ['./report-consumer-complaints-redressal.component.css']
})
export class ReportConsumerComplaintsRedressalComponent implements OnInit {

  COMPONENT_NAME: string = "ReportConsumerComplaintsRedressalComponent";
  formData: any;
  regionList: any;
  circleList: any;
  divisionList:any;
  zoneList:any;
  _submintClicked: boolean;
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
    this.formData = {};
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.getRegionList();
    }else if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
      // this.zoneList = (this.user.zoneList);
      this.getZoneListByDivisionId(this.user.division.id);
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      this.formData.region = this.user.region;
      this.formData.circle = this.user.circle;
      this.formData.division = this.user.division;
    }else if(this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
      this.zoneList.push(this.user.zone);
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      this.formData.region = this.user.region;
      this.formData.circle = this.user.circle;
      this.formData.division = this.user.division;
      this.formData.zone = this.user.zone;
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
      this.circleList = null;
      this.formData.circle = undefined;
      this.divisionList = null;
      this.formData.division = undefined;
      this.zoneList = null;
      this.formData.zone = undefined;
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
      this.divisionList = null;
      this.formData.division = undefined;
      this.zoneList = null;
      this.formData.zone = undefined;
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
      this.zoneList = null;
      this.formData.zone = undefined;
      this.getZoneListByDivisionId(division.id);
    }
  }

  getZoneListByDivisionId(divisionId){
    this.zoneList = [];
    this.zoneService.getZonesByDivisionId(divisionId, false).subscribe(successResponse =>{
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

  submitClicked(nscMonitoringInputForm){
    let methodName = "submitClicked"

    if(this.globalResources.validateForm(nscMonitoringInputForm)){
      return;
    }

    this._submintClicked = true;
    
    this.formData.regionId = this.formData.region.id;
    this.formData.circleId = this.formData.circle.id;
    this.formData.divisionId = this.formData.division.id;
    this.formData.zoneId = this.formData.zone.id;

    this.formData.totalPendingComplaints = this.globalResources.getValueAsNumberWithFixed((this.formData.previousPendingComplaints + this.formData.currentComplaints), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    this.formData.pendingComplaints = this.globalResources.getValueAsNumberWithFixed((this.formData.totalPendingComplaints - this.formData.closedComplaints), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    this.formData.closedBeyondSERCTime = this.globalResources.getValueAsNumberWithFixed((this.formData.closedComplaints - this.formData.closedWithinSERCTime), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    this.formData.closedWithinTimePercent = this.globalResources.getValueAsNumberWithFixed(((this.formData.closedWithinSERCTime * 100) / this.formData.closedComplaints), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    this.reportService.generateConsumerComplaintsRedressal(this.formData, false).subscribe(successResponse =>{
      this._submintClicked = false;
      let alertResponse = this.globalResources.successAlert("Data saved successfully");
      alertResponse.then(result =>{
        this.setPartialData();
        this.globalResources.resetValidateForm(nscMonitoringInputForm);
      });
    },errorResponse =>{
      this._submintClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

}
