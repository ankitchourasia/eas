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
  regionList: any;
  circleList: any;
  divisionList: any;
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
      this.substation.region = this.user.region;
      this.substation.circle = this.user.circle;
      this.substation.division = this.user.division;
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

  submitClicked(substationAddForm){
    if(this.globalResources.validateForm(substationAddForm)){
      this.submitButtonClicked = true;
      this.substation.zoneId = this.substation.zone.id;
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
