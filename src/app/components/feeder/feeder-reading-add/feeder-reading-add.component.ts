import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { SubstationService } from '@eas-services/substation/substation.service';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { ZoneService } from '@eas-services/zone/zone.service';

@Component({
  selector: 'eas-feeder-reading-add',
  templateUrl: './feeder-reading-add.component.html',
  styleUrls: ['./feeder-reading-add.component.css']
})
export class FeederReadingAddComponent implements OnInit {

  user : any = {};
  feederReading : any = {};
  substations : any = [];
  feeders : any = [];
  zoneList : any = [];
  previousReading : any = {};
  feederMeterReplacement : boolean;
  loading : boolean;
  formDates : any = {};
  constructor(private globalResources : GlobalResources, private substationService : SubstationService, 
    private feederService : FeederService, private zoneService: ZoneService) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
    this.getZoneListByDivisionId(this.user.division.id);
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
    this.feederReading.currReading = undefined;
    this.formDates.currReadingDate = undefined;
    this.feederService.getPreviousReadingByFeederId(feederId).subscribe(success =>{
      this.previousReading = success;
      this.feederReading.prevReading = this.previousReading.currReading;
      this.feederReading.prevReadingDate = this.previousReading.currReadingDate;
      this.feederReading.prevReadingDateInString = this.previousReading.currReadingDateInString;
      this.feederReading.prevBillMonth = this.previousReading.billMonth;
      this.feederReading.billMonth = this.globalResources.getNextBillMonth(this.previousReading.billMonth);
    }, error =>{
      console.log(error);
      this.globalResources.errorAlert(error.error.errorMessage);
    });
  }

  assessmentChanged(){
    this.calculateTotalConsumption();
  }

  calculateTotalConsumption(){
    if(this.feederReading.assUnit){
      this.feederReading.totalConsumption = this.feederReading.meterConsumption + this.feederReading.assUnit;
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
          this.feederReading.oldReadingDifference = (Number(this.feederReading.finalRead) - Number(this.feederReading.prevReading)).toFixed(2);
          this.feederReading.oldMeterConsumption = Number(this.feederReading.oldReadingDifference) * Number(this.feederReading.mf);
          this.feederReading.newReadingDifference = (Number(this.feederReading.currReading) - Number(this.feederReading.newMeterStartRead)).toFixed(2);
          this.feederReading.newMeterConsumption = Number(this.feederReading.newReadingDifference) * Number(this.feederReading.newMf);
          this.feederReading.readingDiff = Number(this.feederReading.oldReadingDifference) + Number(this.feederReading.newReadingDifference);
          this.feederReading.meterConsumption = this.feederReading.oldMeterConsumption + this.feederReading.newMeterConsumption;
          this.calculateTotalConsumption();
      }
    } else{
      if(this.feederReading.currReading >= 0 && this.feederReading.prevReading >= 0 && 
        this.feederReading.mf && this.feederReading.currReading >= this.feederReading.prevReading){
          this.feederReading.readingDiff = (Number(this.feederReading.currReading) - Number(this.feederReading.prevReading)).toFixed(2);
          this.feederReading.meterConsumption = this.feederReading.readingDiff * Number(this.feederReading.mf);
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
    this.loading = true;
    this.feederService.addFeederReading(this.feederReading, this.user.username).subscribe(success =>{
      this.globalResources.successAlert("Reading added successfully");
      this.feederMeterReplacement = false;
      this.loading = false;
      this.feederReading = {};
      this.globalResources.resetValidateForm(feederReadingAddForm);

    }, error =>{
      console.log(error);
      this.globalResources.errorAlert(error.error.errorMessage);
    });
  }

  replaceMeter(feederReadingAddForm){
    this.feederService.addFeederMeterReplacement(this.feederReading, this.user.username).subscribe(success =>{
      this.globalResources.successAlert("Meter Replaced successfully");
      this.feederMeterReplacement = false;
      this.loading = false;
      this.feederReading = {};
      this.globalResources.resetValidateForm(feederReadingAddForm);
    }, error=>{
      console.log(error);
      this.globalResources.errorAlert(error.error.errorMessage);
    });
  }
}
