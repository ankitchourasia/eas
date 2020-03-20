import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { ImportService } from '@eas-services/import-service/import.service';

@Component({
  selector: 'eas-feeder-33kv-import-point-reading-add',
  templateUrl: './feeder-33kv-import-point-reading-add.component.html',
  styleUrls: ['./feeder-33kv-import-point-reading-add.component.css']
})
export class Feeder33KVImportPointReadingAddComponent implements OnInit {

  COMPONENT_NAME = "Feeder33KVImportPointReadingAddComponent";
  user : any;
  zoneList: any;
  regionList: any;
  circleList: any;
  divisionList: any;
  importPointFeederList: any;
  importPointLocationList: any;
  importPointPreviousReading: any;
  _submitClicked : boolean;
  formData: any;
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private feederService: FeederService, private importService: ImportService, private zoneService: ZoneService) { }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.formData = {};
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    this.zoneList = [];
    this.importPointFeederList = null;
    this.importPointLocationList = null;
    this.importPointPreviousReading = null;
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
    this.importPointLocationList = [];
    this.formData.importPointFeeder = undefined;
    this.formData.importPointLocation = undefined;
    this.get33KVFeederByZoneId(zone.id);
  }

  get33KVFeederByZoneId(zoneId){
    this.importPointFeederList = [];
    this.feederService.get33KVFeederByZoneId(zoneId, false).subscribe(success =>{
      this.importPointFeederList = success;
    }, error =>{
      console.log(error);
    });
  }

  feederChanged(feeder){
    this.importPointLocationList = null;
    this.formData.importPointLocation = undefined;
    this.importPointPreviousReading = null;
    this.getImportPointsByFeederId(feeder.id);
  }

  getImportPointsByFeederId(feederId){
    this.importPointLocationList = [];
    this.importService.getImportPointListBy33KVFeederId(feederId, false).subscribe(successResponse =>{
      console.log(successResponse);
      this.importPointLocationList = successResponse;
    }, errorResponse =>{
      console.log(errorResponse)
    });
  }

  importLocationNameChanged(importLocationName){
    this.getPreviousReadingBy33KVImportPointId(importLocationName.id);
  }

  getPreviousReadingBy33KVImportPointId(importLocationNameId){
    let methodName = "getPreviousReadingBy33KVImportPointId";
    this.formData.currentReading = undefined;
    this.formData.currentReadingDate = undefined;
    this.importPointPreviousReading = null;
    this.importService.getPreviousReadingBy33KVImportPointId(importLocationNameId, false).subscribe(successResponse =>{
      this.importPointPreviousReading = <any>successResponse;
      this.formData.previousBillMonth = this.importPointPreviousReading.billMonth;
      this.formData.previousRead = this.importPointPreviousReading.currentRead;
      this.formData.previousReadDate = this.importPointPreviousReading.currentReadDate;
      this.formData.previousReadDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.formData.previousReadDate);
      this.formData.billMonth = this.globalResources.getNextBillMonth(this.importPointPreviousReading.billMonth);
    }, error =>{
      console.log(error);
      let alertResponse = this.globalResources.handleError(error, this.COMPONENT_NAME, methodName);
    });
  }

  currentReadingChanged(){
    this.calculateConsumption();
  }

  currentReadingDateChanged(){
    this.formData.currentReadDate = this.formData.currentReadingDate;
    this.formData.currentReadDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.formData.currentReadingDate);
  }

  assessmentUnitChanged(){
    this.formData.assessment = Number(this.formData.assessment);
    this.calculateTotalConsumption();
  }

  calculateConsumption(){
    this.formData.currentRead = Number(this.formData.currentReading);
    this.formData.previousRead = Number(this.formData.previousRead)
    this.formData.mf = Number(this.formData.importPointLocation.mf);
    
    if(this.formData.currentRead >= 0 && this.formData.previousRead >= 0 && this.formData.mf && this.formData.currentRead >= this.formData.previousRead){
      this.formData.difference = this.globalResources.getValueAsNumberWithFixed((this.formData.currentRead - this.formData.previousRead), 3);
      this.formData.consumption = this.globalResources.getValueAsNumberWithFixed((this.formData.difference * this.formData.mf), 3);
      this.calculateTotalConsumption();
    }
  }

  calculateTotalConsumption(){
    if(this.formData.assessment){
      this.formData.totalConsumption = this.globalResources.getValueAsNumberWithFixed((this.formData.consumption + this.formData.assessment),3);
    } else{
      this.formData.totalConsumption = this.formData.consumption;
    }
  }

  submitClicked(importPointReadAddForm){
    if(this.globalResources.validateForm(importPointReadAddForm)){
      this._submitClicked = true;
      this.formData.zoneId = this.formData.zone.id;
      this.formData.feederId = this.formData.importPointFeeder.id;
      this.formData.import33KVId = this.formData.importPointLocation.id;
      this.formData.mf = this.formData.importPointLocation.overallMf;
      this.formData.meterNo = this.formData.importPointLocation.meterNo;
			this.calculateConsumption();
      this._submitClicked = false;
      this.addImportPointRead(importPointReadAddForm)
    }
  }

  addImportPointRead(importPointReadAddForm){
    let methodName = "addImportPointRead";
    this._submitClicked = true;
    console.log(this.formData);
    this.importService.add33KVImportPointReading(this.formData, false).subscribe(successResponese =>{
      this._submitClicked = false;
      let alertResponse = this.globalResources.successAlert("Import point read added successfully");
      alertResponse.then(result =>{
        this.setPartialData();
        this.globalResources.resetValidateForm(importPointReadAddForm);
      });
    }, errorResponse =>{
      this._submitClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  resetClicked(importPointReadAddForm){
    this.setPartialData();
    this.globalResources.resetValidateForm(importPointReadAddForm);
  }

  clearPartialData(){
    this.setPartialData();
  }

}