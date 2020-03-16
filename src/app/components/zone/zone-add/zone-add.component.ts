import { Component, OnInit } from '@angular/core';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalResources } from '@eas-utility/global.resources';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { DivisionService } from '@eas-services/division-service/division.service';

@Component({
  selector: 'eas-zone-add',
  templateUrl: './zone-add.component.html',
  styleUrls: ['./zone-add.component.css']
})
export class ZoneAddComponent implements OnInit {

  COMPONENT_NAME: string = "ZoneAddComponent";
  formData: any;
  regionList: any;
  circleList: any;
  divisionList: any;
  _submitClicked: boolean;
  constructor(public globalResources: GlobalResources, private regionService: RegionService, 
    private circleService: CircleService, private divisionService: DivisionService, private zoneService: ZoneService) { }

  ngOnInit() {
    this.setInitialValue();
  }

  setInitialValue(){
    this.formData = {};
    this.formData.baselineLoss = {}
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    this.getRegionList();
  }

  getRegionList(){
    this.regionList = [];
    this.regionService.getRegions(false).subscribe(successResponse =>{
      this.regionList = successResponse;
      console.log(this.regionList);
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  regionChanged(region){
    this.formData.regionId = region.id;
    this.formData.circle = undefined;
    this.formData.circleId = undefined;
    this.formData.division = undefined;
    this.formData.divisionId = undefined;
    this.getCircleList();
  }

  getCircleList(){
    this.circleList = [];
    this.circleService.getCirclesByRegionId(this.formData.regionId, false).subscribe(successResponse =>{
      this.circleList = successResponse;
      console.log(this.circleList);
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  circleChanged(circle){
    this.formData.circleId = circle.id;
    this.formData.division = undefined;
    this.formData.divisionId = undefined;
    this.getDivisionList();
  }

  getDivisionList(){
    this.divisionList = [];
    this.divisionService.getDivisionsByCircleId(this.formData.circleId, false).subscribe(successRespose =>{
      this.divisionList = successRespose;
      console.log(successRespose);
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  divisionChanged(division){
    this.formData.divisionId = division.id;
  }

  submitClicked(zoneAddForm){
    let methodName = "submitClicked";
    if(!this.globalResources.validateForm(zoneAddForm)){
      return;
    }
    this._submitClicked = true;
    this.zoneService.addZone(this.formData, true).subscribe(successResponse =>{
      this._submitClicked = false;
      let alertResponse =this.globalResources.successAlert("Zone added successfully !!!");
      alertResponse.then(result =>{
        this.globalResources.resetValidateForm(zoneAddForm);
        this.setInitialValue();
      });
    },errorResponse=>{
      this._submitClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  resetClicked(zoneAddForm){
    this.globalResources.resetValidateForm(zoneAddForm);
    this.setInitialValue();
  }

}
