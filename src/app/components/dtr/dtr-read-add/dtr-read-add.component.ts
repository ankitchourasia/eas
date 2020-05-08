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
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-dtr-read-add',
  templateUrl: './dtr-read-add.component.html',
  styleUrls: ['./dtr-read-add.component.css']
})
export class DtrReadAddComponent implements OnInit {

  COMPONENT_NAME: string = "DtrReadAddComponent";
  user : any;
  zoneList: any;
  regionList: any;
  circleList: any;
  divisionList: any;
  dtrList: any;
  feederList: any;
  substationList: any;
  dtrReadAdd: any;
  _submitClicked : boolean;

  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants, private dtrService : DtrService, 
    private feederService : FeederService, private substationService: SubstationService, private regionService: RegionService, 
    private circleService: CircleService, private divisionService: DivisionService, private zoneService: ZoneService) { }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.dtrReadAdd = {};
    this.zoneList = [];
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    this.substationList = [];
    this.meterReplacementButtonClicked = false;
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.getRegionList();
    }else if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
      // this.zoneList = (this.user.zoneList);
      this.getZoneListByDivisionId(this.user.division.id);
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      this.dtrReadAdd.region = this.user.region;
      this.dtrReadAdd.circle = this.user.circle;
      this.dtrReadAdd.division = this.user.division;
    }else if(this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
      this.zoneList.push(this.user.zone);
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      this.dtrReadAdd.region = this.user.region;
      this.dtrReadAdd.circle = this.user.circle;
      this.dtrReadAdd.division = this.user.division;
      this.dtrReadAdd.zone = this.user.zone;
      this.getSubstationByZoneId(this.dtrReadAdd.zone.id);
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
      this.dtrReadAdd.circle = undefined;
      this.divisionList = [];
      this.dtrReadAdd.division = undefined;
      this.zoneList = [];
      this.dtrReadAdd.zone = undefined;
      this.substationList = [];
      this.dtrReadAdd.substation = undefined;
      this.feederList = [];
      this.dtrReadAdd.feeder = undefined;
      this.dtrList = [];
      this.dtrReadAdd.dtr = undefined;
      this.dtrPreviousReading = null;
      this.setPreviousReadingData(this.dtrPreviousReading);
      this.cancleMeterReplacementClicked();
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
      this.dtrReadAdd.division = undefined;
      this.zoneList = [];
      this.dtrReadAdd.zone = undefined;
      this.substationList = [];
      this.dtrReadAdd.substation = undefined;
      this.feederList = [];
      this.dtrReadAdd.feeder = undefined;
      this.dtrList = [];
      this.dtrReadAdd.dtr = undefined;
      this.dtrPreviousReading = null;
      this.setPreviousReadingData(this.dtrPreviousReading);
      this.cancleMeterReplacementClicked();
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
      this.dtrReadAdd.zone = undefined;
      this.substationList = [];
      this.dtrReadAdd.substation = undefined;
      this.feederList = [];
      this.dtrReadAdd.feeder = undefined;
      this.dtrList = [];
      this.dtrReadAdd.dtr = undefined;
      this.dtrPreviousReading = null;
      this.setPreviousReadingData(this.dtrPreviousReading);
      this.cancleMeterReplacementClicked();
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
    this.dtrReadAdd.substation = undefined;
    this.feederList = [];
    this.dtrReadAdd.feeder = undefined;
    this.dtrList = [];
    this.dtrReadAdd.dtr = undefined;
    this.dtrPreviousReading = null;
    this.setPreviousReadingData(this.dtrPreviousReading);
    this.cancleMeterReplacementClicked();
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
    this.dtrReadAdd.feeder = undefined;
    this.dtrList = [];
    this.dtrReadAdd.dtr = undefined;
    this.dtrPreviousReading = null;
    this.setPreviousReadingData(this.dtrPreviousReading);
    this.cancleMeterReplacementClicked();
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
    this.dtrReadAdd.dtr = undefined;
    this.dtrPreviousReading = null;
    this.setPreviousReadingData(this.dtrPreviousReading);
    this.cancleMeterReplacementClicked();
    this.getDTRByFeederId(feeder.id);
  }

  getDTRByFeederId(feederId){
    this.dtrService.getDTRByFeederId(feederId).subscribe(successResponse =>{
      console.log(successResponse);
      this.dtrList = successResponse;
    }, errorResponse =>{
      console.log(errorResponse)
    });
  }

  dtrChanged(dtr){
    this.dtrPreviousReading = null;
    this.setPreviousReadingData(this.dtrPreviousReading);
    this.cancleMeterReplacementClicked();
    this.getLastInsertedReadingByDtrId(dtr);
  }

  everythingNotOk: boolean;
  getLastInsertedReadingByDtrId(dtr){
    this.dtrPreviousReading = null;
    this.dtrService.getLastInsertedReadingByDtrId(dtr.id, true).subscribe(successResponse =>{
      let result = <any>successResponse;
      if(result && result.status === 200){
        this.dtrPreviousReading = result.body;
        this.setPreviousReadingData(this.dtrPreviousReading);
      }else if(result && result.status === 204){
        let alertResponse = this.globalResources.errorAlert("No Previous Reading Found for Selected DTR !!! Insert S/R Reading First !!!");
        this.everythingNotOk = true;
        this.setPreviousReadingData(this.dtrPreviousReading);
      }
    },errorResponse =>{
      console.log(errorResponse);
      this.everythingNotOk = true;
      this.setPreviousReadingData(this.dtrPreviousReading);
    });
  }

  dtrPreviousReading: any;
  setPreviousReadingData(previousReading){
    console.log(previousReading);
    this.dtrPreviousReading = previousReading ? previousReading : {};
		this.dtrReadAdd.prevReading = this.dtrPreviousReading.currReading;
		this.dtrReadAdd.prevReadingDate = this.globalResources.getDateFromDatetimestamp(this.dtrPreviousReading.currReadingDate);
		this.dtrReadAdd.prevReadingDateInString = this.dtrPreviousReading.currReadingDateInString;
		this.dtrReadAdd.prevBillMonth = this.dtrPreviousReading.billMonth;
		let nextBillMonth = this.globalResources.getNextBillMonth(this.dtrPreviousReading.billMonth);
    this.dtrReadAdd.billMonth = nextBillMonth;
  }

  meterReplacementButtonClicked: boolean;
  meterReplacementClicked(){
    this.dtrReadAdd.currReading = undefined;
    this.dtrReadAdd.currReadingDate = undefined;
    this.meterReplacementButtonClicked = true;
    this.setDefaultReadingCalculation();
  }

  cancleMeterReplacementClicked(){
    this.meterReplacementButtonClicked = false;
    this.dtrReadAdd.meterReplacementDate = undefined;
    this.dtrReadAdd.finalRead = undefined;
    this.dtrReadAdd.newDTRMeterNo = undefined;
    this.dtrReadAdd.newMeterMake = undefined;
    this.dtrReadAdd.newMeterMf = undefined;
    this.dtrReadAdd.newMeterCapacity = undefined;
    this.dtrReadAdd.newMeterStartRead = undefined;
    this.dtrReadAdd.currReading = undefined;
    this.dtrReadAdd.currReadingDate = undefined;
    this.setDefaultReadingCalculation();
  }

  dtrMeterReplacementDateChanged(){
    this.calculateDifference();
    this.dtrReadAdd.currReadingDate = undefined;
    this.dtrReadAdd.meterReplacementDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.dtrReadAdd.meterReplacementDate);
  }
  
  dtrReplacedMeterFinalReadChanged(){
    this.calculateDifference();
  }

  dtrNewMeterMFChanged(){
    this.calculateDifference();
  }

  dtrNewMeterStartReadChanged(){
    this.dtrReadAdd.currReading = undefined;
    this.calculateDifference();
  }

  dtrCurrentReadingChanged(){
    this.calculateDifference();
  }

  dtrCurrentReadingDateChanged(){
    this.calculateDifference();
    this.dtrReadAdd.currReadingDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.dtrReadAdd.currReadingDate);
  }

  dtrAssessmentUnitChanged(){
    if(this.dtrReadAdd.assUnit){
      this.dtrReadAdd.totalConsumption = this.globalResources.getValueAsNumberWithFixed((this.dtrReadAdd.meterConsumption + this.dtrReadAdd.assUnit), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    }else{
      this.dtrReadAdd.totalConsumption = this.dtrReadAdd.meterConsumption;
    }
  }

  submitClicked(dtrReadAddForm){
    console.log(this.dtrReadAdd);
    if(this.globalResources.validateForm(dtrReadAddForm)){
      this._submitClicked = true;
      this.dtrReadAdd.dtrId = this.dtrReadAdd.dtr.id;
      this.dtrReadAdd.zoneId = this.dtrReadAdd.zone.id;
      this.dtrReadAdd.feederId = this.dtrReadAdd.feeder.id;
      this.dtrReadAdd.groupNo1 = this.dtrReadAdd.feeder.groupNo;
      this.dtrReadAdd.mf = this.dtrReadAdd.dtr.overallMF;
      this.dtrReadAdd.meterNo = this.dtrReadAdd.dtr.dtrMeterNo;
      this.dtrReadAdd.readerNo1 = this.dtrReadAdd.dtr.billingRDNo;
      this.calculateDifference();
      this._submitClicked = false;
      if(this.meterReplacementButtonClicked){
        this.addDtrReadWithMeterReplacement(dtrReadAddForm);
      }else{
        this.addDtrRead(dtrReadAddForm)
      }
    }
  }
  
  calculateDifference(){
    if( !this.meterReplacementButtonClicked){
      let currentReading = this.dtrReadAdd.currReading + "";
      let previousReading = this.dtrReadAdd.prevReading + "";
      if(currentReading && currentReading.length && previousReading && previousReading.length && this.dtrReadAdd.currReading >= this.dtrReadAdd.prevReading){
        let difference = this.globalResources.getValueAsNumberWithFixed((this.dtrReadAdd.currReading - this.dtrReadAdd.prevReading), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.dtrReadAdd.readingDiff = difference;
        this.dtrReadAdd.readingDiff = Math.round(this.dtrReadAdd.readingDiff * 100) / 100;
        this.dtrReadAdd.meterConsumption = this.globalResources.getValueAsNumberWithFixed((difference * this.dtrReadAdd.dtr.overallMF), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.dtrReadAdd.meterConsumption = Math.round(this.dtrReadAdd.meterConsumption * 100) / 100;
        if(this.dtrReadAdd.assUnit){
          this.dtrReadAdd.totalConsumption = this.globalResources.getValueAsNumberWithFixed((this.dtrReadAdd.meterConsumption + this.dtrReadAdd.assUnit), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        }else{
          this.dtrReadAdd.totalConsumption = this.dtrReadAdd.meterConsumption;
        }
      }else{
        this.setDefaultReadingCalculation();
      }
    }else if(this.meterReplacementButtonClicked){
      let currentReading = this.dtrReadAdd.currReading + "";
      let previousReading = this.dtrReadAdd.prevReading + "";
      let finalRead = this.dtrReadAdd.finalRead + "";
      let startRead = this.dtrReadAdd.newMeterStartRead + "";
      if(currentReading && currentReading.length && previousReading && previousReading.length && finalRead && finalRead.length && startRead && startRead.length && 
          this.dtrReadAdd.currReading >= this.dtrReadAdd.newMeterStartRead && this.dtrReadAdd.finalRead >= this.dtrReadAdd.prevReading){
        let oldDiff = this.globalResources.getValueAsNumberWithFixed((this.dtrReadAdd.finalRead - this.dtrReadAdd.prevReading), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.dtrReadAdd.oldReadingDiff = Math.round(oldDiff * 100)/100;
        this.dtrReadAdd.oldMeterConsumption = Math.round((this.dtrReadAdd.oldReadingDiff * this.dtrReadAdd.dtr.overallMF)*100)/100;
        
        let newDiff = this.globalResources.getValueAsNumberWithFixed((this.dtrReadAdd.currReading - this.dtrReadAdd.newMeterStartRead), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.dtrReadAdd.newReadingDiff = Math.round(newDiff * 100)/100;
        this.dtrReadAdd.newMeterConsumption = Math.round((this.dtrReadAdd.newReadingDiff * this.dtrReadAdd.newMeterMf)*100)/100;
        
        //setting this to reflect on form
        this.dtrReadAdd.readingDiff = this.dtrReadAdd.newReadingDiff;
        
        this.dtrReadAdd.meterConsumption = Math.round((this.dtrReadAdd.oldMeterConsumption + this.dtrReadAdd.newMeterConsumption) * 100)/100;
        
        if(this.dtrReadAdd.assUnit){
          this.dtrReadAdd.totalConsumption = this.globalResources.getValueAsNumberWithFixed((this.dtrReadAdd.meterConsumption + this.dtrReadAdd.assUnit), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        }else{
          this.dtrReadAdd.totalConsumption = this.dtrReadAdd.meterConsumption;
        }
      }else{
        this.setDefaultReadingCalculation();
      }
    }
  }

  
  setDefaultReadingCalculation(){
    this.dtrReadAdd.assUnit = undefined;
    this.dtrReadAdd.readingDiff = undefined;
    this.dtrReadAdd.meterConsumption = undefined;
    this.dtrReadAdd.totalConsumption = undefined;
  }

  addDtrReadWithMeterReplacement(dtrReadAddForm){
    let methodName = "addDtrReadWithMeterReplacement";
    this._submitClicked = true;
    this.dtrService.addDtrReadWithMeterReplacement(this.dtrReadAdd, this.user.username).subscribe(successResponese =>{
      this._submitClicked = false;
      let alertResponse = this.globalResources.successAlert("DTR read added successfully");
      alertResponse.then(result =>{
        this.setPartialData();
        this.globalResources.resetValidateForm(dtrReadAddForm);
      });
    }, errorResponse=>{
      this._submitClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  addDtrRead(dtrReadAddForm){
    let methodName = "addDtrRead";
    this._submitClicked = true;
    this.dtrService.addDTRRead(this.dtrReadAdd, this.user.username).subscribe(successResponese =>{
      this._submitClicked = false;
      let alertResponse = this.globalResources.successAlert("DTR read added successfully");
      alertResponse.then(result =>{
        this.setPartialData();
        this.globalResources.resetValidateForm(dtrReadAddForm);
      });
    },errorResponse=>{
      this._submitClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  resetClicked(dtrReadAddForm){
    this.setPartialData();
    this.globalResources.resetValidateForm(dtrReadAddForm);
  }
}