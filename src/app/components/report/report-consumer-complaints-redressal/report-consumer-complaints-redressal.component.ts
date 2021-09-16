import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
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

  townList: any;
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

  submitClicked(nscMonitoringInputForm){
    let methodName = "submitClicked"

    if(this.globalResources.validateForm(nscMonitoringInputForm)){
      this._submintClicked = true;
    
    this.formData.regionId = this.formData.region.id;
    this.formData.circleId = this.formData.circle.id;
    this.formData.townId = this.formData.town.id;

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

}
