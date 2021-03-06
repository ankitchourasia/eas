import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { DivisionService } from '@eas-services/division-service/division.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-feeder-interruption-add',
  templateUrl: './feeder-interruption-add.component.html',
  styleUrls: ['./feeder-interruption-add.component.css']
})
export class FeederInterruptionAddComponent implements OnInit {

  COMPONENT_NAME: string = "FeederInterruptionAddComponent";
  regionList: any;
  circleList: any;
  divisionList: any;
  zoneList: any;
  substationList: any;
  feederList: any;
  user: any;
  formData: any;
  _submitClicked: boolean;
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private zoneService: ZoneService,private feederService : FeederService, private substationService: SubstationService,
    private regionService: RegionService, private circleService: CircleService, private divisionService: DivisionService) { }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.formData = {};
    this.zoneList = [];
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    this.substationList = [];
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.getRegionList();
    }else if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
      // this.zoneList = (this.user.zoneList);
      this.getZoneListByDivisionId(this.user.division.id);
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      this.formData.region = this.user.region;
      this.formData.circle = this.user.circle;
      this.formData.division = this.user.division;
    }else if(this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
      this.zoneList.push(this.user.zone);
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      this.formData.region = this.user.region;
      this.formData.circle = this.user.circle;
      this.formData.division = this.user.division;
      this.formData.zone = this.user.zone;
      this.getSubstationByZoneId(this.formData.zone.id);
    }
  }
  
  getRegionList(){
    this.regionService.getRegions(false).subscribe(successResponse =>{
      this.regionList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  regionChanged(region){
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.circleList = [];
      this.formData.circle = undefined;
      this.divisionList = [];
      this.formData.division = undefined;
      this.zoneList = [];
      this.formData.zone = undefined;
      this.substationList = [];
      this.formData.substation = undefined;
      this.feederList = [];
      this.formData.feeder = undefined;
      this.getCircleListByRegionId(region.id);
    }
  }

  getCircleListByRegionId(regionId){
    this.circleService.getCirclesByRegionId(regionId, false).subscribe(successResponse =>{
      this.circleList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  circleChanged(circle){
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.divisionList = [];
      this.formData.division = undefined;
      this.zoneList = [];
      this.formData.zone = undefined;
      this.substationList = [];
      this.formData.substation = undefined;
      this.feederList = [];
      this.formData.feeder = undefined;
      this.getDivisionListByCircleId(circle.id);
    }
  }

  getDivisionListByCircleId(circleId){
    this.divisionService.getDivisionsByCircleId(circleId, false).subscribe(successResponse =>{
      this.divisionList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  divisionChanged(division){
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.zoneList = [];
      this.formData.zone = undefined;
      this.substationList = [];
      this.formData.substation = undefined;
      this.feederList = [];
      this.formData.feeder = undefined;
      this.getZoneListByDivisionId(division.id);
    }
  }

  getZoneListByDivisionId(divisionId){
    // this.zoneList = this.user.zoneList;
    this.zoneList = [];
    this.zoneService.getZonesByDivisionId(divisionId, false).subscribe(successResponse =>{
      this.zoneList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }
  
  zoneChanged(zone){
    this.substationList = [];
    this.formData.substation = undefined;
    this.feederList = [];
    this.formData.feeder = undefined;
    this.getSubstationByZoneId(zone.id);
  }

  getSubstationByZoneId(zoneId){
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(successResponese =>{
      this.substationList = successResponese;
    }, errorResponse =>{
      console.log(errorResponse);
    });
  }

  substationChanged(substation){
    this.feederList = [];
    this.formData.feeder = undefined;
    this.getFeederBySubstationId(substation.id);  
  }

  getFeederBySubstationId(substationId){
    this.feederService.getFeederBySubstationId(substationId).subscribe(successResponese =>{
      this.feederList = successResponese;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  feederChanged(feeder){
    console.log(feeder);
  }

  billMonthChanged(){
    if(this.formData.month && this.formData.year){
      this.formData.billMonth = this.formData.month + "-" + this.formData.year;
    }
  }

  billMonthYearChanged(){
    if(this.formData.month && this.formData.year){
      this.formData.billMonth = this.formData.month + "-" + this.formData.year;
    }
  }

  minutesChanged(){
    if(this.formData.minutes && this.formData.seconds){
      this.formData.interruptionDuration = (this.formData.minutes * 60) + this.formData.seconds;
    }
  }

  secondsChanged(){
    if(this.formData.minutes && this.formData.seconds){
      this.formData.interruptionDuration = (this.formData.minutes * 60) + this.formData.seconds;
    }
  }

  submitClicked(interruptionAddForm){
    let methodName = "submitClicked";
    if(!this.globalResources.validateForm(interruptionAddForm)){
      return;
    }
    this._submitClicked = true;
    this.formData.feederId = this.formData.feeder.id;
    this.formData.groupNo = this.formData.feeder.groupNo;
    this.formData.feederCode = "DUMMY";
    this.formData.zoneId = this.formData.zone.id;
    this._submitClicked = false;
    this.feederService.addFeederInterruption(this.formData, false).subscribe(successResponse =>{
      this._submitClicked = false;
      console.log(successResponse);
      let alertResponse =this.globalResources.successAlert("Feeder interruption saved successfully");
      alertResponse.then(result =>{
        this.globalResources.resetValidateForm(interruptionAddForm);
        this.setPartialData();
      });
    },errorResponse =>{
      this._submitClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }
  
  resetClicked(interruptionAddForm){
    this.globalResources.resetValidateForm(interruptionAddForm);
    this.setPartialData();
  }

}