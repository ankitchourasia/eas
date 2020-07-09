import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { SubstationService } from '@eas-services/substation/substation.service';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { GlobalConstants } from '@eas-utility/global.constants';

@Component({
  selector: 'eas-feeder-33kv-reading-add',
  templateUrl: './feeder-33kv-reading-add.component.html',
  styleUrls: ['./feeder-33kv-reading-add.component.css']
})
export class Feeder33KVReadingAddComponent implements OnInit {
  COMPONENT_NAME: any = "Feeder33KVReadingAddComponent";
  user : any = {};
  regionList: any;
  circleList: any;
  divisionList: any;
  zoneList: any;
  feeders : any;
  feederReading : any = {};
  _submitClicked : boolean;
  _meterReplacementClicked: boolean;
  constructor(private globalResources : GlobalResources, private substationService : SubstationService, 
    private feederService : FeederService, private zoneService: ZoneService, private globalConstants: GlobalConstants) { }

    ngOnInit() {
      this.setPartialData();
    }
  
    setPartialData(){
      this.feederReading = {};
      this.regionList = [];
      this.circleList = [];
      this.divisionList = [];
      this.zoneList = [];
      this.user = this.globalResources.getUserDetails();
      if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
        this.regionList.push(this.user.region);
        this.circleList.push(this.user.circle);
        this.divisionList.push(this.user.division);
        this.getZoneListByDivisionId(this.user.division.id);
        this.feederReading.region = this.user.region;
        this.feederReading.circle = this.user.circle;
        this.feederReading.division = this.user.division;
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

  zoneChanged(zoneId){
    console.log("zone changed");
    this.feederReading.feeder = undefined;
    this.get33KVFeederByZoneId(zoneId);
  }

  get33KVFeederByZoneId(zoneId){
    this.feeders = [];
    this.feederService.get33KVFeederByZoneId(zoneId, false).subscribe(success =>{
      this.feeders = success;
    }, error =>{
      console.log(error);
    });
  }

  feederChanged(feeder){
    this.feederReading.feeder33KVId = feeder.id;
    this.feederReading.mf = feeder.mf;
		this.feederReading.meterNo = feeder.meterNo;
    this.getPreviousFeederReadingByFeederId(feeder.id);
  }

  getPreviousFeederReadingByFeederId(feederId){
    let methodName = "getPreviousFeederReadingByFeederId";
    this.feederReading.currentRead = undefined;
    this.feederReading.currentReadDate = undefined;
    this.feederService.getPreviousReadingBy33KVFeederId(feederId, false).subscribe(success =>{
      let previousReading : any = success;
      this.feederReading.prevBillMonth = previousReading.billMonth;
      this.feederReading.previousRead = previousReading.currentRead;
      this.feederReading.previousReadDate = previousReading.currentReadDate;
      this.feederReading.previousReadDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.feederReading.previousReadDate);
      this.feederReading.billMonth = this.globalResources.getNextBillMonth(previousReading.billMonth);
    }, error =>{
      console.log(error);
      let alertResponse = this.globalResources.handleError(error, this.COMPONENT_NAME, methodName);
    });
  }

 
  meterReplacementClicked(){
    this.feederReading.currentRead = undefined;
    this.feederReading.currentReadDate = undefined;
    this._meterReplacementClicked = true;
    this.setDefaultReadingCalculation();
  }

  
  cancleMeterReplacementClicked(){
    this._meterReplacementClicked = false;
    this.feederReading.currentRead = undefined;
    this.feederReading.currentReadDate = undefined;
    this.clearOldAndNewMeterDetails();
    this.setDefaultReadingCalculation();
  }

  setDefaultReadingCalculation(){
    this.feederReading.difference = undefined;
    this.feederReading.assessmentUnit = undefined;
    this.feederReading.consumption = undefined;
    this.feederReading.totalConsumption = undefined;
    this.feederReading.totalMeterConsumption = undefined;
  }

  clearOldAndNewMeterDetails(){
    this.feederReading.meterReplacementDate = undefined;
    this.feederReading.meterReplacementDateInString = undefined;
    this.feederReading.finalRead = undefined;
    this.feederReading.newMf = undefined;
    this.feederReading.newMeterNo = undefined;
    this.feederReading.newMeterCapacity = undefined;
    this.feederReading.newMeterStartRead = undefined;
    this.feederReading.newMeterConsumption = undefined;
    this.feederReading.newReadingDifference = undefined;
  }

  meterReplacementDateChanged(){
    this.feederReading.currentReadDate = undefined;
    this.feederReading.meterReplacementDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.feederReading.meterReplacementDate);
  }
  
  replacedMeterFinalReadChanged(){
    this.calculateDifference();
  }

  newMeterMFChanged(){
    this.calculateDifference();
  }

  newMeterStartReadChanged(){
    this.feederReading.currentRead = undefined;
    this.calculateDifference();
  }
 
  currentReadingChanged(){
    this.calculateDifference();
  }

  assessmentChanged(){
    this.calculateTotalConsumption();
  }

  
  currentReadingDateChanged(){
    this.feederReading.currentReadDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.feederReading.currentReadDate);
  }

  calculateConsumption(){
    if(this.feederReading.currentRead >= 0 && this.feederReading.previousRead >= 0 && this.feederReading.mf && this.feederReading.currentRead >= this.feederReading.previousRead){
        this.feederReading.difference = this.globalResources.getValueAsNumberWithFixed((this.feederReading.currentRead - this.feederReading.previousRead), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.feederReading.consumption = this.globalResources.getValueAsNumberWithFixed((this.feederReading.difference * this.feederReading.mf), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.calculateTotalConsumption();
    }
  }

  calculateDifference(){
    if(!this._meterReplacementClicked){
      let oldMF = Number(this.feederReading.mf);
      let currentReading = Number(this.feederReading.currentRead);
      let previousReading = Number(this.feederReading.previousRead);
      if(currentReading >= 0 && previousReading >= 0 && currentReading >= previousReading && oldMF > 0){
        this.feederReading.difference = this.globalResources.getValueAsNumberWithFixed((currentReading - previousReading), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.feederReading.consumption = this.globalResources.getValueAsNumberWithFixed((this.feederReading.difference * oldMF), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.feederReading.totalMeterConsumption = this.feederReading.consumption;
        this.calculateTotalConsumption();
      }else{
        this.setDefaultReadingCalculation();
      }
    }else if(this._meterReplacementClicked){
      let newMF = Number(this.feederReading.newMf);
      let oldMF = Number(this.feederReading.mf);
      let currentReading = Number(this.feederReading.currentRead);
      let previousReading = Number(this.feederReading.previousRead);
      let finalRead = Number(this.feederReading.finalRead);
      let startRead = Number(this.feederReading.newMeterStartRead);
      if(currentReading >= 0 && previousReading >= 0 && finalRead >= 0 && startRead >= 0 && currentReading >= startRead && finalRead >= previousReading && oldMF > 0 && newMF >= 0){
        this.feederReading.oldReadingDifference = this.globalResources.getValueAsNumberWithFixed((finalRead - previousReading), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.feederReading.oldMeterConsumption = this.globalResources.getValueAsNumberWithFixed((this.feederReading.oldReadingDifference * oldMF), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.feederReading.newReadingDifference = this.globalResources.getValueAsNumberWithFixed((currentReading - startRead), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.feederReading.newMeterConsumption = this.globalResources.getValueAsNumberWithFixed((this.feederReading.newReadingDifference * newMF), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        //setting this to reflect on form
        this.feederReading.difference = this.feederReading.newReadingDifference;
        this.feederReading.consumption = this.globalResources.getValueAsNumberWithFixed((this.feederReading.oldMeterConsumption + this.feederReading.newMeterConsumption), GlobalConstants.CALCULATION_ROUNDING_SCALE);
        this.feederReading.totalMeterConsumption = this.feederReading.consumption;
        this.calculateTotalConsumption();
      }else{
        this.setDefaultReadingCalculation();
      }
    }
  }

  calculateTotalConsumption(){
    if(this.feederReading.assessmentUnit){
      this.feederReading.totalConsumption = this.globalResources.getValueAsNumberWithFixed((this.feederReading.consumption + this.feederReading.assessmentUnit), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    } else{
      this.feederReading.totalConsumption = this.feederReading.consumption;
    }
  }

  submitClicked(feederReadingAddForm){
    if(this.globalResources.validateForm(feederReadingAddForm)){
      this._submitClicked = true;
      this.calculateDifference();
      this._submitClicked = false;
      if(this._meterReplacementClicked){
        this.feederReading.oldMf = this.feederReading.mf;
        this.feederReading.oldMeterNo = this.feederReading.meterNo;
        this.addReadWithMeterReplacement(feederReadingAddForm);
      }else{
        this.addFeederReading(feederReadingAddForm)
      }
      // console.log(this.feederReading);
    }
  }

  addReadWithMeterReplacement(feederReadingAddForm){
    let methodName = "addReadWithMeterReplacement";
    this._submitClicked = true;
    console.log(this.feederReading);
    this.feederService.add33KVFeederReadWithMeterReplacement(this.feederReading, this.user.username, false).subscribe(success =>{
      this._submitClicked = false;
      let alertResponse = this.globalResources.successAlert("Reading added successfully");
      alertResponse.then(result =>{
        this.setPartialData();
        this.globalResources.resetValidateForm(feederReadingAddForm);
      });
    }, error =>{
      this._submitClicked = false;
      this.globalResources.handleError(error, this.COMPONENT_NAME, methodName);
    });
  }
  
  addFeederReading(feederReadingAddForm){
    let methodName = "addFeederReading";
    this._submitClicked = true;
    console.log(this.feederReading);
    this.feederService.add33KVFeederReading(this.feederReading, this.user.username, false).subscribe(success =>{
      this._submitClicked = false;
      let alertResponse = this.globalResources.successAlert("Reading added successfully");
      alertResponse.then(result =>{
        this.setPartialData();
        this.globalResources.resetValidateForm(feederReadingAddForm);
      });
    }, error =>{
      this._submitClicked = false;
      this.globalResources.handleError(error, this.COMPONENT_NAME, methodName);
    });
  }

  resetClicked(feederReadingAddForm){
    this.setPartialData();
    this.globalResources.resetValidateForm(feederReadingAddForm);
  }
}
