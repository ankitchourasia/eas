import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { DtrService } from '@eas-services/dtr-service/dtr.service';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { DivisionService } from '@eas-services/division-service/division.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { BillFileService } from '@eas-services/bill-file-service/bill-file.service';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-dtr-pre-billing',
  templateUrl: './dtr-pre-billing.component.html',
  styleUrls: ['./dtr-pre-billing.component.css']
})
export class DtrPreBillingComponent implements OnInit {

  COMPONENT_NAME: string = "DtrPreBillingComponent";
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
  _searchClicked: boolean;
  allDtrReadingInserted: boolean;
  
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants, private dtrService : DtrService, 
    private feederService : FeederService, private substationService: SubstationService, private regionService: RegionService, 
    private circleService: CircleService, private divisionService: DivisionService, private zoneService: ZoneService,
    private billFileService: BillFileService, private paginationService : PaginationService) { }

    ngOnInit() {
      this.setInitialValue();
      this.checkUserRoll();
    }

    setInitialValue(){
      this.userDetails = {};
      this.dtrList = [];
      this.pagedDtrList = [];
      this.dtrReadingList = [];
      this.feederList = [];
      this.zoneList = [];
      this.regionList = [];
      this.circleList = [];
      this.divisionList = [];
      this.substationList = [];
    }
  
    checkUserRoll(){
      
      this.user = this.globalResources.getUserDetails();
      if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
        this.getRegionList();
      }else if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
        // this.zoneList = (this.user.zoneList);
        this.getZoneListByDivisionId(this.user.division.id);
        this.regionList.push(this.user.region);
        this.circleList.push(this.user.circle);
        this.divisionList.push(this.user.division);
        this.userDetails.region = this.user.region;
        this.userDetails.circle = this.user.circle;
        this.userDetails.division = this.user.division;
      }else if(this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
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
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.circleList = [];
      this.userDetails.circle = undefined;
      this.divisionList = [];
      this.userDetails.division = undefined;
      this.zoneList = [];
      this.userDetails.zone = undefined;
      this.substationList = [];
      this.userDetails.substation = undefined;
      this.feederList = [];
      this.userDetails.feeder = undefined;
      this.dtrList = [];
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
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.divisionList = [];
      this.userDetails.division = undefined;
      this.zoneList = [];
      this.userDetails.zone = undefined;
      this.substationList = [];
      this.userDetails.substation = undefined;
      this.feederList = [];
      this.userDetails.feeder = undefined;
      this.dtrList = [];
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
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.zoneList = [];
      this.userDetails.zone = undefined;
      this.substationList = [];
      this.userDetails.substation = undefined;
      this.feederList = [];
      this.userDetails.feeder = undefined;
      this.dtrList = [];
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
    this.dtrList = [];
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
    this.dtrList = [];
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
    this.dtrList = [];
    this.userDetails.dtr = undefined;
    // this.getDTRByFeederId(feeder.id);
  }

  searchClicked(){
    this.dtrReadingList = [];
    this.showError = false;
    this.allDtrReadingInserted = false;
    // this.reportGenerated = false;
    // this.generating = false;
    this.getDTRByFeederId(this.userDetails.feeder.id);
  }

  getDTRByFeederId(feederId){
    let methodName = "getDTRByFeederId";
    this._searchClicked = true;
    this.dtrList = [];
    this.dtrService.getDTRByFeederId(feederId).subscribe(successResponse =>{
      this._searchClicked = false;
      this.dtrList = successResponse;
      this.initializePaginationVariables();
      if(this.dtrList && this.dtrList.length){
        this.setPage(1);
        let billingMonth = this.billMonth + "-" + this.billMonthYear;
        this.getDTRReadingByFeederIdAndBillMonth(this.userDetails.feeder.id, billingMonth);
      }
    }, errorResponse=>{
      this._searchClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  getDTRReadingByFeederIdAndBillMonth(feederId, billMonth){
    let methodName = "getDTRReadingByFeederIdAndBillMonth";
    this._searchClicked = true;
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
      this._searchClicked = false;
      this.getDtrPreBillingReportsByFeederIdAndBillMonth(this.userDetails.feeder.id, billMonth);
    }, errorResponse=>{
      this._searchClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
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
    let methodName = "getDtrPreBillingReportsByFeederIdAndBillMonth";
    this._searchClicked = true;
    this.dtrService.getDtrPreBillingReportsByFeederIdAndBillMonth(feederId, billMonth, false).subscribe(successResponse =>{
      this.dtrPreBillingReports = successResponse;
      if(this.dtrPreBillingReports){
        this.dtrList.forEach((dtr,index) => {
          this.checkPreBillingReportSaved(dtr,index);
        });
      }
      this._searchClicked = false;
      this.checkBillFileUploadedByFeederGroupNoAndBillMonth(this.userDetails.feeder.groupNo, billMonth);
    },errorResponse=>{
      this._searchClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  allDtrPrebillingInserted: boolean;
  checkPreBillingReportSaved(dtrToFind,index){
    let matchedDtrPreBillingReport =  this.dtrPreBillingReports.find(dtrPreBillingReport => dtrPreBillingReport.dtrId === dtrToFind.id);
    if(matchedDtrPreBillingReport && matchedDtrPreBillingReport.dtrId === dtrToFind.id){
      dtrToFind.prebillingInsertedForBillMonth = true;
      dtrToFind.prebilling = matchedDtrPreBillingReport;
      //Converting database values in float since input type on form is number
			// database values have string type
			dtrToFind.prebilling.preConsumption = Number(dtrToFind.prebilling.preConsumption);
			dtrToFind.prebilling.assUnit = Number(dtrToFind.prebilling.assUnit);
			dtrToFind.prebilling.assUnitConsumption = Number(dtrToFind.prebilling.assUnitConsumption);
			dtrToFind.prebilling.theftUnit = Number(dtrToFind.prebilling.theftUnit);
			dtrToFind.prebilling.theftUnitConsumption = Number(dtrToFind.prebilling.theftUnitConsumption);
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
    let methodName = "checkBillFileUploadedByFeederGroupNoAndBillMonth";
    this._searchClicked = true;
    this.billFileService.checkBillFileUploadedByFeederGroupNoAndBillMonth(feederGroupNo, billingMonth, false).subscribe(successResponse =>{
      let billFileRefs = <any>successResponse;
      if(billFileRefs && billFileRefs.length && (billFileRefs[0].billMonth === billingMonth || billFileRefs[1].billMonth === billingMonth)){
        this.userDetails.feeder.billFileUploaded = true;
        this.userDetails.feeder.billFileNotUploaded = false;
      }else{
        this.userDetails.feeder.billFileUploaded = false;
        this.userDetails.feeder.billFileNotUploaded = true;
      }
      this._searchClicked = false;
    },errorResponse =>{
      this._searchClicked = false;
      this.userDetails.feeder.billFileUploaded = false;
      this.userDetails.feeder.billFileNotUploaded = true;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
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
				let input = Number(dtr.prebilling.netDTRInput);
				let soldUnit = Number(dtr.prebilling.preConsumption);
				let difference = this.globalResources.getValueAsNumberWithFixed((input - soldUnit), GlobalConstants.CALCULATION_ROUNDING_SCALE);
				let temp = this.globalResources.getValueAsNumberWithFixed((difference/input), GlobalConstants.CALCULATION_ROUNDING_SCALE);
				let loss = this.globalResources.getValueAsNumberWithFixed((temp * 100), GlobalConstants.CALCULATION_ROUNDING_SCALE);
				let precisedLoss = Number(loss.toPrecision(4));
				precisedLoss = Math.round(precisedLoss * 100) / 100;
				dtr.prebilling.preBillingLoss = precisedLoss;
			}else{
				dtr.prebilling.preBillingLoss = null;
			}
		}else{
			dtr.prebilling.preBillingLoss = null;
    }
  }

  newUnitConsumptionChanged(dtr){
    let temp = Number(dtr.prebilling.preConsumption);
    if(dtr.prebilling.assUnitConsumption !== null && dtr.prebilling.assUnitConsumption !== undefined){
      temp = temp + Number(dtr.prebilling.assUnitConsumption);
    }
    if(dtr.prebilling.theftUnitConsumption !== null && dtr.prebilling.theftUnitConsumption !== undefined){
      temp = temp + Number(dtr.prebilling.theftUnitConsumption);
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
    if(dtr.prebilling.newPreConsumption !== null && dtr.prebilling.newPreConsumption !== undefined){
			let input = Number(dtr.prebilling.netDTRInput);
			let soldUnit = Number(dtr.prebilling.newPreConsumption);
			let difference = this.globalResources.getValueAsNumberWithFixed((input - soldUnit), GlobalConstants.CALCULATION_ROUNDING_SCALE);
			let temp = this.globalResources.getValueAsNumberWithFixed((difference/input), GlobalConstants.CALCULATION_ROUNDING_SCALE);
      let loss = this.globalResources.getValueAsNumberWithFixed((temp * 100), GlobalConstants.CALCULATION_ROUNDING_SCALE);
      let precisedLoss = Number(loss.toPrecision(4));
			precisedLoss = Math.round(precisedLoss * 100) / 100
			dtr.prebilling.newPreBillingLoss = precisedLoss;
		}else{
			dtr.prebilling.newPreBillingLoss = null;
		}
  }

  saveClicked(submitedForm,dtr){
    if(this.globalResources.validateForm(submitedForm)){
      let alertResponse = this.globalResources.confirmAlert("Are you sure to save this Pre Billing Activity. Activity once saved cannot be modified?");
      alertResponse.then((result) => {
        if(result.value) {
          if(dtr.prebilling){
            dtr.prebilling.savingSingleReport = true;
            dtr.prebilling.dtrId = dtr.id;
            dtr.prebilling.dtrReadingId = dtr.reading.id;
            dtr.prebilling.groupNo = dtr.feeder.groupNo;
            dtr.prebilling.readerNo = dtr.billingRDNo;
            dtr.prebilling.lossMonth = this.billMonth + "-" + this.billMonthYear;
            dtr.prebilling.savedBy = this.user.username;
            this.savePreBillingReport(dtr);
          }else{
            console.log("DTR Prebilling data is null cannot save.");
            console.log(dtr);
          }
        }
      });
    }
  }

  savePreBillingReport(dtr){
    let methodName = "savePreBillingReport";
    let billMonth = this.billMonth + "-" + this.billMonthYear;
    this.dtrService.savePreBillingReport(dtr.prebilling, billMonth, true).subscribe(successResponse =>{
      dtr.prebilling.savingSingleReport = false;
      dtr.prebilling.singleReportSaved = true;
    },errorResponse =>{
      dtr.prebilling.savingSingleReport = false;
      if(errorResponse && errorResponse.status === 417){
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
      }else{
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName, "Error while saving single dtr pre billing report.");
      }
    });
  }

  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 5;
    this.pagedDtrList = [];
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.dtrList.length, page, this.pageSize);
    this.pagedDtrList = this.dtrList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}