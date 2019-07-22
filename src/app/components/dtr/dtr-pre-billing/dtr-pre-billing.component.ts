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

@Component({
  selector: 'eas-dtr-pre-billing',
  templateUrl: './dtr-pre-billing.component.html',
  styleUrls: ['./dtr-pre-billing.component.css']
})
export class DtrPreBillingComponent implements OnInit {

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
      this.userDetails = {};
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
        this.userDetails.region = this.user.region;
        this.userDetails.circle = this.user.circle;
        this.userDetails.division = this.user.division;
      }else if(this.user.role === this.globalConstants.ROLE_FIELD_ADMIN){
        this.zoneList.push(this.user.zone);
        this.regionList.push(this.user.region);
        this.circleList.push(this.user.circle);
        this.divisionList.push(this.user.division);
        this.userDetails.region = this.user.region;
        this.userDetails.circle = this.user.circle;
        this.userDetails.division = this.user.division;
        this.userDetails.zone = this.user.zone;
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
    // this.reportGenerated = false;
    // this.generating = false;
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
      this.globalResources.errorAlert(errorResponse.error.errorMessage);
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
      this.getDtrPreBillingReportsByFeederIdAndBillMonth(this.userDetails.feeder.id, billMonth);
    },errorResponse =>{
      console.log(errorResponse);
      this.searchButtonClicked = false;
      this.globalResources.errorAlert(errorResponse.error.errorMessage);
    });
  }

  checkReadingInserted(dtrToFind,index){
    let matchedDtrReading =  this.dtrReadingList.find(dtrReading => dtrReading.dtrId === dtrToFind.id);
    if(matchedDtrReading && matchedDtrReading.dtrId === dtrToFind.id){
      dtrToFind.readingInsertedForBillMonth = true;
      dtrToFind.reading = matchedDtrReading;
    }else{
      dtrToFind.readingInsertedForBillMonth = false;
    }
    if(index === 0){
      this.allDtrReadingInserted = dtrToFind.readingInsertedForBillMonth;
    }else{
      this.allDtrReadingInserted = !!(Number(this.allDtrReadingInserted) * Number(dtrToFind.readingInsertedForBillMonth));
    }
  }

  dtrPreBillingReports: any;
  getDtrPreBillingReportsByFeederIdAndBillMonth(feederId, billMonth){
    this.searchButtonClicked = true;
    this.dtrService.getDtrPreBillingReportsByFeederIdAndBillMonth(feederId, billMonth, false).subscribe(successResponse =>{
      this.dtrPreBillingReports = successResponse;
      if(this.dtrPreBillingReports){
        this.dtrList.forEach((dtr,index) => {
          this.checkPreBillingReportSaved(dtr,index);
        });
      }
      this.searchButtonClicked = false;
      this.checkBillFileUploadedByFeederGroupNoAndBillMonth(this.userDetails.feeder.groupNo, billMonth);
    }, errorResponse =>{
      console.log(errorResponse);
      this.searchButtonClicked = false;
      this.globalResources.errorAlert(errorResponse.error.errorMessage);
    })
  }

  allDtrPrebillingInserted: boolean;
  checkPreBillingReportSaved(dtrToFind,index){
    let matchedDtrPreBillingReport =  this.dtrPreBillingReports.find(dtrPreBillingReport => dtrPreBillingReport.dtrId === dtrToFind.id);
    if(matchedDtrPreBillingReport && matchedDtrPreBillingReport.dtrId === dtrToFind.id){
      dtrToFind.prebillingInsertedForBillMonth = true;
      dtrToFind.prebilling = matchedDtrPreBillingReport;
      //Converting database values in float since input type on form is number
			// database values have string type
			dtrToFind.prebilling.preConsumption = parseFloat(dtrToFind.prebilling.preConsumption);
			dtrToFind.prebilling.assUnit = parseFloat(dtrToFind.prebilling.assUnit);
			dtrToFind.prebilling.assUnitConsumption = parseFloat(dtrToFind.prebilling.assUnitConsumption);
			dtrToFind.prebilling.theftUnit = parseFloat(dtrToFind.prebilling.theftUnit);
			dtrToFind.prebilling.theftUnitConsumption = parseFloat(dtrToFind.prebilling.theftUnitConsumption);
    }else{
      dtrToFind.prebillingInsertedForBillMonth = false;
      if(dtrToFind.reading){
				dtrToFind.prebilling = {};
				dtrToFind.prebilling.netDTRInput = dtrToFind.reading.totalConsumption;
      }
    }
    if(index === 0){
      this.allDtrPrebillingInserted = dtrToFind.prebillingInsertedForBillMonth;
    }else{
      this.allDtrPrebillingInserted = !!(Number(this.allDtrPrebillingInserted) * Number(dtrToFind.prebillingInsertedForBillMonth));
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
      this.globalResources.errorAlert(errorResponse.error.errorMessage);
    });
  }

  preSoldUnitChanged(dtr){
    dtr.prebilling.preBillingLoss = undefined;
		dtr.prebilling.newPreConsumption = undefined;
		dtr.prebilling.assUnitConsumption = undefined;
		dtr.prebilling.theftUnitConsumption = undefined;
    dtr.prebilling.newPreBillingLoss = undefined;
    this.calculatePreBillingLoss(dtr);
  }

  calculatePreBillingLoss(dtr){
    console.log("calculating prebilling loss for dtr: " + dtr);
    if(dtr.prebilling.netDTRInput !== null && dtr.prebilling.netDTRInput !== undefined){
      // let preConsumption = dtr.prebilling.preConsumption;
      if(dtr.prebilling.preConsumption !== null && dtr.prebilling.preConsumption !== undefined){
				let input = parseFloat(dtr.prebilling.netDTRInput);
				let soldUnit = parseFloat(dtr.prebilling.preConsumption);
				let difference = input - soldUnit;
				let temp = difference/input;
				let loss = temp * 100;
				console.log("Actual Loss : " + loss);
				let precisedLoss = Number(loss.toPrecision(4));
				precisedLoss = Math.round(precisedLoss * 100) / 100;
				console.log("Precised Loss : " + precisedLoss);
				dtr.prebilling.preBillingLoss = precisedLoss;
			}else{
				console.log("DTR ccnb consumption is null");
				dtr.prebilling.preBillingLoss = null;
			}
		}else{
			console.log("DTR Consumption is null");
			dtr.prebilling.preBillingLoss = null;
    }
  }

  newUnitConsumptionChanged(dtr){
    console.log("New Unit Consumption Changed for dtr " + dtr.dtrName);
    let temp = parseFloat(dtr.prebilling.preConsumption);
    if(dtr.prebilling.assUnitConsumption !== null && dtr.prebilling.assUnitConsumption !== undefined){
      temp = temp + parseFloat(dtr.prebilling.assUnitConsumption);
    }
    if(dtr.prebilling.theftUnitConsumption !== null && dtr.prebilling.theftUnitConsumption !== undefined){
      temp = temp + parseFloat(dtr.prebilling.theftUnitConsumption);
		}
		if((dtr.prebilling.assUnitConsumption === null || dtr.prebilling.assUnitConsumption === undefined) &&
      (dtr.prebilling.theftUnitConsumption === null || dtr.prebilling.theftUnitConsumption === undefined)){
      dtr.prebilling.newPreConsumption = null;
      dtr.prebilling.newPreBillingLoss = null;
		}else{
      temp = Math.round(temp * 100) / 100;
      dtr.prebilling.newPreConsumption = temp;
      this.calculateNewPreBillingLoss(dtr);
		}
  }

  calculateNewPreBillingLoss(dtr){
    console.log("Calculating new pre billing loss for dtr: " + dtr.dtrName);
    if(dtr.prebilling.newPreConsumption !== null && dtr.prebilling.newPreConsumption !== undefined){
			let input = parseFloat(dtr.prebilling.netDTRInput);
			let soldUnit = parseFloat(dtr.prebilling.newPreConsumption);
			let difference = input - soldUnit;
			let temp = difference/input;
      let loss = temp * 100;
      console.log("New Actual Loss : " + loss);
			let precisedLoss = Number(loss.toPrecision(4));
			precisedLoss = Math.round(precisedLoss * 100) / 100
			console.log("New Precised Loss : " + precisedLoss);
			dtr.prebilling.newPreBillingLoss = precisedLoss;
		}else{
			console.log("New sold unit is null hence setting new pre billing loss as null");
			dtr.prebilling.newPreBillingLoss = null;
		}
  }

  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 5;
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.dtrList.length, page, this.pageSize);
    this.pagedDtrList = this.dtrList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}