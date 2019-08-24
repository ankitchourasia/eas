import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { DtrService } from '@eas-services/dtr-service/dtr.service';

@Component({
  selector: 'eas-dtr-add',
  templateUrl: './dtr-add.component.html',
  styleUrls: ['./dtr-add.component.css']
})
export class DtrAddComponent implements OnInit {

  user : any;
  dtr:any;
  zoneList: any;
  feederList: any;
  substationList: any;
  submitButtonClicked : boolean;

  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private dtrService : DtrService, private feederService : FeederService, private substationService: SubstationService) { }


  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.dtr = {};
    this.zoneList = [];
    this.substationList = null;
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === this.globalConstants.ROLE_ADMIN){
      this.zoneList = this.user.zoneList;
    }else if(this.user.role === this.globalConstants.ROLE_FIELD_ADMIN){
      this.zoneList.push(this.user.zone);
      this.dtr.zone = this.user.zone;
      this.dtr.zoneId = this.dtr.zone.id;
      this.getSubstationByZoneId(this.dtr.zoneId);
    }
  }
  
  zoneChanged(){
    this.substationList = null;
    this.dtr.feederId = undefined;
    this.dtr.substationId = undefined;
    this.dtr.zoneId = this.dtr.zone.id;
    this.getSubstationByZoneId(this.dtr.zoneId);
  }

  getSubstationByZoneId(zoneId){
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(successResponese =>{
      this.substationList = successResponese;
    }, errorResponse =>{
      console.log(errorResponse);
    });
  }

  substationChanged(){
    this.feederList = null;
    this.dtr.feederId = undefined;
    this.getFeederBySubstationId(this.dtr.substationId);  
  }

  getFeederBySubstationId(substationId){
    this.feederService.getFeederBySubstationId(substationId).subscribe(successResponese =>{
      this.feederList = successResponese;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  srDateChanged(){
    this.dtr.srDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.dtr.srDate);
  }
  
  submitClicked(dtrAddForm){
    if(this.globalResources.validateForm(dtrAddForm)){
      this.addDTR(dtrAddForm);
    }
  }

  addDTR(dtrAddForm){
    console.log(this.dtr);
    this.submitButtonClicked = true;
    this.dtrService.addDTR(this.dtr).subscribe(successResponese =>{
      this.submitButtonClicked = false;
      let alertResponse = this.globalResources.successAlert("DTR added successfully");
      alertResponse.then(result =>{
        this.globalResources.resetValidateForm(dtrAddForm);
        this.setPartialData();
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

  resetClicked(dtrAddForm){
    this.setPartialData();
    this.globalResources.resetValidateForm(dtrAddForm);
  }
}
