import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { SubstationService } from '@eas-services/substation/substation.service';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { GlobalConstants } from '@eas-utility/global.constants';

@Component({
  selector: 'eas-feeder-reading-add',
  templateUrl: './feeder-reading-add.component.html',
  styleUrls: ['./feeder-reading-add.component.css']
})
export class FeederReadingAddComponent implements OnInit {

  COMPONENT_NAME: string = "FeederReadingAddComponent";
  user : any = {};
  feederReading : any;
  regionList: any;
  circleList: any;
  divisionList: any;
  zoneList: any;;
  substations : any;
  feeders : any;
  previousReading : any = {};
  feederMeterReplacement : boolean;
  loading : boolean;
  formDates : any = {};
  constructor(private globalResources : GlobalResources, private globalConstants: GlobalConstants,
    private substationService : SubstationService, private feederService : FeederService, private zoneService: ZoneService) { }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.feederReading = {};
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    this.zoneList = [];
    this.substations = [];
    this.feeders = [];
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
    this.feederReading.substationId = undefined;
    this.getSubstationByZoneId(zoneId);
  }

  getSubstationByZoneId(zoneId){
    this.substations = [];
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(success =>{
      this.substations = success;
    }, error =>{
      console.log(error);
    })
  }

  substationChanged(substationId){
    this.feederReading.feeder = undefined;
    console.log(substationId);
    this.getFeedersBySubstationId(substationId);
  }

  getFeedersBySubstationId(substationId){
    this.feeders = [];
    this.feederService.getFeederBySubstationId(substationId).subscribe(success =>{
      this.feeders = success;
    }, error =>{
      console.log(error);
    });
  }

  feederChanged(feeder){
    this.feederReading.feederId = feeder.id;
    this.feederReading.groupNo1 = feeder.groupNo;
		this.feederReading.mf = feeder.mf;
		this.feederReading.meterNo = feeder.meterNo;
    this.getPreviousFeederReadingByFeederId(feeder.id);
  }

  getPreviousFeederReadingByFeederId(feederId){
    let methodName = "getPreviousFeederReadingByFeederId";
    this.feederReading.currReading = undefined;
    this.formDates.currReadingDate = undefined;
    this.feederService.getPreviousReadingByFeederId(feederId).subscribe(success =>{
      this.previousReading = success;
      this.feederReading.prevReading = this.previousReading.currReading;
      this.feederReading.prevReadingDate = this.previousReading.currReadingDate;
      this.feederReading.prevReadingDateInString = this.previousReading.currReadingDateInString;
      this.feederReading.prevBillMonth = this.previousReading.billMonth;
      this.feederReading.billMonth = this.globalResources.getNextBillMonth(this.previousReading.billMonth);
    }, errorResponse =>{
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  assessmentChanged(){
    this.calculateTotalConsumption();
  }

  calculateTotalConsumption(){
    if(this.feederReading.assUnit){
      this.feederReading.totalConsumption = this.globalResources.getValueAsNumberWithFixed((this.feederReading.meterConsumption + this.feederReading.assUnit), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    } else{
      this.feederReading.totalConsumption = this.feederReading.meterConsumption;
    }
    if(this.feederMeterReplacement){
      this.feederReading.totalMeterConsumption = this.feederReading.totalConsumption;
      this.feederReading.assessmentUnit = this.feederReading.assUnit;
    }
  }

  replaceButtonClicked(){
    this.feederReading.currReading = undefined;
    this.formDates.currReadingDate = undefined;
    this.feederMeterReplacement = true;
  }

  replacementDateChanged(){
    this.formDates.currReadingDate = undefined;
  }

  startReadChanged(){
    this.feederReading.currReading = undefined;
  }

  calculateConsumption(){
    if(this.feederMeterReplacement){
      if(this.feederReading.currReading >= 0 && this.feederReading.prevReading >= 0 && this.feederReading.newMeterStartRead >= 0 && this.feederReading.finalRead >= 0 && 
        this.feederReading.mf && this.feederReading.newMf && this.feederReading.currReading >= this.feederReading.newMeterStartRead &&
        this.feederReading.finalRead >= this.feederReading.prevReading){
          this.feederReading.oldReadingDifference = this.globalResources.getValueAsNumberWithFixed((this.feederReading.finalRead - this.feederReading.prevReading), GlobalConstants.CALCULATION_ROUNDING_SCALE);
          this.feederReading.oldMeterConsumption = this.globalResources.getValueAsNumberWithFixed((this.feederReading.oldReadingDifference * this.feederReading.mf), GlobalConstants.CALCULATION_ROUNDING_SCALE);
          this.feederReading.newReadingDifference = this.globalResources.getValueAsNumberWithFixed((this.feederReading.currReading - this.feederReading.newMeterStartRead), GlobalConstants.CALCULATION_ROUNDING_SCALE);
          this.feederReading.newMeterConsumption = this.globalResources.getValueAsNumberWithFixed((this.feederReading.newReadingDifference * this.feederReading.newMf), GlobalConstants.CALCULATION_ROUNDING_SCALE);
          this.feederReading.readingDiff = this.globalResources.getValueAsNumberWithFixed((this.feederReading.oldReadingDifference + this.feederReading.newReadingDifference), GlobalConstants.CALCULATION_ROUNDING_SCALE);
          this.feederReading.meterConsumption = this.globalResources.getValueAsNumberWithFixed((this.feederReading.oldMeterConsumption + this.feederReading.newMeterConsumption), GlobalConstants.CALCULATION_ROUNDING_SCALE);
          this.calculateTotalConsumption();
      }
    } else{
      if(this.feederReading.currReading >= 0 && this.feederReading.prevReading >= 0 && 
        this.feederReading.mf && this.feederReading.currReading >= this.feederReading.prevReading){
          this.feederReading.readingDiff = this.globalResources.getValueAsNumberWithFixed((this.feederReading.currReading - this.feederReading.prevReading), GlobalConstants.CALCULATION_ROUNDING_SCALE);
          this.feederReading.meterConsumption = this.globalResources.getValueAsNumberWithFixed((this.feederReading.readingDiff * this.feederReading.mf), GlobalConstants.CALCULATION_ROUNDING_SCALE);
          this.calculateTotalConsumption();
      }
    }
  }

  submitClicked(feederReadingAddForm){
    if(this.globalResources.validateForm(feederReadingAddForm)){
      this.calculateConsumption();
      this.feederReading.currReadingDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.formDates.currReadingDate);
      this.feederReading.currReadingDate = new Date(this.formDates.currReadingDate);
      this.feederReading.groupNo = this.feederReading.groupNo1;
      if(this.feederMeterReplacement){
        this.feederReading.oldMeterNo = this.feederReading.meterNo;
        this.feederReading.oldMf = this.feederReading.mf;
        this.feederReading.previousReading = this.feederReading.prevReading;
        this.feederReading.previousReadingDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.feederReading.prevReadingDate);
        this.feederReading.meterReplacementDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.formDates.meterReplacementDate);
        this.feederReading.meterReplacementDate = new Date(this.formDates.meterReplacementDate);
        this.feederReading.currentReading = this.feederReading.currReading;
        //this.feederReading.currentReadingDate = this.feederReading.currReadingDate;
        this.feederReading.currentReadingDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.formDates.currReadingDate);
        this.replaceMeter(feederReadingAddForm);
      } else{
        this.addFeederReading(feederReadingAddForm);
      }
    }
  }

  addFeederReading(feederReadingAddForm){
    let methodName = "addFeederReading";
    this.loading = true;
    this.feederService.addFeederReading(this.feederReading, this.user.username).subscribe(success =>{
      this.loading = false;
      this.feederMeterReplacement = false;
      let alertResponse =this.globalResources.successAlert("Reading added successfully");
      alertResponse.then(result =>{
        this.setPartialData();
        this.globalResources.resetValidateForm(feederReadingAddForm);
      });
    }, errorResponse =>{
      this.loading = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  replaceMeter(feederReadingAddForm){
    let methodName = "replaceMeter";
    this.feederService.addFeederMeterReplacement(this.feederReading, this.user.username).subscribe(success =>{
      this.loading = false;
      this.feederMeterReplacement = false;
      let alertResponse =this.globalResources.successAlert("Meter replaced successfully");
      alertResponse.then(result =>{
        this.setPartialData();
        this.globalResources.resetValidateForm(feederReadingAddForm);
      });
    },  errorResponse =>{
      this.loading = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  resetClicked(feederReadingAddForm){
    this.setPartialData();
    this.globalResources.resetValidateForm(feederReadingAddForm);
  }
}
