import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-feeder-atnc-loss-report',
  templateUrl: './feeder-atnc-loss-report.component.html',
  styleUrls: ['./feeder-atnc-loss-report.component.css']
})
export class FeederAtncLossReportComponent implements OnInit {

  COMPONENT_NAME: "FeederAtncLossReportComponent";
  user : any;
  zoneList: any;
  regionList: any;
  circleList: any;
  divisionList: any;
  feederList: any;
  substationList: any;
  userDetails: any;
  billMonth: any;
  billMonthYear: any;
  pager: any;
  pageSize: number;
  pagedFeederList : any;
  showError: boolean;
  generating: boolean;
  reportGenerated: boolean;
  _searchClicked: boolean;
  display: any = 'none';
  feederLossReportView : any;
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants, private feederService : FeederService, 
    private substationService: SubstationService, private zoneService: ZoneService, private paginationService : PaginationService) { }

  ngOnInit() {
    this.setInitialValue();
    this.user = this.globalResources.getUserDetails();
    this.checkUserRoll(this.user);
  }

  setInitialValue(){
    this.userDetails = {};
    this.zoneList = [];
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    this.substationList = [];
    this.feederList = [];
    this.pagedFeederList = [];
  }

  checkUserRoll(user){
     if(user.role === GlobalConfiguration.ROLE_ADMIN){
      // this.zoneList = (user.zoneList);
      this.getZoneListByDivisionId(this.user.division.id);
      this.regionList.push(user.region);
      this.circleList.push(user.circle);
      this.divisionList.push(user.division);
      this.userDetails.region = user.region;
      this.userDetails.circle = user.circle;
      this.userDetails.division = user.division;
    }else if(user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
      this.zoneList.push(user.zone);
      this.regionList.push(user.region);
      this.circleList.push(user.circle);
      this.divisionList.push(user.division);
      this.userDetails.region = user.region;
      this.userDetails.circle = user.circle;
      this.userDetails.division = user.division;
      this.userDetails.zone = user.zone;
      this.getSubstationByZoneId(this.userDetails.zone.id);
    }
  }

  divisionChanged(division){
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.zoneList = [];
      this.userDetails.zone = undefined;
      this.substationList = [];
      this.userDetails.substation = undefined;
      this.feederList = [];
      this.userDetails.feeder = undefined;
      this.userDetails.dtr = undefined;
      this.getZoneListByDivisionId(division.id);
    }
  }

  getZoneListByDivisionId(divisionId){
    // this.zoneList = this.user.zoneList;
    this.zoneList = [];
    this.zoneService.getZonesByDivisionId(divisionId, false).subscribe(successResponse =>{
      this.zoneList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }
  
  zoneChanged(zone){
    this.substationList = [];
    this.userDetails.substation = undefined;
    this.feederList = [];
    this.userDetails.feeder = undefined;
    this.userDetails.dtr = undefined;
    this.getSubstationByZoneId(zone.id);
  }

  getSubstationByZoneId(zoneId){
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(successResponese =>{
      this.substationList = successResponese;
    }, errorResponse =>{
      console.log(errorResponse);
    });
  }

  substationChanged(substation){
    this.feederList = [];
    this.userDetails.feeder = undefined; 
  }

  
  searchClicked(){
    this.showError = false;
    this.reportGenerated = false;
    this.generating = false;
    this.getFeederBySubstationId(this.userDetails.substation.id);
  }

  getFeederBySubstationId(substationId){
    let methodName = "getFeederBySubstationId";
    this.feederList = [];
    this._searchClicked = true;
    let billingMonth = this.billMonth + "-" + this.billMonthYear;
    this.feederService.getFeedersForATnCLossGenerationBySubstationId(substationId, billingMonth).subscribe(successResponese =>{
      this._searchClicked = false;
      this.feederList = successResponese;
      this.initializePaginationVariables();
      if(this.feederList && this.feederList.length){
        this.setPage(1);
      }
    },errorResponse =>{
      this._searchClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  generateSingleFeederLossReport(feeder){
    let methodName = "generateSingleFeederLossReport";
    feeder.generatingSingleReport = true;
    let billingMonth = this.billMonth + "-" + this.billMonthYear;
    this.feederService.generateFeederATnCLossReport(feeder, billingMonth.toUpperCase(), this.user.username).subscribe(successResponse =>{
      let generatedReport = <any>successResponse;
      feeder.generatingSingleReport = false;
      feeder.singleReportGenerated = true;
      let alertResponse = this.globalResources.successAlert("Report generated successfully");
    },errorResponse =>{
      feeder.generatingSingleReport = false;
      if(errorResponse.status === 417){
        feeder.generatingSingleReport = false;
        feeder.singleReportGenerated = true;
      }
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  viewFeederLossReport(){
    this.feederLossReportView = {};
    let billingMonth = this.billMonth + "-" + this.billMonthYear;
    this.getFeederATnCLossReportBySubstationId(this.userDetails.substation.id, billingMonth);
  }

  getFeederATnCLossReportBySubstationId(substationnId, billMonth){
    this.feederService.getFeederATnCLossBySubstationId(substationnId, billMonth).subscribe(success =>{
      this.feederLossReportView.feederLossReports = success;
      this.intializeGrossValues();
      this.feederLossReportView.feederLossReports.forEach(report => {
        this.calculateTotal(report);
      });
      this.calculateGrossLoss();
      this.roundOffAllValues();
      this.openModal();
    }, error =>{
      console.log(error);
    });
  }

  intializeGrossValues(){
    this.feederLossReportView.grossInput = 0;
    this.feederLossReportView.grossSoldUnit = 0;
    this.feederLossReportView.grossCurrentDemand = 0;
    this.feederLossReportView.grossCollection = 0;
    this.feederLossReportView.grossConsumption = 0;
    this.feederLossReportView.grossLoss = 0;
  }

  calculateTotal(report){
    report.generatedOn = new Date(report.generatedOn).toDateString();
    this.feederLossReportView.grossInput = this.globalResources.getValueAsNumberWithFixed((this.feederLossReportView.grossInput + report.netFeederInput), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    this.feederLossReportView.grossSoldUnit = this.globalResources.getValueAsNumberWithFixed((this.feederLossReportView.grossSoldUnit + report.totalSoldUnit), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    this.feederLossReportView.grossCurrentDemand = this.globalResources.getValueAsNumberWithFixed((this.feederLossReportView.grossCurrentDemand + report.totalCurrentDemand), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    this.feederLossReportView.grossCollection = this.globalResources.getValueAsNumberWithFixed((this.feederLossReportView.grossCollection + report.totalCollection), GlobalConstants.CALCULATION_ROUNDING_SCALE);
  }

  calculateGrossLoss(){
    var loss = this.globalResources.getValueAsNumberWithFixed((this.feederLossReportView.grossInput - this.feederLossReportView.grossConsumption), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    loss = this.globalResources.getValueAsNumberWithFixed((loss / this.feederLossReportView.grossInput), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    loss = this.globalResources.getValueAsNumberWithFixed((loss * 100), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    this.feederLossReportView.grossLoss = Math.round(loss*100)/100;
  }
  
  roundOffAllValues(){
    this.feederLossReportView.grossInput = Math.round(this.feederLossReportView.grossInput * 100)/100;
  }

  openModal(){
    this.display = 'block';
  }

  closeModal(){
    this.display = 'none';
  }

  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 10;
    this.pagedFeederList = [];
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.feederList.length, page, this.pageSize);
    this.pagedFeederList = this.feederList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
