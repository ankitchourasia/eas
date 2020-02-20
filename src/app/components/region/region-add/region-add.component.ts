import { Component, OnInit } from '@angular/core';
import { RegionService } from '@eas-services/region-service/region.service';
import { GlobalResources } from '@eas-utility/global.resources';

@Component({
  selector: 'eas-region-add',
  templateUrl: './region-add.component.html',
  styleUrls: ['./region-add.component.css']
})
export class RegionAddComponent implements OnInit {

  COMPONENT_NAME: string = "RegionAddComponent";
  formData: any;
  _submitClicked: boolean;
  constructor(private regionService: RegionService, public globalResources: GlobalResources) { }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.formData = {};
  }

  submitClicked(regionAddForm){
    let methodName = "submitClicked";
    if(!this.globalResources.validateForm(regionAddForm)){
      return;
    }
    this._submitClicked = true;
    this.regionService.addRegion(this.formData, true).subscribe(successResponse =>{
      this._submitClicked = false;
      this.globalResources.successAlert("Region added successfully !!!");
      this.globalResources.resetValidateForm(regionAddForm);
      this.setPartialData();
      },errorResponse=>{
        this._submitClicked = false;
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
      }
    );
  }

  
  resetClicked(regionAddForm){
    this.globalResources.resetValidateForm(regionAddForm);
    this.setPartialData();
  }

}
