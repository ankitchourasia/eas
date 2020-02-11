import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { SubstationService } from '@eas-services/substation/substation.service';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

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
  previousReading : any = {};
  loading : boolean;
  constructor(private globalResources : GlobalResources, private substationService : SubstationService, 
    private feederService : FeederService, private zoneService: ZoneService) { }

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
    this.feederReading.currentReadingDate = undefined;
    this.feederService.getPreviousReadingBy33KVFeederId(feederId, false).subscribe(success =>{
      this.previousReading = success;
      this.feederReading.prevBillMonth = this.previousReading.billMonth;
      this.feederReading.previousRead = this.previousReading.currentRead;
      this.feederReading.previousReadDate = this.previousReading.currentReadDate;
      this.feederReading.previousReadDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.feederReading.previousReadDate);
      this.feederReading.billMonth = this.globalResources.getNextBillMonth(this.previousReading.billMonth);
    }, error =>{
      console.log(error);
      let alertResponse = this.globalResources.handleError(error, this.COMPONENT_NAME, methodName);
    });
  }

  assessmentChanged(){
    this.calculateTotalConsumption();
  }

  calculateTotalConsumption(){
    if(this.feederReading.assessment){
      this.feederReading.totalConsumption = this.feederReading.consumption + this.feederReading.assessment;
    } else{
      this.feederReading.totalConsumption = this.feederReading.consumption;
    }
  }

  calculateConsumption(){
    if(this.feederReading.currentRead >= 0 && this.feederReading.previousRead >= 0 && 
      this.feederReading.mf && this.feederReading.currentRead >= this.feederReading.previousRead){
        this.feederReading.difference = (Number(this.feederReading.currentRead) - Number(this.feederReading.previousRead)).toFixed(2);
        this.feederReading.consumption = this.feederReading.difference * Number(this.feederReading.mf);
        this.calculateTotalConsumption();
    }
  }

  submitClicked(feederReadingAddForm){
    if(this.globalResources.validateForm(feederReadingAddForm)){
      this.calculateConsumption();
      this.feederReading.currentReadDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.feederReading.currentReadingDate);
      this.feederReading.currentReadDate = new Date(this.feederReading.currentReadingDate);
      this.addFeederReading(feederReadingAddForm);
    }
  }

  addFeederReading(feederReadingAddForm){
    let methodName = "addFeederReading";
    this.loading = true;
    console.log(this.feederReading);
    this.feederService.add33KVFeederReading(this.feederReading, this.user.username, false).subscribe(success =>{
      this.globalResources.successAlert("Reading added successfully");
      this.loading = false;
      this.feederReading = {};
      this.globalResources.resetValidateForm(feederReadingAddForm);

    }, error =>{
      console.log(error);
      this.loading = false;
      let alertResponse = this.globalResources.handleError(error, this.COMPONENT_NAME, methodName);
    });
  }
}
