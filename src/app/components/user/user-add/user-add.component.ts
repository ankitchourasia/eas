import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { DivisionService } from '@eas-services/division-service/division.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { UserService } from '@eas-services/user/zone.service';

@Component({
  selector: 'eas-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  COMPONENT_NAME: string = "UserAddComponent";
  formData: any;
  regionList: any;
  circleList: any;
  divisionList: any;
  zoneList: any;
  _submitClicked: boolean;
  roleList: any = [{id:1, name:"ADMIN", value:"ADMIN"},{id:2, name:"FIELD ADMIN", value:"FIELD_ADMIN"},{id:3, name:"SUERADMIN", value:"SUPER_ADMIN"}]
  constructor(public globalResources: GlobalResources, private regionService: RegionService, 
    private circleService: CircleService, private divisionService: DivisionService, 
    private zoneService: ZoneService, private userService: UserService) { }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.formData = {};
    this.regionList = null;
    this.circleList = null;
    this.divisionList = null;
    this.zoneList = null;
    this.getRegionList();
  }

  getRegionList(){
    this.regionList = null;
    this.regionService.getRegions(false).subscribe(successResponse =>{
      this.regionList = successResponse;
      console.log(this.regionList);
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  regionChanged(region){
    this.formData.circle = undefined;
    this.formData.division = undefined;
    this.formData.zone = undefined;
    this.getCircleList(region.id);
  }

  getCircleList(regionId){
    this.circleList = null;
    this.circleService.getCirclesByRegionId(regionId, false).subscribe(successResponse =>{
      this.circleList = successResponse;
      console.log(this.circleList);
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  circleChanged(circle){
    this.formData.division = undefined;
    this.formData.zone = undefined;
    this.getDivisionList(circle.id);
  }

  getDivisionList(circleId){
    this.divisionList = null;
    this.divisionService.getDivisionsByCircleId(circleId, false).subscribe(successRespose =>{
      this.divisionList = successRespose;
      console.log(successRespose);
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  divisionChanged(division){
    this.formData.zone = undefined;
    this.getZoneList(division.id);
  }

  getZoneList(divisionId){
    this.zoneList = null;
    this.zoneService.getZonesByDivisionId(divisionId, false).subscribe(successRespose =>{
      this.zoneList = successRespose;
      console.log(successRespose);
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  zoneChanged(zone){
    console.log(zone);
  }

  submitClicked(userAddForm){
    let methodName = "submitClicked";
    this._submitClicked = true;
    this.formData.regionId = this.formData.region.id;
    this.formData.circleId = this.formData.circle.id;
    this.formData.divisionId = this.formData.division.id;
    this.formData.zoneId = this.formData.zone.id;
    this.userService.addUser(this.formData, true).subscribe(successResponse =>{
      this._submitClicked = false;
      let alertResponse =this.globalResources.successAlert("User add successfully !!!");
      alertResponse.then(result =>{
        this.globalResources.resetValidateForm(userAddForm);
        this.setPartialData();
      });
    },errorResponse=>{
      this._submitClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  resetClicked(userAddForm){
    this.globalResources.resetValidateForm(userAddForm);
    this.setPartialData();
  }

}
