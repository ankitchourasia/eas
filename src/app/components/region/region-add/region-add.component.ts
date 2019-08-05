import { Component, OnInit } from '@angular/core';
import { RegionService } from '@eas-services/region-service/region.service';
import { GlobalResources } from 'app/utility/global.resources';

@Component({
  selector: 'eas-region-add',
  templateUrl: './region-add.component.html',
  styleUrls: ['./region-add.component.css']
})
export class RegionAddComponent implements OnInit {

  formData: any;
  _submitClicked: boolean;
  constructor(private regionService: RegionService, public globalResources: GlobalResources) { }

  ngOnInit() {
    this.formData = {};
  }

  submitClicked(){
    this._submitClicked = true;
    this.regionService.addRegion(this.formData, true).subscribe(
      successResponse =>{
        this.formData = {};
        this._submitClicked = false;
        console.log(successResponse);
        this.globalResources.successAlert("Region add successfully !!!");

      },errorResponse=>{
        this._submitClicked = false;
        console.log(errorResponse);
        if(errorResponse.status == 417){
          this.globalResources.errorAlert(errorResponse.error.errorMessage);
        }else{
          this.globalResources.errorAlert("Some error accourd. Please try again...");
        }
      }
    );
  }

}
