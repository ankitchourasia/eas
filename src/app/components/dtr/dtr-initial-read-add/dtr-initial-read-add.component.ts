import { Component, OnInit } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';
import { GlobalConstants } from 'app/utility/global.constants';
import { DtrService } from '@eas-services/dtr-service/dtr.service';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';

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
  feederList: any;
  substationList: any;
  dtrInitialRead: any;
  submitButtonClicked : boolean;

  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private dtrService : DtrService, private feederService : FeederService, private substationService: SubstationService) { }

  ngOnInit() {
    this.dtrInitialRead = {};
    this.substationList = null;
    this.user = this.globalResources.getUserDetails();
    this.checkUserRoll(this.user);
  }

  checkUserRoll(user){
    this.zoneList = [];
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    if(user.role === 'super_admin'){
      this.getRegions();
    }else if(user.role === 'admin'){
      this.zoneList = (user.zoneList);
      this.regionList.push(user.region);
      this.circleList.push(user.circle);
      this.divisionList.push(user.division);
    }else if(user.role === 'field_admin'){
      this.zoneList.push(user.zone);
      this.regionList.push(user.region);
      this.circleList.push(user.circle);
      this.divisionList.push(user.division);
    }
    console.log(this.regionList, this.circleList, this.divisionList, this.zoneList);
  }

  getRegions(){
  
  }

  regionChanged(){
    console.log(this.dtrInitialRead);
  }

  circleChanged(){
    console.log(this.dtrInitialRead);
  }

  divisionChanged(){
    console.log(this.dtrInitialRead);
  }
  
  zoneChanged(){
    this.substationList = null;
    this.dtrInitialRead.feederId = undefined;
    this.dtrInitialRead.substationId = undefined;
    console.log(this.dtrInitialRead);
    this.getSubstationByZoneId(this.dtrInitialRead.zoneId);
  }

  getSubstationByZoneId(zoneId){
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(successResponese =>{
      this.substationList = successResponese;
    }, error =>{
      console.log(error);
    });
  }

  substationChanged(){
    this.feederList = null;
    this.dtrInitialRead.feederId = undefined;
    this.getFeederBySubstationId(this.dtrInitialRead.substationId);  
  }

  getFeederBySubstationId(substationId){
    this.feederService.getFeederBySubstationId(substationId).subscribe(successResponese =>{
      this.feederList = successResponese;
    },error =>{
      console.log(error);
    });
  }

  srDateChanged(){
    this.dtrInitialRead.srDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.dtrInitialRead.srDate);
  }
  
  submitClicked(dtrAddForm){
    if(this.globalResources.validateForm(dtrAddForm)){
      this.addDTR(dtrAddForm);
    }
  }

  addDTR(dtrAddForm){
    console.log(this.dtrInitialRead);
    this.submitButtonClicked = true;
    this.dtrService.addDTR(this.dtrInitialRead).subscribe(successResponese =>{
      this.submitButtonClicked = false;
      let alertResponse = this.globalResources.successAlert("DTR added successfully");
      alertResponse.then(result =>{
        this.dtrInitialRead = {};
        this.globalResources.resetValidateForm(dtrAddForm);
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
}