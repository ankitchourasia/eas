import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { DtrService } from '@eas-services/dtr-service/dtr.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { ExportService } from '@eas-services/export-service/export.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-export-point-reading-add',
  templateUrl: './export-point-reading-add.component.html',
  styleUrls: ['./export-point-reading-add.component.css']
})
export class ExportPointReadingAddComponent implements OnInit {

  COMPONENT_NAME: string = "ExportPointReadingAddComponent";
  user : any;
  zoneList: any;
  regionList: any;
  circleList: any;
  divisionList: any;
  substationList: any;
  exportPointFeederList: any;
  exportPointLocationList: any;
  _submitClicked : boolean;
  _meterReplacementClicked: boolean;
  formData: any;
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private dtrService : DtrService, private substationService: SubstationService, 
    private exportService: ExportService, private zoneService: ZoneService) { }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.formData = {};
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    this.zoneList = [];
    this.exportPointFeederList = null;
    this.substationList = null;
    this.exportPointLocationList = null;
    this.exportPointPreviousReading = null;
    this._meterReplacementClicked = false;
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      // this.zoneList = this.user.zoneList;
      this.getZoneListByDivisionId(this.user.division.id);
      this.formData.region = this.user.region;
      this.formData.circle = this.user.circle;
      this.formData.division = this.user.division;
    }else if(this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      this.zoneList.push(this.user.zone);
      this.formData.region = this.user.region;
      this.formData.circle = this.user.circle;
      this.formData.division = this.user.division;
      this.formData.zone = this.user.zone;
      this.getSubstationByZoneId(this.formData.zone.id);
    }
  }

  getZoneListByDivisionId(divisionId){
    this.zoneList = [];
    this.zoneService.getZonesByDivisionId(divisionId, false).subscribe(successResponse =>{
      this.zoneList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  zoneChanged(zone){
    this.substationList = null;
    this.formData.substation = undefined;
    this.exportPointFeederList = null;
    this.formData.exportPointFeeder = undefined;
    this.exportPointLocationList = null;
    this.formData.exportPointLocation = undefined;
    this.exportPointPreviousReading = null;
    this.setPreviousReadingData(this.exportPointPreviousReading);
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
    this.exportPointFeederList = null;
    this.formData.exportPointFeeder = undefined;
    this.exportPointLocationList = null;
    this.formData.exportPointLocation = undefined;
    this.exportPointPreviousReading = null;
    this.setPreviousReadingData(this.exportPointPreviousReading);
    this.cancleMeterReplacementClicked();
    this.getExportPointFeedersBySubstationId(substation.id);  
  }


  getExportPointFeedersBySubstationId(substationId){
    this.exportService.getExportPointFeedersBySubstationId(substationId, false).subscribe(successResponese =>{
      this.exportPointFeederList = successResponese;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  feederChanged(feeder){
    this.exportPointLocationList = null;
    this.formData.exportPointLocation = undefined;
    this.exportPointPreviousReading = null;
    this.setPreviousReadingData(this.exportPointPreviousReading);
    this.cancleMeterReplacementClicked();
    this.getExportPointsByFeederId(feeder.id);
  }

  getExportPointsByFeederId(feederId){
    this.exportService.getEXportPointListByFeederId(feederId, false).subscribe(successResponse =>{
      console.log(successResponse);
      this.exportPointLocationList = successResponse;
    }, errorResponse =>{
      console.log(errorResponse)
    });
  }

  exportLocationNameChanged(exportLocationName){
    this.cancleMeterReplacementClicked();
    this.getLastInsertedReadingByExportLocationNameIdAndMeterNo(exportLocationName.id, exportLocationName.meterNo);
  }

  getLastInsertedReadingByExportLocationNameIdAndMeterNo(exportLocationNameId, meterNo){
    this.exportPointPreviousReading = null;
    this.setPreviousReadingData(this.exportPointPreviousReading);
    this.exportService.getLastInsertedReadingByExportLocationNameIdAndMeterNo(exportLocationNameId, meterNo, true).subscribe(successResponse =>{
      let result = <any>successResponse;
      if(result && result.status === 200){
        this.exportPointPreviousReading = result.body;
        this.setPreviousReadingData(this.exportPointPreviousReading);
      }else if(result && result.status === 204){
        this.globalResources.errorAlert("No Previous Reading Found for Selected Export Point !!!");
      }
    },errorResponse =>{
      console.log(errorResponse);
      this.setPreviousReadingData(this.exportPointPreviousReading);
    });
  }

  exportPointPreviousReading: any;
  setPreviousReadingData(previousReading){
    console.log(previousReading);
    this.exportPointPreviousReading = previousReading ? previousReading : {};
		this.formData.prevReading = this.exportPointPreviousReading.currReading;
    this.formData.previousReading = this.formData.prevReading;
    this.formData.prevReadingDate = this.globalResources.getDateFromDatetimestamp(this.exportPointPreviousReading.currReadingDate);
    this.formData.prevReadingDateInString = this.exportPointPreviousReading.currReadingDateInString;
    this.formData.previousReadingDateInString = this.formData.prevReadingDateInString;
		this.formData.prevBillMonth = this.exportPointPreviousReading.billMonth;
		console.log("Forming next bill month for "+this.exportPointPreviousReading.billMonth);
    let nextBillMonth = this.globalResources.getNextBillMonth(this.exportPointPreviousReading.billMonth);
    console.log("Setting next bill month as: "+nextBillMonth);
		this.formData.billMonth = nextBillMonth;
  }

  meterReplacementClicked(){
    this.formData.currReading = undefined;
    this.formData.currReadingDate = undefined;
    this._meterReplacementClicked = true;
    this.setDefaultReadingCalculation();
  }

  cancleMeterReplacementClicked(){
    this._meterReplacementClicked = false;
    this.formData.currReading = undefined;
    this.formData.currReadingDate = undefined;
    this.clearOldAndNewMeterDetails();
    this.setDefaultReadingCalculation();
  }

  clearOldAndNewMeterDetails(){
    this.formData.meterReplacementDate = undefined;
    this.formData.finalRead = undefined;
    this.formData.newMf = undefined;
    this.formData.newMeterNo = undefined;
    this.formData.newMeterMake = undefined;
    this.formData.newMeterCapacity = undefined;
    this.formData.newMeterStartRead = undefined;
    
  }

  meterReplacementDateChanged(){
    this.calculateDifference();
    this.formData.currReadingDate = undefined;
    this.formData.meterReplacementDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.formData.meterReplacementDate);
  }
  
  replacedMeterFinalReadChanged(){
    this.calculateDifference();
  }

  newMeterMFChanged(){
    this.calculateDifference();
  }

  newMeterStartReadChanged(){
    this.formData.currReading = undefined;
    this.calculateDifference();
  }

  currentReadingChanged(){
    this.formData.currentReading = this.formData.currReading;
    this.calculateDifference();
  }

  currentReadingDateChanged(){
    this.calculateDifference();
    this.formData.currentReadingDate = this.formData.currReadingDate;
    this.formData.currReadingDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.formData.currReadingDate);
    this.formData.currentReadingDateInString = this.formData.currReadingDateInString;
  }

  assessmentUnitChanged(){
    this.formData.assessmentUnit = this.formData.assUnit;
    if(this.formData.assUnit){
      this.formData.totalConsumption = this.globalResources.getValueAsNumberWithFixed((this.formData.meterConsumption + this.formData.assUnit), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    }else{
      this.formData.totalConsumption = this.formData.meterConsumption;
    }
  }
  
  calculateDifference(){
    if( !this._meterReplacementClicked){
      let currentReading = Number(this.formData.currReading);
      let previousReading = Number(this.formData.prevReading);
      if(currentReading !== null && currentReading !== undefined && previousReading !== null && previousReading !== undefined && currentReading >= previousReading){
        this.formData.readingDiff = this.globalResources.getValueAsNumberWithFixed((currentReading - previousReading), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.formData.readingDiff = Math.round(this.formData.readingDiff * 100) / 100;
        this.formData.meterConsumption = this.globalResources.getValueAsNumberWithFixed((this.formData.readingDiff * this.formData.exportPointLocation.overallMf), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.formData.meterConsumption = Math.round(this.formData.meterConsumption * 100) / 100;
        this.formData.totalMeterConsumption = this.formData.meterConsumption;
        if(this.formData.assUnit){
          this.formData.totalConsumption = this.globalResources.getValueAsNumberWithFixed((this.formData.meterConsumption + this.formData.assUnit), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        }else{
          this.formData.totalConsumption = this.formData.meterConsumption;
        }
      }else{
        this.setDefaultReadingCalculation();
      }
    }else if(this._meterReplacementClicked){
      let currentReading = Number(this.formData.currReading);
      let previousReading = Number(this.formData.prevReading);
      let finalRead = Number(this.formData.finalRead);
      let startRead = Number(this.formData.newMeterStartRead);
      if(currentReading !== null && currentReading !== undefined && previousReading !== null && previousReading !== undefined && 
        finalRead !== null && finalRead !== undefined && startRead !== null && startRead !== undefined && currentReading >= startRead && finalRead >= previousReading){
        let oldDiff = this.globalResources.getValueAsNumberWithFixed((finalRead - previousReading), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.formData.oldReadingDifference = Math.round(oldDiff * 100)/100;
        this.formData.oldMeterConsumption = Math.round((this.formData.oldReadingDifference * this.formData.exportPointLocation.overallMf)*100)/100;
        let newDiff = this.globalResources.getValueAsNumberWithFixed((currentReading - startRead), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.formData.newReadingDifference = Math.round(newDiff * 100)/100;
        this.formData.newMeterConsumption = Math.round((this.formData.newReadingDifference * this.formData.newMf)*100)/100;
        //setting this to reflect on form
        this.formData.readingDiff = this.formData.newReadingDifference;
        this.formData.meterConsumption = Math.round((this.formData.oldMeterConsumption + this.formData.newMeterConsumption) * 100)/100;
        this.formData.totalMeterConsumption = this.formData.meterConsumption;
        if(this.formData.assUnit){
          this.formData.totalConsumption = this.globalResources.getValueAsNumberWithFixed((this.formData.meterConsumption + this.formData.assUnit), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        }else{
          this.formData.totalConsumption = this.formData.meterConsumption;
        }
      }else{
        this.setDefaultReadingCalculation();
      }
    }
  }
  
  setDefaultReadingCalculation(){
    this.formData.assUnit = undefined;
    this.formData.readingDiff = undefined;
    this.formData.assessmentUnit = undefined;
    this.formData.meterConsumption = undefined;
    this.formData.totalConsumption = undefined;
    this.formData.totalMeterConsumption = undefined;
  }
  
  submitClicked(exportPointReadAddForm){
    if(this.globalResources.validateForm(exportPointReadAddForm)){
      this._submitClicked = true;
      this.formData.zoneId = this.formData.zone.id;
      this.formData.substationId = this.formData.substation.id;
      this.formData.feederId = this.formData.exportPointFeeder.id;
      this.formData.export11KVId = this.formData.exportPointLocation.id;
      this.formData.mf = this.formData.exportPointLocation.overallMf;
      this.formData.meterNo = this.formData.exportPointLocation.meterNo;
			this.calculateDifference();
      this._submitClicked = false;
      if(this._meterReplacementClicked){
        this.formData.oldMf = this.formData.mf;
        this.formData.oldMeterNo = this.formData.meterNo;
        console.log(this.formData);
        this.addExportPointReadWithMeterReplacement(exportPointReadAddForm);
      }else{
        console.log(this.formData);
        this.addExportPointRead(exportPointReadAddForm)
      }
    }
  }

  addExportPointReadWithMeterReplacement(exportPointReadAddForm){
    let methodName = "addExportPointReadWithMeterReplacement";
    this._submitClicked = true;
    this.exportService.add11KVExportPointReadingWithMeterReplacement(this.formData, this.user.username, false).subscribe(successResponese =>{
      this._submitClicked = false;
      let alertResponse = this.globalResources.successAlert("Export point read added successfully");
      alertResponse.then(result =>{
        this.clearPartialData();
        this.globalResources.resetValidateForm(exportPointReadAddForm);
      });
    }, errorResponse =>{
      this._submitClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  addExportPointRead(exportPointReadAddForm){
    let methodName = "addExportPointRead";
    this._submitClicked = true;
    this.exportService.add11KVExportPointReading(this.formData, this.user.username, false).subscribe(successResponese =>{
      this._submitClicked = false;
      let alertResponse = this.globalResources.successAlert("Export point read added successfully");
      alertResponse.then(result =>{
        this.clearPartialData();
        this.globalResources.resetValidateForm(exportPointReadAddForm);
      });
    }, errorResponse =>{
      this._submitClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  resetClicked(exportPointReadAddForm){
    this.setPartialData();
    this.globalResources.resetValidateForm(exportPointReadAddForm);
  }

  clearPartialData(){
    this.setPartialData();
  }

}