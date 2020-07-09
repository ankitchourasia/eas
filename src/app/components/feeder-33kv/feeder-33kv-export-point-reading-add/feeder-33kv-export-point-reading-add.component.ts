import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { ExportService } from '@eas-services/export-service/export.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { FeederService } from '@eas-services/feeder/feeder.service';

@Component({
  selector: 'eas-feeder-33kv-export-point-reading-add',
  templateUrl: './feeder-33kv-export-point-reading-add.component.html',
  styleUrls: ['./feeder-33kv-export-point-reading-add.component.css']
})
export class Feeder33KVExportPointReadingAddComponent implements OnInit {
  
  COMPONENT_NAME = "Feeder33KVExportPointReadingAddComponent";
  user : any;
  zoneList: any;
  regionList: any;
  circleList: any;
  divisionList: any;
  exportPointFeederList: any;
  exportPointLocationList: any;
  exportPointPreviousReading: any;
  _submitClicked : boolean;
  _meterReplacementClicked: boolean;
  formData: any;
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private feederService: FeederService, private exportService: ExportService, private zoneService: ZoneService) { }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.formData = {};
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    this.zoneList = [];
    this._meterReplacementClicked = false;
    this.exportPointFeederList = null;
    this.exportPointLocationList = null;
    this.exportPointPreviousReading = null;
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
    console.log("zone changed");
    this.exportPointLocationList = [];
    this.formData.exportPointFeeder = undefined;
    this.formData.exportPointLocation = undefined;
    this.get33KVFeederByZoneId(zone.id);
  }

  get33KVFeederByZoneId(zoneId){
    this.exportPointFeederList = [];
    this.feederService.get33KVFeederByZoneId(zoneId, false).subscribe(success =>{
      this.exportPointFeederList = success;
    }, error =>{
      console.log(error);
    });
  }

  feederChanged(feeder){
    this.exportPointLocationList = null;
    this.formData.exportPointLocation = undefined;
    this.exportPointPreviousReading = null;
    this.getExportPointsByFeederId(feeder.id);
  }

  getExportPointsByFeederId(feederId){
    this.exportPointLocationList = [];
    this.exportService.getEXportPointListBy33KVFeederId(feederId, false).subscribe(successResponse =>{
      console.log(successResponse);
      this.exportPointLocationList = successResponse;
    }, errorResponse =>{
      console.log(errorResponse)
    });
  }

  exportLocationNameChanged(exportLocationName){
    this.getPreviousReadingBy33KVExportPointId(exportLocationName.id);
  }

  getPreviousReadingBy33KVExportPointId(exportLocationNameId){
    let methodName = "getPreviousReadingBy33KVExportPointId";
    this.formData.currentReading = undefined;
    this.formData.currentReadingDate = undefined;
    this.exportPointPreviousReading = null;
    this.exportService.getPreviousReadingBy33KVExportPointId(exportLocationNameId, false).subscribe(successResponse =>{
      this.exportPointPreviousReading = <any>successResponse;
      this.formData.previousBillMonth = this.exportPointPreviousReading.billMonth;
      this.formData.previousReading = this.exportPointPreviousReading.currentRead;
      this.formData.previousReadingDate = this.exportPointPreviousReading.currentReadDate;
      this.formData.previousReadingDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.formData.previousReadingDate);
      this.formData.billMonth = this.globalResources.getNextBillMonth(this.exportPointPreviousReading.billMonth);
    }, error =>{
      console.log(error);
      let alertResponse = this.globalResources.handleError(error, this.COMPONENT_NAME, methodName);
    });
  }

  meterReplacementClicked(){
    this.formData.currentReading = undefined;
    this.formData.currentReadingDate = undefined;
    this._meterReplacementClicked = true;
    this.setDefaultReadingCalculation();
  }

  
  cancleMeterReplacementClicked(){
    this._meterReplacementClicked = false;
    this.formData.currentReading = undefined;
    this.formData.currentReadingDate = undefined;
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
    this.formData.currentReadingDate = undefined;
    this.formData.meterReplacementDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.formData.meterReplacementDate);
  }
  
  replacedMeterFinalReadChanged(){
    this.calculateDifference();
  }

  newMeterMFChanged(){
    this.calculateDifference();
  }

  newMeterStartReadChanged(){
    this.formData.currentReading = undefined;
    this.calculateDifference();
  }


  currentReadingChanged(){
    this.calculateDifference();
  }

  currentReadingDateChanged(){
    this.formData.currentReadingDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.formData.currentReadingDate);
  }

  assessmentUnitChanged(){
    this.formData.assessmentUnit = Number(this.formData.assessmentUnit);
    this.calculateTotalConsumption();
  }

    
  calculateDifference(){
    if( !this._meterReplacementClicked){
      let mf = Number(this.formData.exportPointLocation.mf);
      let currentReading = Number(this.formData.currentReading);
      let previousReading = Number(this.formData.previousReading);
      if(currentReading >= 0 && previousReading >= 0 && currentReading >= previousReading && mf > 0){
        this.formData.difference = this.globalResources.getValueAsNumberWithFixed((currentReading - previousReading), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.formData.consumption = this.globalResources.getValueAsNumberWithFixed((this.formData.difference * mf), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.formData.totalMeterConsumption = this.formData.consumption;
        this.calculateTotalConsumption();
      }else{
        this.setDefaultReadingCalculation();
      }
    }else if(this._meterReplacementClicked){
      let newMF = Number(this.formData.newMf);
      let oldMF = Number(this.formData.exportPointLocation.mf);
      let currentReading = Number(this.formData.currentReading);
      let previousReading = Number(this.formData.previousReading);
      let finalRead = Number(this.formData.finalRead);
      let startRead = Number(this.formData.newMeterStartRead);
      if(currentReading >= 0 && previousReading >= 0 && finalRead >= 0 && startRead >= 0 && currentReading >= startRead && finalRead >= previousReading && oldMF > 0 && newMF >= 0){
        this.formData.oldReadingDifference = this.globalResources.getValueAsNumberWithFixed((finalRead - previousReading), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.formData.oldMeterConsumption = this.globalResources.getValueAsNumberWithFixed((this.formData.oldReadingDifference * oldMF), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.formData.newReadingDifference = this.globalResources.getValueAsNumberWithFixed((currentReading - startRead), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.formData.newMeterConsumption = this.globalResources.getValueAsNumberWithFixed((this.formData.newReadingDifference * newMF), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        //setting this to reflect on form
        this.formData.difference = this.formData.newReadingDifference;
        this.formData.consumption = this.globalResources.getValueAsNumberWithFixed((this.formData.oldMeterConsumption + this.formData.newMeterConsumption), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.formData.totalMeterConsumption = this.formData.consumption;
        this.calculateTotalConsumption();
      }else{
        this.setDefaultReadingCalculation();
      }
    }
  }

  calculateTotalConsumption(){
    if(this.formData.assessmentUnit){
      this.formData.totalConsumption = this.globalResources.getValueAsNumberWithFixed((this.formData.consumption + this.formData.assessmentUnit), GlobalConstants.CALCULATION_ROUNDING_SCALE);
      return;
    }
    this.formData.totalConsumption = this.formData.consumption;
  }

  setDefaultReadingCalculation(){
    this.formData.difference = undefined;
    this.formData.assessmentUnit = undefined;
    this.formData.consumption = undefined;
    this.formData.totalConsumption = undefined;
    this.formData.totalMeterConsumption = undefined;
  }

  submitClicked(exportPointReadAddForm){
    if(this.globalResources.validateForm(exportPointReadAddForm)){
      this._submitClicked = true;
      this.formData.zoneId = this.formData.zone.id;
      this.formData.feeder33KVId = this.formData.exportPointFeeder.id;
      this.formData.export33KVId = this.formData.exportPointLocation.id;
      this.formData.mf = this.formData.exportPointLocation.mf;
      this.formData.meterNo = this.formData.exportPointLocation.meterNo;
			this.calculateDifference();
      this._submitClicked = false;
      if(this._meterReplacementClicked){
        this.formData.oldMf = this.formData.mf;
        this.formData.oldMeterNo = this.formData.meterNo;
        this.addExportPointReadWithMeterReplacement(exportPointReadAddForm);
      }else{
        this.addExportPointRead(exportPointReadAddForm)
      }
    }
  }
  
  addExportPointReadWithMeterReplacement(exportPointReadAddForm){
    let methodName = "addExportPointReadWithMeterReplacement";
    this._submitClicked = true;
    console.log(this.formData);
    this.exportService.add33KVExportPointReadingWithMeterReplacement(this.formData, this.user.username, false).subscribe(successResponese =>{
      this._submitClicked = false;
      let alertResponse = this.globalResources.successAlert("Export point read added successfully");
      alertResponse.then(result =>{
        this.setPartialData();
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
    console.log(this.formData);
    this.exportService.add33KVExportPointReading(this.formData, false).subscribe(successResponese =>{
      this._submitClicked = false;
      let alertResponse = this.globalResources.successAlert("Export point read added successfully");
      alertResponse.then(result =>{
        this.setPartialData();
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