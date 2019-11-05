import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '@eas-utility/global.constants';
import { ZoneService } from '@eas-services/zone/zone.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-substation-add',
  templateUrl: './substation-add.component.html',
  styleUrls: ['./substation-add.component.css']
})
export class SubstationAddComponent implements OnInit {

  substation : any;
  user : any;
  zoneList: any;
  submitButtonClicked : boolean;
  constructor(public globalResources: GlobalResources, private globalConstants : GlobalConstants,
    private zoneService : ZoneService, private substationService : SubstationService) { 

  }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.substation = {};
    this.zoneList = [];
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
      // this.zoneList = this.user.zoneList;
      this.getZoneListByDivisionId(this.user.division.id);
    }else if(this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
      this.zoneList.push(this.user.zone);
      this.substation.zone = this.user.zone;
      this.substation.zoneId = this.substation.zone.id;
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

  zoneChanged(){
    this.substation.zoneId = this.substation.zone.id;
  }

  submitClicked(substationAddForm){
    if(this.globalResources.validateForm(substationAddForm)){
      this.submitButtonClicked = true;
      this.substationService.addSubstation(this.substation).subscribe(success =>{
        this.submitButtonClicked = false;
        let alertResponse = this.globalResources.successAlert("Substation added successfully");
        alertResponse.then(result =>{
          this.setPartialData();
          this.globalResources.resetValidateForm(substationAddForm);
        });
      }, error =>{
        this.submitButtonClicked = false;
        console.log(error);
      })
    }
  }

  resetClicked(substationAddForm){
    this.setPartialData();
    this.globalResources.resetValidateForm(substationAddForm);
  }
}
