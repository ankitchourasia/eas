import { Component, OnInit } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';
import { GlobalConstants } from 'app/utility/global.constants';
import { DtrService } from '@eas-services/dtr-service/dtr.service';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { DivisionService } from '@eas-services/division-service/division.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { BillFileService } from '@eas-services/bill-file-service/bill-file.service';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import $ from 'jQuery';

@Component({
  selector: 'eas-dtr-loss-report',
  templateUrl: './dtr-loss-report.component.html',
  styleUrls: ['./dtr-loss-report.component.css']
})
export class DtrLossReportComponent implements OnInit {

  user : any;
  zoneList: any;
  regionList: any;
  circleList: any;
  divisionList: any;
  dtrList: any;
  feederList: any;
  substationList: any;
  dtrReadingList: any;
  userDetails: any;
  billMonth: any;
  billMonthYear: any;
  pager: any;
  pageSize: number;
  pagedDtrList : any;
  showError: boolean;
  generating: boolean;
  reportGenerated: boolean;
  searchButtonClicked: boolean;
  allDtrReadingInserted: boolean;
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants, private dtrService : DtrService, 
    private feederService : FeederService, private substationService: SubstationService, private regionService: RegionService, 
    private circleService: CircleService, private divisionService: DivisionService, private zoneService: ZoneService,
    private billFileService: BillFileService, private paginationService : PaginationService) { }

  ngOnInit() {
    this.userDetails = {};
    this.substationList = null;
    this.user = this.globalResources.getUserDetails();
    this.checkUserRoll(this.user);
    this.getCurrentYear();
  }

  checkUserRoll(user){
    this.zoneList = [];
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    if(user.role === this.globalConstants.ROLE_SUPER_ADMIN){
      this.getRegionList();
    }else if(user.role === this.globalConstants.ROLE_ADMIN){
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
      this.userDetails.circle = undefined;
      this.divisionList = null;
      this.userDetails.division = undefined;
      this.zoneList = null;
      this.userDetails.zone = undefined;
      this.substationList = null;
      this.userDetails.substation = undefined;
      this.feederList = null;
      this.userDetails.feeder = undefined;
      this.dtrList = null;
      this.userDetails.dtr = undefined;
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
      this.userDetails.division = undefined;
      this.zoneList = null;
      this.userDetails.zone = undefined;
      this.substationList = null;
      this.userDetails.substation = undefined;
      this.feederList = null;
      this.userDetails.feeder = undefined;
      this.dtrList = null;
      this.userDetails.dtr = undefined;
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
      this.userDetails.zone = undefined;
      this.substationList = null;
      this.userDetails.substation = undefined;
      this.feederList = null;
      this.userDetails.feeder = undefined;
      this.dtrList = null;
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
    this.dtrList = null;
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
    this.dtrList = null;
    this.userDetails.dtr = undefined;
    this.getFeederBySubstationId(substation.id);  
  }

  getFeederBySubstationId(substationId){
    this.feederService.getFeederBySubstationId(substationId).subscribe(successResponese =>{
      this.feederList = successResponese;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  feederChanged(feeder){
    this.dtrList = null;
    this.userDetails.dtr = undefined;
    // this.getDTRByFeederId(feeder.id);
  }


  searchClicked(){
    this.dtrReadingList = null;
    this.showError = false;
    this.allDtrReadingInserted = false;
    this.reportGenerated = false;
    this.generating = false;
    this.getDTRByFeederId(this.userDetails.feeder.id);

  }

  getDTRByFeederId(feederId){
    this.searchButtonClicked = true;
    this.dtrService.getDTRByFeederId(feederId).subscribe(successResponse =>{
      this.searchButtonClicked = false;
      this.dtrList = successResponse;
      this.initializePaginationVariables();
      this.setPage(1);
      if(this.dtrList && this.dtrList.length){
        let billingMonth = this.billMonth + "-" + this.billMonthYear;
        this.getDTRReadingByFeederIdAndBillMonth(this.userDetails.feeder.id, billingMonth);
      }
    }, errorResponse =>{
      console.log(errorResponse)
      this.searchButtonClicked = false;
    });
  }

  getDTRReadingByFeederIdAndBillMonth(feederId, billMonth){
    this.searchButtonClicked = true;
    this.dtrService.getReadingByFeederIdAndBillMonth(feederId, billMonth, false).subscribe(successResponse =>{
      this.dtrReadingList = successResponse;
      if(this.dtrReadingList){
        this.dtrList.forEach((dtr,index) => {
          this.checkReadingInserted(dtr,index);
          if(this.allDtrReadingInserted){
            this.showError = false;
          }else{
            this.showError = true;
          }
        });
      }
      this.searchButtonClicked = false;
      this.checkBillFileUploadedByFeederGroupNoAndBillMonth(this.userDetails.feeder.groupNo, billMonth);
    },errorResponse =>{
      console.log(errorResponse);
      this.searchButtonClicked = false;
    });
  }

  checkReadingInserted(dtrToFind,index){
    let matchedDtrReading =  this.dtrReadingList.find(dtrReading => dtrReading.dtrId === dtrToFind.id);
    if(matchedDtrReading && matchedDtrReading.dtrId === dtrToFind.id){
      dtrToFind.readingInsertedForBillMonth = true;
    }else{
      dtrToFind.readingInsertedForBillMonth = false;
    }
    if(index === 0){
      this.allDtrReadingInserted = dtrToFind.readingInsertedForBillMonth;
    }else{
      this.allDtrReadingInserted = !!(Number(this.allDtrReadingInserted) * Number(dtrToFind.readingInsertedForBillMonth));
    }
  }

  checkBillFileUploadedByFeederGroupNoAndBillMonth(feederGroupNo, billingMonth){
    this.searchButtonClicked = true;
    this.billFileService.checkBillFileUploadedByFeederGroupNoAndBillMonth(feederGroupNo, billingMonth, false).subscribe(successResponse =>{
      let billFileRefs = <any>successResponse;
      if(billFileRefs && billFileRefs.length && (billFileRefs[0].billMonth === billingMonth || billFileRefs[1].billMonth === billingMonth)){
        this.userDetails.feeder.billFileUploaded = true;
        this.userDetails.feeder.billFileNotUploaded = false;
      }else{
        this.userDetails.feeder.billFileUploaded = false;
        this.userDetails.feeder.billFileNotUploaded = true;
      }
      this.searchButtonClicked = false;
    },errorResponse =>{
      console.log(errorResponse);
      this.searchButtonClicked = false;
      this.userDetails.feeder.billFileUploaded = false;
      this.userDetails.feeder.billFileNotUploaded = true;
    });
  }

  generateAllDtrLossReport(){
    this.generating = true;
    let billingMonth = this.billMonth + "-" + this.billMonthYear;
    this.dtrService.generateAllDTRLossByFeederAndBillMonth(this.userDetails.feeder, billingMonth, true).subscribe(successResponse =>{
      let generatedReport = <any>successResponse;
      this.generating = false;
      this.reportGenerated = true
      let alertResponse = this.globalResources.successAlert("Report Generated Successfully for Feeder: <br><strong>" + 
          this.userDetails.feeder.name + " for Month : " + billingMonth + " with DTR LOSS: " + generatedReport.body.dtrLoss + "%</strong>");
    },errorResponse =>{
      console.log(errorResponse);
      this.generating = false;
      if(errorResponse.status === 417){
        this.reportGenerated = true;
        let alertResponse = this.globalResources.errorAlert(errorResponse.error.errorMessage);
      }
    });
  }

  generateSingleDtrLossReport(dtr){
    dtr.generatingSingleReport = true;
    let billingMonth = this.billMonth + "-" + this.billMonthYear;
    this.dtrService.generateDTRLossByDtrAndBillMonth(dtr, billingMonth, true).subscribe(successResponse =>{
      let generatedReport = <any>successResponse;
      console.log(generatedReport);
      dtr.generatingSingleReport = false;
      dtr.singleReportGenerated = true;
      let alertResponse = this.globalResources.successAlert("Report Generated Successfully");
    },errorResponse =>{
      console.log(errorResponse);
      dtr.generatingSingleReport = false;
      if(errorResponse.status === 417){
        dtr.generatingSingleReport = false;
        dtr.singleReportGenerated = true;
        let alertResponse = this.globalResources.errorAlert(errorResponse.error.errorMessage);
      }
    });
  }

  dtrLossReports: any
  display: any = 'none';
  viewDtrLossReport(){
    this.display= 'none';
    this.dtrLossReports = null;
    let billingMonth = this.billMonth + "-" + this.billMonthYear;
    this.dtrService.getDTRLossReportByFeederIdAndBillMonth(this.userDetails.feeder.id, billingMonth, false).subscribe(successResponse =>{
    this.dtrLossReports = <any>successResponse;
    console.log(this.dtrLossReports);
    if(this.dtrLossReports && this.dtrLossReports.length){
      this.openModal();
      this.dtrLossReports.forEach((dtrLossReport,index) => {
        this.calculateTotal(dtrLossReport, index);
      });
      this.calculateGrossLoss();
      this.roundOffAllValues();
    }
    },errorResponse =>{
      console.log(errorResponse);
      let alertResponse = this.globalResources.errorAlert("DTR LOSS REPORT does not exists!");
    });
  }

  openModal(){
    this.display = 'block';
  }

  closeModal(){
    this.display = 'none';
  }

  grossInput: number = 0;
  grossConsumer: number = 0;
  grossConsumption: number = 0;
  grossAssessment: number = 0;
  calculateTotal(report,index){
    this.grossInput = this.grossInput + parseInt(report.netDTRInput);
    this.grossConsumer = this.grossConsumer + parseInt(report.totalConsumer);
    this.grossConsumption = this.grossConsumption + parseInt(report.totalSoldUnit);
    this.grossAssessment = this.grossAssessment + parseInt(report.assessmentUnit);
  }

  grossLoss: any = 0;
  calculateGrossLoss(){
    if(this.grossInput == 0){
      this.grossLoss = '###';
    }else{
      let loss = this.grossInput - this.grossConsumption;
      loss = loss / this.grossInput;
      loss = loss * 100;
      this.grossLoss = Math.round(loss*100)/100;
    }
  }

  roundOffAllValues(){
    this.grossInput = Math.round(this.grossInput * 100)/100;
  }

  exportTotalConsumers(report){
    let user = this.globalResources.getUserDetails();
    let encodedCredentials = sessionStorage.getItem('encodedCredentials');
    console.log('Basic ' + encodedCredentials);
    console.log("Fetching consumers for report : ",report);
    let params = {
      Authorization: "Basic%20c29uYWxfZWFzdDpzb25hbCMxMjM%3D",
      locationCode: report.zoneLocationCode,
      billMonth: report.lossMonth,
      groupNo: report.billingGroupNo,
      readerNo: report.billingRDNo
    };
  
    let fileUrl = window.location.origin+"/backend/dtrloss/consumers/export";
    // Add authentication headers in URL
    let url = [fileUrl, $.param(params)].join('?');
    window.open(url);
  }

  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 10;
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.dtrList.length, page, this.pageSize);
    this.pagedDtrList = this.dtrList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  years: any = [];
  getCurrentYear(){
    let year = 2016;
    while(year <= 2050){
      this.years.push(year++);
    }
  }
}
