import { Component, OnInit } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';
import { GlobalConstants } from 'app/utility/global.constants';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { PaginationService } from '@eas-services/pagination/pagination.service';

@Component({
  selector: 'eas-feeder-atnc-loss-report',
  templateUrl: './feeder-atnc-loss-report.component.html',
  styleUrls: ['./feeder-atnc-loss-report.component.css']
})
export class FeederAtncLossReportComponent implements OnInit {

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
  searchButtonClicked: boolean;
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
   if(user.role === this.globalConstants.ROLE_ADMIN){
      this.zoneList = (user.zoneList);
      this.regionList.push(user.region);
      this.circleList.push(user.circle);
      this.divisionList.push(user.division);
      this.userDetails.region = user.region;
      this.userDetails.circle = user.circle;
      this.userDetails.division = user.division;
    }else if(user.role === this.globalConstants.ROLE_FIELD_ADMIN){
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
    if(this.user.role === this.globalConstants.ROLE_SUPER_ADMIN){
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
    this.zoneList = this.user.zoneList;
    this.zoneService.getZonseByDivisionId(divisionId, false).subscribe(successResponse =>{
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

  getFeederBySubstationId(substationId){
    let billingMonth = this.billMonth + "-" + this.billMonthYear;
    this.feederService.getFeedersForATnCLossGenerationBySubstationId(substationId, billingMonth).subscribe(successResponese =>{
      this.feederList = successResponese;
      console.log(this.feederList);
      this.initializePaginationVariables();
      this.setPage(1);
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  searchClicked(){
    this.showError = false;
    this.reportGenerated = false;
    this.generating = false;
    this.getFeederBySubstationId(this.userDetails.substation.id);

  }

  generateSingleFeederLossReport(feeder){
    feeder.generatingSingleReport = true;
    let billingMonth = this.billMonth + "-" + this.billMonthYear;
    console.log(feeder);
    this.feederService.generateFeederATnCLossReport(feeder, billingMonth.toUpperCase(), this.user.username).subscribe(successResponse =>{
      let generatedReport = <any>successResponse;
      console.log(generatedReport);
      feeder.generatingSingleReport = false;
      feeder.singleReportGenerated = true;
      let alertResponse = this.globalResources.successAlert("Report Generated Successfully");
    },errorResponse =>{
      console.log(errorResponse);
      feeder.generatingSingleReport = false;
      if(errorResponse.status === 417){
        feeder.generatingSingleReport = false;
        feeder.singleReportGenerated = true;
        let alertResponse = this.globalResources.errorAlert(errorResponse.error.errorMessage);
      }
    });
  }

  viewFeederLossReport(){
    let billingMonth = this.billMonth + "-" + this.billMonthYear;
    this.getFeederATnCLossReportBySubstationId(this.userDetails.substation.id, billingMonth)
  }

  getFeederATnCLossReportBySubstationId(substationnId, billMonth){
    this.feederService.getFeederATnCLossBySubstationId(substationnId, billMonth).subscribe(success =>{
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
    this.feederLossReportView.grossInput = 0;
    this.feederLossReportView.grossSoldUnit = 0;
    this.feederLossReportView.grossCurrentDemand = 0;
    this.feederLossReportView.grossCollection = 0;
    this.feederLossReportView.grossConsumption = 0;
    this.feederLossReportView.grossLoss = 0;
  }

  calculateTotal(report){
    report.generatedOn = new Date(report.generatedOn).toDateString();
    this.feederLossReportView.grossInput = this.feederLossReportView.grossInput + parseFloat(report.netFeederInput);
    this.feederLossReportView.grossSoldUnit = this.feederLossReportView.grossSoldUnit + parseFloat(report.totalSoldUnit);
    this.feederLossReportView.grossCurrentDemand = this.feederLossReportView.grossCurrentDemand + parseFloat(report.totalCurrentDemand);
    this.feederLossReportView.grossCollection = this.feederLossReportView.grossCollection + parseFloat(report.totalCollection);
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
