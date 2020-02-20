import { Component, OnInit } from '@angular/core';
import { RegionService } from '@eas-services/region-service/region.service';
import { GlobalResources } from '@eas-utility/global.resources';
import { CircleService } from '@eas-services/circle-service/circle.service';

@Component({
  selector: 'eas-circle-add',
  templateUrl: './circle-add.component.html',
  styleUrls: ['./circle-add.component.css']
})
export class CircleAddComponent implements OnInit {
  
  COMPONENT_NAME: string = "CircleAddComponent";
  formData: any;
  regionList: any;
  _submitClicked: boolean;
  constructor(public globalResources: GlobalResources, private regionService: RegionService, 
    private circleService: CircleService) { }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.formData = {};
    this.regionList = null;
    this.getRegionList();
  }

  getRegionList(){
    this.regionList = null;
    this.regionService.getRegions(false).subscribe(
      successResponse =>{
        this.regionList = successResponse;
      },errorResponse =>{
        console.log(errorResponse);
      }
    );
  }

  regionChanged(region){
    this.formData.regionId = region.id;
  }

  submitClicked(circleAddForm){
    let methodName = "submitClicked"
    if(!this.globalResources.validateForm(circleAddForm)){
      return;
    }
    this._submitClicked = true;
    console.log(this.formData);
    this.circleService.addCircle(this.formData, true).subscribe(successResponse =>{
      this._submitClicked = false;
      let alertResponse =this.globalResources.successAlert("Circle added successfully !!!");
      alertResponse.then(result =>{
        this.globalResources.resetValidateForm(circleAddForm);
        this.setPartialData();
      });
    },errorResponse=>{
      this._submitClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  resetClicked(circleAddForm){
    this.globalResources.resetValidateForm(circleAddForm);
    this.setPartialData();
  }

}
