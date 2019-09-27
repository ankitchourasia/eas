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
    this._submitClicked = true;
    this.divisionService.addDivision(this.formData, true).subscribe(successResponse =>{
      this._submitClicked = false;
      let alertResponse =this.globalResources.successAlert("Division add successfully !!!");
      alertResponse.then(result =>{
        this.globalResources.resetValidateForm(divisionAddForm);
        this.setPartialData();
      });
    },errorResponse=>{
      this._submitClicked = false;
      console.log(errorResponse);
      if(errorResponse.status == 417){
        this.globalResources.errorAlert(errorResponse.error.errorMessage);
      }else{
        this.globalResources.errorAlert("Some error accourd. Please try again...");
      }
    });
  }

  resetClicked(divisionAddForm){
    this.globalResources.resetValidateForm(divisionAddForm);
    this.setPartialData();
  }

}
