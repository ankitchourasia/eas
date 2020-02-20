import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { SubstationService } from '@eas-services/substation/substation.service';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-feeder-initial-read-add',
  templateUrl: './feeder-initial-read-add.component.html',
  styleUrls: ['./feeder-initial-read-add.component.css']
})
export class FeederInitialReadAddComponent implements OnInit {

  COMPONENT_NAME: string = "FeederInitialReadAddComponent";
  user : any = {};
  feederReading : any = {};
  regionList: any;
  circleList: any;
  divisionList: any;
  zoneList: any;
  substations : any;
  feeders : any;
  // previousReading : any = {};
  loading : boolean;
  formDates : any = {};
  month : any;
  year : any;

  constructor(private globalResources : GlobalResources, private substationService : SubstationService, 
    private feederService : FeederService, public globalConstants : GlobalConstants,
    private zoneService: ZoneService) { }

  
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
    this.feederReading.feeder = undefined;
    this.clearDetails();
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
    this.clearDetails();
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
    this.feederReading.groupNo = feeder.groupNo;
		this.feederReading.mf = feeder.mf;
		this.feederReading.meterNo = feeder.meterNo;
    this.getFeederReadingByFeederId(feeder.id, feeder.meterNo);
  }

  getFeederReadingByFeederId(feederId, meterNo){
    let methodName = "getFeederReadingByFeederId";
    this.feederReading.currReading = undefined;
    this.formDates.currReadingDate = undefined;
    this.feederService.getFeederReadingsByFeederId(feederId, meterNo, true).subscribe(success =>{
      let result = <any> success;
      console.log(success);
      if(result.status === 200){
        this.feederReading.feeder = undefined;
        this.globalResources.errorAlert("Reading already present for selected feeder.");
      }
    }, errorResponse =>{
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  calculateTotalConsumption(){
    if(this.feederReading.assUnit){
      this.feederReading.totalConsumption = this.feederReading.meterConsumption + this.feederReading.assUnit;
    } else{
      this.feederReading.totalConsumption = this.feederReading.meterConsumption;
    }
  }

  previousReadDateChanged(){
    this.formDates.currReadingDate = undefined;
  }

  previousReadingChanged(){
    this.feederReading.currReading = undefined;
  }

  assessmentChanged(){
    this.calculateTotalConsumption();
  }

  calculateConsumption(){
    if(this.feederReading.currReading >= 0 && this.feederReading.prevReading >= 0 && 
      this.feederReading.mf && this.feederReading.currReading >= this.feederReading.prevReading){
        this.feederReading.readingDiff = (Number.parseFloat(this.feederReading.currReading) - Number.parseFloat(this.feederReading.prevReading)).toFixed(2);
        this.feederReading.meterConsumption = this.feederReading.readingDiff * Number.parseFloat(this.feederReading.mf);
        this.calculateTotalConsumption();
    }
  }

  submitClicked(feederReadingAddForm){
    if(this.globalResources.validateForm(feederReadingAddForm)){
      this.calculateConsumption();
      this.feederReading.currReadingDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.formDates.currReadingDate);
      this.feederReading.currReadingDate = new Date(this.formDates.currReadingDate);
      this.feederReading.prevReadingDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.formDates.prevReadingDate);
      this.feederReading.prevReadingDate = new Date(this.formDates.prevReadingDate);
      this.feederReading.billMonth = this.month + '-' + this.year;
      this.feederReading.groupNo1 = this.feederReading.groupNo;
      this.addFeederReading(feederReadingAddForm);
    }
  }

  addFeederReading(feederReadingAddForm){
    let methodName = "addFeederReading";
    this.loading = true;
    this.feederService.addFeederReading(this.feederReading, this.user.username).subscribe(success =>{
      this.globalResources.successAlert("Reading added successfully");
      this.loading = false;
      this.setPartialData();
      this.globalResources.resetValidateForm(feederReadingAddForm);

    }, errorResponse =>{
      this.loading = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  resetClicked(feederReadingAddForm){
    this.setPartialData();
    this.globalResources.resetValidateForm(feederReadingAddForm);
  }

  clearDetails(){
    this.feederReading.groupNo = undefined;
    this.feederReading.meterNo = undefined;
    this.feederReading.mf = undefined;
    this.feederReading.month = undefined;
    this.feederReading.year = undefined;
    this.feederReading.prevReading = undefined;
    this.feederReading.currReading = undefined;
    this.formDates = {};
    this.feederReading.readingDiff = undefined;
    this.feederReading.meterConsumption = undefined;
    this.feederReading.assUnit = undefined;
    this.feederReading.totalConsumption = undefined;
  }
}
