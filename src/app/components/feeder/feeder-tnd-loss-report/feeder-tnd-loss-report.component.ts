import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-feeder-tnd-loss-report',
  templateUrl: './feeder-tnd-loss-report.component.html',
  styleUrls: ['./feeder-tnd-loss-report.component.css']
})
export class FeederTndLossReportComponent implements OnInit {

  COMPONENT_NAME: "FeederTndLossReportComponent";
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
  feederLossReportView : any = {};
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants, private feederService : FeederService, 
    private substationService: SubstationService, private zoneService: ZoneService, private paginationService : PaginationService) { }

  ngOnInit() {
    this.userDetails = {};
    this.substationList = null;
    this.user = this.globalResources.getUserDetails();
    this.checkUserRoll(this.user);
  }

  checkUserRoll(user){
    this.zoneList = [];
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
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
      this.zoneList = null;
      this.userDetails.zone = undefined;
      this.substationList = null;
      this.userDetails.substation = undefined;
      this.feederList = null;
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
    this.substationList = null;
    this.userDetails.substation = undefined;
    this.feederList = null;
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
    this.feederList = null;
    this.userDetails.feeder = undefined; 
  }
  
  searchClicked(){
    this.showError = false;
    this.reportGenerated = false;
    this.generating = false;
    this.getFeederBySubstationId(this.userDetails.substation.id);

  }

  getFeederBySubstationId(substationId){
    let methodName = "getFeederBySubstationId"
    this.feederList = [];
    this._searchClicked = true;
    let billingMonth = this.billMonth + "-" + this.billMonthYear;
    this.feederService.getFeedersForLossGenerationBySubstationId(substationId, billingMonth).subscribe(successResponese =>{
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
    this.feederService.generateFeedertndLossReport(feeder, billingMonth.toUpperCase(), this.user.username).subscribe(successResponse =>{
      let generatedReport = <any>successResponse;
      feeder.generatingSingleReport = false;
      feeder.singleReportGenerated = true;
      let alertResponse = this.globalResources.successAlert("Report Generated Successfully");
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
    let billingMonth = this.billMonth + "-" + this.billMonthYear;
    this.getFeederTnDLossReportBySubstationId(this.userDetails.substation.id, billingMonth)
  }

  getFeederTnDLossReportBySubstationId(substationnId, billMonth){
    this.feederService.getFeederTnDLossBySubstationId(substationnId, billMonth).subscribe(success =>{
      //console.log(success);
      this.feederLossReportView.feederLossReports = success;
      this.intializeGrossValues();
      this.feederLossReportView.feederLossReports.forEach(report => {
        this.calculateTotal(report);
      });
      this.calculateGrossLoss();
      this.roundOffAllValues();
      console.log(this.feederLossReportView);
      this.openModal();
    }, error =>{
      console.log(error);
    });
  }

  intializeGrossValues(){
    this.feederLossReportView.grossAssessment = 0;
    this.feederLossReportView.grossInput = 0;
    this.feederLossReportView.grossHTConsumer = 0;
    this.feederLossReportView.grossHTConsumption = 0;
    this.feederLossReportView.grossConsumer = 0;
    this.feederLossReportView.grossLTConsumption = 0;
    this.feederLossReportView.grossConsumption = 0;
    this.feederLossReportView.grossExportPoints = 0;
    this.feederLossReportView.grossExportUnits = 0;
    this.feederLossReportView.grossLoss = 0;
  }

  calculateTotal(report){
    report.generatedOn = new Date(report.generatedOn).toDateString();
    report.totalConsumption = parseFloat(report.netHTConsumption) + parseFloat(report.totalSoldUnit);
    this.feederLossReportView.grossAssessment = this.feederLossReportView.grossAssessment + parseInt(report.assessmentUnit);
    this.feederLossReportView.grossInput = this.feederLossReportView.grossInput + parseFloat(report.netFeederInput);
    this.feederLossReportView.grossHTConsumer = this.feederLossReportView.grossHTConsumer + parseInt(report.totalHTConsumer);
    this.feederLossReportView.grossHTConsumption = this.feederLossReportView.grossHTConsumption + parseFloat(report.netHTConsumption);
    this.feederLossReportView.grossConsumer = this.feederLossReportView.grossConsumer + parseInt(report.totalConsumer);
    this.feederLossReportView.grossLTConsumption = this.feederLossReportView.grossConsumption + parseFloat(report.totalSoldUnit);
    this.feederLossReportView.grossConsumption = this.feederLossReportView.grossConsumption + report.totalConsumption;	
    this.feederLossReportView.grossExportPoints = this.feederLossReportView.grossExportPoints + parseInt(report.exportPoint);    
    this.feederLossReportView.grossExportUnits = this.feederLossReportView.grossExportUnits + parseFloat(report.exportConsumption);
  }

  calculateGrossLoss(){
    var loss = this.feederLossReportView.grossInput - this.feederLossReportView.grossConsumption;
    loss = loss / this.feederLossReportView.grossInput;
    loss = loss * 100;
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
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.feederList.length, page, this.pageSize);
    this.pagedFeederList = this.feederList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
