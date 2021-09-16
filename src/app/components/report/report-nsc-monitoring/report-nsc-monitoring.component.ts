import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { ReportService } from '@eas-services/report-service/report.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

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
  townList:any;
  _submintClicked: boolean;
  user: any;
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private regionService: RegionService, private circleService: CircleService, private reportService: ReportService) { }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.regionList = [];
    this.circleList = [];
    this.townList = [];
    this.formData = {};
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.getRegionList();
    } else {
      this.getTownListByCircleId(this.user.circle.id);
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.formData.region = this.user.region;
      this.formData.circle = this.user.circle;
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
      this.townList = null;
      this.formData.town = undefined;
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
      this.townList = null;
      this.formData.town = undefined;
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
    this.formData.townId = this.formData.twon.id;

    this.formData.totalPendingNSC = this.globalResources.getValueAsNumberWithFixed((this.formData.previousPendingNSC + this.formData.currentAppliedNSC), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    this.formData.currentPendingNSC = this.globalResources.getValueAsNumberWithFixed((this.formData.totalPendingNSC - this.formData.currentReleasedNSC), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    this.formData.nscBeyondSERCTime = this.globalResources.getValueAsNumberWithFixed((this.formData.currentReleasedNSC - this.formData.nscWithinSERCTime), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    this.formData.nscWithinSERCTimePercent = this.globalResources.getValueAsNumberWithFixed(((this.formData.nscWithinSERCTime * 100) / this.formData.currentReleasedNSC), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    this.reportService.generateNscMonitoringInput(this.formData, false).subscribe(successResponse =>{
      this._submintClicked = false;
      let alertResponse = this.globalResources.successAlert("Data saved successfully");
      alertResponse.then(result =>{
        this.setPartialData();
        this.globalResources.resetValidateForm(nscMonitoringInput);
      });
    },errorResponse =>{
      this._submintClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

}
