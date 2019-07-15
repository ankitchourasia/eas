import { Component, OnInit } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';
import { GlobalConstants } from 'app/utility/global.constants';
import { DtrService } from '@eas-services/dtr-service/dtr.service';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { DivisionService } from '@eas-services/division-service/division.service';

@Component({
  selector: 'eas-dtr-initial-read-add',
  templateUrl: './dtr-initial-read-add.component.html',
  styleUrls: ['./dtr-initial-read-add.component.css']
})
export class DtrInitialReadAddComponent implements OnInit {

  user : any;
  zoneList: any;
  regionList: any;
  circleList: any;
  divisionList: any;
  dtrList: any;
  feederList: any;
  substationList: any;
  dtrInitialReadAdd: any;
  submitButtonClicked : boolean;

  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private dtrService : DtrService, private feederService : FeederService, private substationService: SubstationService,
    private regionService: RegionService, private circleService: CircleService, private divisionService: DivisionService) { }

  ngOnInit() {
    this.dtrInitialReadAdd = {};
    this.substationList = null;
    this.user = this.globalResources.getUserDetails();
    this.checkUserRoll(this.user);
  }

  checkUserRoll(user){
    this.zoneList = [];
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    this.getCurrentYear();
    if(user.role === 'super_admin'){
      this.getRegions();
    }else if(user.role === 'admin'){
      this.zoneList = (user.zoneList);
      this.regionList.push(user.region);
      this.circleList.push(user.circle);
      this.divisionList.push(user.division);
      this.dtrInitialReadAdd.region = user.region;
      this.dtrInitialReadAdd.circle = user.circle;
      this.dtrInitialReadAdd.division = user.division;
    }else if(user.role === 'field_admin'){
      this.zoneList.push(user.zone);
      this.regionList.push(user.region);
      this.circleList.push(user.circle);
      this.divisionList.push(user.division);
      this.dtrInitialReadAdd.region = user.region;
      this.dtrInitialReadAdd.circle = user.circle;
      this.dtrInitialReadAdd.division = user.division;
      this.dtrInitialReadAdd.zone = user.zone;
    }
    console.log(this.regionList, this.circleList, this.divisionList, this.zoneList);
  }

  getRegions(){
    this.regionService.getRegions(false).subscribe(successResponse =>{
      this.regionList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  regionChanged(reagion){
    this.dtrInitialReadAdd.circle = undefined;
    this.dtrInitialReadAdd.division = undefined;
    this.dtrInitialReadAdd.zone = undefined;
    this.dtrInitialReadAdd.substation = undefined;
    this.dtrInitialReadAdd.feeder = undefined;
    this.dtrInitialReadAdd.dtr = undefined;
    console.log(this.dtrInitialReadAdd);
  }

  circleChanged(circle){
    console.log(this.dtrInitialReadAdd);
  }

  divisionChanged(division){
    console.log(this.dtrInitialReadAdd);
  }
  
  zoneChanged(zone){
    this.substationList = null;
    this.dtrInitialReadAdd.feeder = undefined;
    this.dtrInitialReadAdd.substation = undefined;
    console.log(this.dtrInitialReadAdd);
    this.getSubstationByZoneId(zone.id);
  }

  getSubstationByZoneId(zoneId){
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(successResponese =>{
      this.substationList = successResponese;
    }, error =>{
      console.log(error);
    });
  }

  substationChanged(substation){
    this.feederList = null;
    this.dtrInitialReadAdd.feeder = undefined;
    this.getFeederBySubstationId(substation.id);  
  }

  getFeederBySubstationId(substationId){
    this.feederService.getFeederBySubstationId(substationId).subscribe(successResponese =>{
      this.feederList = successResponese;
    },error =>{
      console.log(error);
    });
  }

  feederChanged(feeder){
    this.dtrList = null;
    this.dtrInitialReadAdd.dtr = undefined;
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

  billMonthChanged(){
    this.dtrInitialReadAdd.prevReading = undefined;
		this.dtrInitialReadAdd.prevReadingDateInString = undefined;
    this.dtrInitialReadAdd.currReading = undefined;
    this.dtrInitialReadAdd.currReadingDate = undefined;
		this.dtrInitialReadAdd.currReadingDateInString = undefined;
		this.dtrInitialReadAdd.assUnit = 0;
		this.dtrInitialReadAdd.mf = undefined;
		this.dtrInitialReadAdd.meterNo = undefined;
		this.dtrInitialReadAdd.readingDiff = undefined;
		this.dtrInitialReadAdd.meterConsumption = undefined;
		this.dtrInitialReadAdd.totalConsumption = undefined;
		if(this.dtrInitialReadAdd.year && this.dtrInitialReadAdd.month){
			this.dtrInitialReadAdd.billMonth = this.dtrInitialReadAdd.month + "-" + this.dtrInitialReadAdd.year;
    }
  }

  billMonthYearChanged(){
    this.billMonthChanged();
  }

  dtrChanged(dtr){
    this.checkInitialReadingPresent(dtr);
  }

  checkInitialReadingPresent(dtr){
    if(dtr){
      this.dtrService.getReadingByDTRId(dtr.id).subscribe(successResponse =>{
        let existingReading = successResponse;
        if(existingReading){
          let alertResponse = this.globalResources.errorAlert("Initial Reading(S/R) for DTR <br><strong>" + dtr.dtrName + "</strong> exists!!!.");
          alertResponse.then(result =>{
            this.dtrInitialReadAdd.dtr = undefined;
          });
        }
      },errorResponse =>{
        console.log(errorResponse);
      });
    }
  }

  dtrInitialReadingChanged(){
    this.calculateDifference();
  }

  errorInReading: boolean;
  calculateDifference(){
    let currentReading = this.dtrInitialReadAdd.currReading;
		this.dtrInitialReadAdd.prevReading = currentReading;
    let previousReading = this.dtrInitialReadAdd.prevReading;
    if(currentReading  && previousReading && currentReading >= previousReading){
			this.errorInReading = false;
			let difference = currentReading - previousReading;
			this.dtrInitialReadAdd.readingDiff = difference;
			this.dtrInitialReadAdd.readingDiff = Math.round(this.dtrInitialReadAdd.readingDiff * 100) / 100;
			this.dtrInitialReadAdd.meterConsumption = difference * this.dtrInitialReadAdd.dtr.overallMF;
      this.dtrInitialReadAdd.meterConsumption = Math.round(this.dtrInitialReadAdd.meterConsumption * 100) / 100;
      if(this.dtrInitialReadAdd.assUnit){
        this.dtrInitialReadAdd.totalConsumption = this.dtrInitialReadAdd.meterConsumption + this.dtrInitialReadAdd.assUnit;
      }else{
        this.dtrInitialReadAdd.totalConsumption = this.dtrInitialReadAdd.meterConsumption;
      }
		}else{
			this.errorInReading = true;
		}
  }

  dtrInitialReadingDateChanged(){
    this.makeCurrentReadingDate(this.dtrInitialReadAdd.currReadingDate);
  }

  makeCurrentReadingDate(currReadingDate){
    this.dtrInitialReadAdd.currReadingDateInString = this.globalResources.makeDateAsDD_MM_YYYY(currReadingDate);
  }

  dtrAssessmentUnitChanged(){
    if(this.dtrInitialReadAdd.assUnit){
      this.dtrInitialReadAdd.totalConsumption = this.dtrInitialReadAdd.meterConsumption + this.dtrInitialReadAdd.assUnit;
    }else{
      this.dtrInitialReadAdd.totalConsumption = this.dtrInitialReadAdd.meterConsumption;
    }
  }

  submitClicked(dtrInitialReadAddForm){
    if(this.globalResources.validateForm(dtrInitialReadAddForm)){
      this.submitButtonClicked = true;
      // this.calculateDifference();
      // this.makeCurrentReadingDate(this.dtrInitialReadAdd.currReadingDate);
      // new flow in which prev reading & its date is same as current reading
      this.dtrInitialReadAdd.dtrId = this.dtrInitialReadAdd.dtr.id;
      this.dtrInitialReadAdd.zoneId = this.dtrInitialReadAdd.zone.id;
      this.dtrInitialReadAdd.feederId = this.dtrInitialReadAdd.feeder.id;
      this.dtrInitialReadAdd.groupNo1 = this.dtrInitialReadAdd.feeder.groupNo;
      this.dtrInitialReadAdd.mf = this.dtrInitialReadAdd.dtr.overallMF;
      this.dtrInitialReadAdd.meterNo = this.dtrInitialReadAdd.dtr.dtrMeterNo;
      this.dtrInitialReadAdd.readerNo1 = this.dtrInitialReadAdd.dtr.billingRDNo;
      this.dtrInitialReadAdd.prevReadingDateInString = this.dtrInitialReadAdd.currReadingDateInString;
      this.submitButtonClicked = false;
      console.log(this.dtrInitialReadAdd);
      this.addDTRInitialRead(dtrInitialReadAddForm);
    }
  }

  addDTRInitialRead(dtrInitialReadAddForm){
    this.submitButtonClicked = true;
    this.dtrService.addDTRRead(this.dtrInitialReadAdd, this.user.username).subscribe(successResponese =>{
      this.submitButtonClicked = false;
      let alertResponse = this.globalResources.successAlert("DTR initial read added successfully");
      alertResponse.then(result =>{
        this.clearPartialData();
        this.globalResources.resetValidateForm(dtrInitialReadAddForm);
      });
    }, errorResponse =>{
      console.log(errorResponse);
      this.submitButtonClicked = false;
      let alertResponse = this.globalResources.errorAlert(errorResponse.error.errorMessage);
      alertResponse.then(result =>{
        console.log("alert result", result);
      });
    });
  }

  clearPartialData(){
    this.errorInReading = false;
    this.dtrInitialReadAdd.prevReading = undefined;
		this.dtrInitialReadAdd.prevReadingDateInString = undefined;
    this.dtrInitialReadAdd.currReading = undefined;
    this.dtrInitialReadAdd.currReadingDate = undefined;
		this.dtrInitialReadAdd.currReadingDateInString = undefined;
    this.dtrInitialReadAdd.assUnit = 0;
		this.dtrInitialReadAdd.mf = undefined;
		this.dtrInitialReadAdd.meterNo = undefined;
		this.dtrInitialReadAdd.readingDiff = undefined;
		this.dtrInitialReadAdd.meterConsumption = undefined;
		this.dtrInitialReadAdd.totalConsumption = undefined;
    this.dtrInitialReadAdd.readerNo1 = undefined;
    // this.dtrList.splice(this.dtrList.indexOf(this.dtrInitialReadAdd.dtr.id),1);
    this.dtrInitialReadAdd.dtr = undefined;
  }

  years: any = [];
  getCurrentYear(){
    let year = 2016;
    while(year <= 2050){
      this.years.push(year++);
    }
  }
}