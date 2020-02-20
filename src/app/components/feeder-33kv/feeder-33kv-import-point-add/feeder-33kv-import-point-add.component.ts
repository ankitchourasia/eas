import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { ImportService } from '@eas-services/import-service/import.service';

@Component({
  selector: 'eas-feeder-33kv-import-point-add',
  templateUrl: './feeder-33kv-import-point-add.component.html',
  styleUrls: ['./feeder-33kv-import-point-add.component.css']
})
export class Feeder33KVImportPointAddComponent implements OnInit {

  COMPONENT_NAME: string = "Feeder33KVImportPointAddComponent";
  user:any;
  formData: any;
  regionList: any;
  circleList: any;
  divisionList: any;
  zoneList: any;
  feederList:any;
  submitButtonClicked: boolean;
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants, 
    private feederService : FeederService, private importService: ImportService, private zoneService: ZoneService) { }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.formData = {};
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    this.zoneList = [];
    this.feederList = [];
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      this.getZoneListByDivisionId(this.user.division.id);
      this.formData.region = this.user.region;
      this.formData.circle = this.user.circle;
      this.formData.division = this.user.division;
    }else if(this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      this.zoneList.push(this.user.zone);
      this.formData.region = this.user.region;
      this.formData.circle = this.user.circle;
      this.formData.division = this.user.division;
      this.formData.zone = this.user.zone;
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
  
  zoneChanged(zone){
    console.log("zone changed");
    this.formData.feeder = undefined;
    this.get33KVFeederByZoneId(zone.id);
  }

  get33KVFeederByZoneId(zoneId){
    this.feederList = [];
    this.feederService.get33KVFeederByZoneId(zoneId, false).subscribe(success =>{
      this.feederList = success;
    }, error =>{
      console.log(error);
    });
  }

  submitClicked(importPointAddForm){
    if(this.globalResources.validateForm(importPointAddForm)){
      this.submitButtonClicked = true;
      this.formData.regionId = this.formData.region.id;
      this.formData.circleId = this.formData.circle.id;
      this.formData.divisionId = this.formData.division.id;
      this.formData.zoneId = this.formData.zone.id;
      this.formData.feeder33KVId = this.formData.feeder.id;
      this.submitButtonClicked = false;
      this.addImportPoint(importPointAddForm);
    }
  }

  addImportPoint(importPointAddForm){
    let methodName = "addImportPoint";
    this.submitButtonClicked = true;
    this.importService.add33KVImportPoint(this.formData, false).subscribe(
      successResponse =>{
        this.submitButtonClicked = false;
        console.log(successResponse);
        if(successResponse){
          let alertResponse =this.globalResources.successAlert("33KV Import Added Successfully !");
          alertResponse.then(result =>{
            this.setPartialData();
            this.globalResources.resetValidateForm(importPointAddForm);
          });
        }
      },errorResponse =>{
        this.submitButtonClicked = false;
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
      }
    );
  }

  resetClicked(importPointAddForm){
    this.setPartialData();
    this.globalResources.resetValidateForm(importPointAddForm);
  }

  clearPartialData(){
    this.setPartialData();
  }
}
