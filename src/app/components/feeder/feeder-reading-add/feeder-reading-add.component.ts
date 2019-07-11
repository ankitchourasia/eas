import { Component, OnInit } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';
import { SubstationService } from '@eas-services/substation/substation.service';
import { FeederService } from '@eas-services/feeder/feeder.service';

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
  previousReading : any = {};
  feederMeterReplacement : boolean;
  loading : boolean;
  constructor(private globalResources : GlobalResources, private substationService : SubstationService, private feederService : FeederService) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
  }

  zoneChanged(zoneId){
    this.getSubstationByZoneId(zoneId);
  }

  getSubstationByZoneId(zoneId){
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(success =>{
      console.log(success);
      this.substations = success;
    }, error =>{
      console.log(error);
    })
  }

  substationChanged(substationId){
    this.getFeedersBySubstationId(substationId);
  }

  getFeedersBySubstationId(substationId){
    this.feederService.getFeederBySubstationId(substationId).subscribe(success =>{
      console.log(success);
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
    this.feederReading.currReadingDate = undefined;
    this.feederService.getPreviousReadingByFeederId(feederId).subscribe(success =>{
      console.log(success);
      this.previousReading = success;
      this.feederReading.prevReading = this.previousReading.currReading;
      this.feederReading.prevReadingDate = this.previousReading.currReadingDate;
      this.feederReading.prevReadingDateInString = this.previousReading.currReadingDateInString;
      //this.feederReading.prevReadingDateInString = this.previousReading.currReadingDateInString;
      this.feederReading.prevBillMonth = this.previousReading.billMonth;
      this.feederReading.billMonth = this.getNextBillMonth(this.previousReading.billMonth);
    }, error =>{
      console.log(error);
    });
  }

  // currentReadingChanged(){
  //   if(this.feederReading.currReading && this.feederReading.prevReading){
  //     this.feederReading.readingDiff = (Number.parseFloat(this.feederReading.currReading) - Number.parseFloat(this.feederReading.prevReading)).toFixed(3);
  //     this.feederReading.meterConsumption = this.feederReading.readingDiff * Number.parseFloat(this.feederReading.mf);
  //     this.calculateTotalConsumption();
  //   }
  // }

  assessmentChanged(){
    this.calculateTotalConsumption();
  }

  calculateTotalConsumption(){
    if(this.feederReading.assUnit){
      this.feederReading.totalConsumption = this.feederReading.meterConsumption + this.feederReading.assUnit;
    } else{
      this.feederReading.totalConsumption = this.feederReading.meterConsumption;
    }
    console.log(this.feederReading);
  }

  replaceButtonClicked(){
    this.feederReading.currReading = undefined;
    this.feederReading.currReadingDate = undefined;
    this.feederMeterReplacement = true;
  }

  replacementDateChanged(){
    this.feederReading.currReadingDate = undefined;
  }

  startReadChanged(){
    this.feederReading.currReading = undefined;
  }

  calculateConsumption(){
    if(this.feederMeterReplacement){
      if(this.feederReading.currReading && this.feederReading.prevReading && this.feederReading.newMeterStartRead && this.feederReading.finalRead && 
        this.feederReading.mf && this.feederReading.newMf && this.feederReading.currReading >= this.feederReading.newMeterStartRead &&
        this.feederReading.finalRead >= this.feederReading.prevReading){
          let oldDiff = (Number.parseFloat(this.feederReading.finalRead) - Number.parseFloat(this.feederReading.prevReading)).toFixed(3);
          let oldConsumption = Number.parseFloat(oldDiff) * Number.parseFloat(this.feederReading.mf);
          let newDiff = (Number.parseFloat(this.feederReading.currReading) - Number.parseFloat(this.feederReading.newMeterStartRead)).toFixed(3);
          let newConsumption = Number.parseFloat(newDiff) * Number.parseFloat(this.feederReading.newMf);
          this.feederReading.readingDiff = oldDiff + newDiff;
          this.feederReading.meterConsumption = oldConsumption + newConsumption;
          this.calculateTotalConsumption();
      }
    } else{
      if(this.feederReading.currReading && this.feederReading.prevReading && 
        this.feederReading.mf && this.feederReading.currReading >= this.feederReading.prevReading){
          this.feederReading.readingDiff = (Number.parseFloat(this.feederReading.currReading) - Number.parseFloat(this.feederReading.prevReading)).toFixed(3);
          this.feederReading.meterConsumption = this.feederReading.readingDiff * Number.parseFloat(this.feederReading.mf);
          this.calculateTotalConsumption();
      }
    }
  }

  submitClicked(feederReadingAddForm){
    if(this.globalResources.validateForm(feederReadingAddForm)){
      this.feederReading.currReadingDateInString = this.feederReading.currReadingDate;
      // this.feederReading.currReadingDate = new Date(this.feederReading.currReadingDate);
      this.calculateConsumption();
      if(this.feederMeterReplacement){

      } else{
        this.addFeederReading();
      }
    }
  }

  addFeederReading(){
    console.log(this.feederReading);
    // this.loading = true;
    // this.feederService.addFeederReading(this.feederReading, this.user.username).subscribe(success =>{
    //   console.log(success);
    // }, error =>{
    //   console.log(error);
    // });
  }

  replaceMeter(){
    this.feederService.addFeederMeterReplacement(this.feederReading, this.user.username).subscribe(success =>{
      console.log(success);
    }, error=>{
      console.log(error);
    });
  }

  getNextBillMonth(billMonth) : string {
		let values = billMonth.split('-');
		let month = values[0];
		let year = 	parseInt(values[1]);
		let nextMonth;
		let nextYear = year;
		switch (month) {
		case "JAN":
			nextMonth = 'FEB';
			break;
		case "FEB":
			nextMonth = 'MAR';
			break;
		case "MAR":
			nextMonth = 'APR';
			break;
		case "APR":
			nextMonth = 'MAY';
			break;
		case "MAY":
			nextMonth = 'JUN';
			break;
		case "JUN":
			nextMonth = 'JUL';
			break;
		case "JUL":
			nextMonth = 'AUG';
			break;
		case "AUG":
			nextMonth = 'SEP';
			break;
		case "SEP":
			nextMonth = 'OCT';
			break;
		case "OCT":
			nextMonth = 'NOV';
			break;
		case "NOV":
			nextMonth = 'DEC';
			break;
		case "DEC":
			nextMonth = 'JAN';
			nextYear = nextYear + 1;
			break;
		default:
			break;
		}
		return nextMonth.toUpperCase()+"-"+nextYear;
	}
}
