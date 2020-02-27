import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { DivisionService } from '@eas-services/division-service/division.service';

@Component({
  selector: 'eas-division-add',
  templateUrl: './division-add.component.html',
  styleUrls: ['./division-add.component.css']
})
export class DivisionAddComponent implements OnInit {

  COMPONENT_NAME: string = "DivisionAddComponent";
  formData: any;
  regionList: any;
  circleList: any;
  _submitClicked: boolean;
  constructor(public globalResources: GlobalResources, private regionService: RegionService, 
    private circleService: CircleService, private divisionService: DivisionService) { }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.formData = {};
    this.regionList = null;
    this.circleList = null;
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
  }

  submitClicked(divisionAddForm){
    let methodName = "submitClicked"
    if(!this.globalResources.validateForm(divisionAddForm)){
      return;
    }
    this._submitClicked = true;
    this.divisionService.addDivision(this.formData, true).subscribe(successResponse =>{
      this._submitClicked = false;
      let alertResponse =this.globalResources.successAlert("Division added successfully");
      alertResponse.then(result =>{
        this.globalResources.resetValidateForm(divisionAddForm);
        this.setPartialData();
      });
    },errorResponse=>{
      this._submitClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  resetClicked(divisionAddForm){
    this.globalResources.resetValidateForm(divisionAddForm);
    this.setPartialData();
  }

}
