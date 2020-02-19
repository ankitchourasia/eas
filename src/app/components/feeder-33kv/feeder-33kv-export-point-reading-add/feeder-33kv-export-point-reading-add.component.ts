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
      this.formData.previousRead = this.exportPointPreviousReading.currentRead;
      this.formData.previousReadDate = this.exportPointPreviousReading.currentReadDate;
      this.formData.previousReadDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.formData.previousReadDate);
      this.formData.billMonth = this.globalResources.getNextBillMonth(this.exportPointPreviousReading.billMonth);
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
    this.formData.mf = Number(this.formData.exportPointLocation.mf);
    console.log(this.formData.currentReading, this.formData.previousRead);
    if(this.formData.currentRead >= 0 && this.formData.previousRead >= 0 && this.formData.mf && this.formData.currentRead >= this.formData.previousRead){
      this.formData.difference = Number((this.formData.currentRead - this.formData.previousRead).toFixed(2));
      this.formData.consumption = this.formData.difference * Number(this.formData.mf);
      this.calculateTotalConsumption();
    }
  }

  calculateTotalConsumption(){
    if(this.formData.assessment){
      this.formData.totalConsumption = this.formData.consumption + this.formData.assessment;
    } else{
      this.formData.totalConsumption = this.formData.consumption;
    }
  }

  submitClicked(exportPointReadAddForm){
    if(this.globalResources.validateForm(exportPointReadAddForm)){
      this._submitClicked = true;
      this.formData.zoneId = this.formData.zone.id;
      this.formData.feederId = this.formData.exportPointFeeder.id;
      this.formData.export33KVId = this.formData.exportPointLocation.id;
      this.formData.mf = this.formData.exportPointLocation.overallMf;
      this.formData.meterNo = this.formData.exportPointLocation.meterNo;
			this.calculateConsumption();
      this._submitClicked = false;
      this.addExportPointRead(exportPointReadAddForm)
    }
  }

  addExportPointRead(exportPointReadAddForm){
    let methodName = "addExportPointRead";
    this._submitClicked = true;
    console.log(this.formData);
    this.exportService.add33KVExportPointReading(this.formData, false).subscribe(successResponese =>{
      this._submitClicked = false;
      let alertResponse = this.globalResources.successAlert("Export point read added successfully");
      alertResponse.then(result =>{
        this.clearPartialData();
        this.globalResources.resetValidateForm(exportPointReadAddForm);
      });
    }, errorResponse =>{
      console.log(errorResponse);
      this._submitClicked = false;
      let alertResponse = this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
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