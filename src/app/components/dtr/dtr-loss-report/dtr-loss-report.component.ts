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
import { GlobalConfiguration } from 'app/utility/global-configuration';

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
  searchFormData: any;
  // billMonth: any;
  // billMonthYear: any;
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
    this.checkUserRoll();
  }

  checkUserRoll(){
    this.searchFormData = {};
    this.zoneList = [];
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    this.substationList = null;
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
      this.getSubstationByZoneId(this.searchFormData.zone.id);
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
      this.substationList = null;
      this.searchFormData.substation = undefined;
      this.feederList = null;
      this.searchFormData.feeder = undefined;
      this.dtrList = null;
      this.searchFormData.dtr = undefined;
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
      this.substationList = null;
      this.searchFormData.substation = undefined;
      this.feederList = null;
      this.searchFormData.feeder = undefined;
      this.dtrList = null;
      this.searchFormData.dtr = undefined;
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
      this.substationList = null;
      this.searchFormData.substation = undefined;
      this.feederList = null;
      this.searchFormData.feeder = undefined;
      this.dtrList = null;
      this.searchFormData.dtr = undefined;
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
    this.searchFormData.substation = undefined;
    this.feederList = null;
    this.searchFormData.feeder = undefined;
    this.dtrList = null;
    this.searchFormData.dtr = undefined;
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
    this.searchFormData.feeder = undefined;
    this.dtrList = null;
    this.searchFormData.dtr = undefined;
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
    this.searchFormData.dtr = undefined;
    // this.getDTRByFeederId(feeder.id);
  }

  billMonthChanged(){
    if(this.searchFormData.billMonth && this.searchFormData.billMonthYear){
      this.searchFormData.billingMonth = this.searchFormData.billMonth + "-" + this.searchFormData.billMonthYear;
    }
  }

  billMonthYearChanged(){
    if(this.searchFormData.billMonth && this.searchFormData.billMonthYear){
      this.searchFormData.billingMonth = this.searchFormData.billMonth + "-" + this.searchFormData.billMonthYear;
    }
  }

  searchClicked(){
    this.dtrReadingList = null;
    this.showError = false;
    this.allDtrReadingInserted = false;
    this.reportGenerated = false;
    this.generating = false;
    if(this.searchFormData.feeder && this.searchFormData.feeder.id && this.searchFormData.billingMonth){
      this.getDTRByFeederId(this.searchFormData.feeder.id);
    }else{
      console.log("feeder/billingMonth missing");
    }
  }

  getDTRByFeederId(feederId){
    this.searchButtonClicked = true;
    this.dtrService.getDTRByFeederId(feederId).subscribe(successResponse =>{
      this.searchButtonClicked = false;
      this.dtrList = successResponse;
      this.initializePaginationVariables();
      this.setPage(1);
      if(this.dtrList && this.dtrList.length){
        // let billingMonth = this.billMonth + "-" + this.billMonthYear;
        this.getDTRReadingByFeederIdAndBillMonth(this.searchFormData.feeder.id, this.searchFormData.billingMonth);
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
      this.checkBillFileUploadedByFeederGroupNoAndBillMonth(this.searchFormData.feeder.groupNo, billMonth);
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
        this.searchFormData.feeder.billFileUploaded = true;
        this.searchFormData.feeder.billFileNotUploaded = false;
      }else{
        this.searchFormData.feeder.billFileUploaded = false;
        this.searchFormData.feeder.billFileNotUploaded = true;
      }
      this.searchButtonClicked = false;
    },errorResponse =>{
      console.log(errorResponse);
      this.searchButtonClicked = false;
      this.searchFormData.feeder.billFileUploaded = false;
      this.searchFormData.feeder.billFileNotUploaded = true;
    });
  }

  generateAllDtrLossReport(){
    this.generating = true;
    // let billingMonth = this.billMonth + "-" + this.billMonthYear;
    this.dtrService.generateAllDTRLossByFeederAndBillMonth(this.searchFormData.feeder, this.searchFormData.billingMonth, true).subscribe(successResponse =>{
      let generatedReport = <any>successResponse;
      this.generating = false;
      this.reportGenerated = true
      let alertResponse = this.globalResources.successAlert("Report Generated Successfully for Feeder: <br><strong>" + 
          this.searchFormData.feeder.name + " for Month : " + this.searchFormData.billingMonth + " with DTR LOSS: " + generatedReport.body.dtrLoss + "%</strong>");
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
    // let billingMonth = this.billMonth + "-" + this.billMonthYear;
    this.dtrService.generateDTRLossByDtrAndBillMonth(dtr, this.searchFormData.billingMonth, true).subscribe(successResponse =>{
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

  display: any = 'none';
  viewDtrLossReport(){
    this.openModal();
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
    this.pager = this.paginationService.getPager(this.dtrList.length, page, this.pageSize);
    this.pagedDtrList = this.dtrList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
