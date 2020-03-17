import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-feeder-add',
  templateUrl: './feeder-add.component.html',
  styleUrls: ['./feeder-add.component.css']
})
export class FeederAddComponent implements OnInit {

  COMPONENT_NAME: string = "FeederAddComponent";
  user : any;
  feeder:any;
  regionList: any;
  circleList: any;
  divisionList: any;
  zoneList: any;
  substationList: any;
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
    this.substationList = [];
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
    this.substationList = [];
    this.feeder.substationId = undefined;
    this.getSubstationByZoneId(this.feeder.zoneId);
  }

  getSubstationByZoneId(zoneId){
    this.substationList = [];
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(successResponese =>{
      this.substationList = successResponese;
    }, error =>{
      console.log(error);
    });
  }
  
  submitClicked(feederAddForm){
    let methodName = "submitClicked";
    if(this.globalResources.validateForm(feederAddForm)){
      this._submitClicked = true;
      this.feederService.addFeeder(this.feeder).subscribe(successResponese =>{
        this._submitClicked = false;
        let alertResponse = this.globalResources.successAlert("Feeder added successfully");
        alertResponse.then(result =>{
          this.setPartialData();
          this.globalResources.resetValidateForm(feederAddForm);
        });
      }, errorResponse =>{
        this._submitClicked = false;
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
      });
    }
  }

  resetClicked(feederAddForm){
    this.setPartialData();
    this.globalResources.resetValidateForm(feederAddForm);
  }

}
