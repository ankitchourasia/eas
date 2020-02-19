import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-feeder-33kv-add',
  templateUrl: './feeder-33kv-add.component.html',
  styleUrls: ['./feeder-33kv-add.component.css']
})
export class Feeder33KVAddComponent implements OnInit {
  COMPONENT_NAME = "Feeder33KVAddComponent";
  user : any;
  feeder:any;
  regionList: any;
  circleList: any;
  divisionList: any;
  zoneList: any;
  _submitClicked : boolean;
  
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants, 
    private feederService : FeederService, private substationService: SubstationService,
    private zoneService: ZoneService) { 

  }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.feeder = {};
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
      this.feeder.region = this.user.region;
      this.feeder.circle = this.user.circle;
      this.feeder.division = this.user.division;
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
    console.log("zoneChanged");
  }
  
  submitClicked(feederAddForm){
    let methodName = "submitClicked";
    console.log(this.feeder);
    if(this.globalResources.validateForm(feederAddForm)){
      this._submitClicked = true;
      this.feederService.add33KVFeeder(this.feeder, false).subscribe(successResponese =>{
        this._submitClicked = false;
        let alertResponse = this.globalResources.successAlert("Feeder added successfully");
        alertResponse.then(result =>{
          this.feeder = {};
          this.globalResources.resetValidateForm(feederAddForm);
        });
      }, errorResponse =>{
        console.log(errorResponse);
        this._submitClicked = false;
        let alertResponse = this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
        alertResponse.then(result =>{
          
        });
      });
    }
  }

  resetClicked(feederAddForm){
    this.setPartialData();
    this.globalResources.resetValidateForm(feederAddForm);
  }

}
