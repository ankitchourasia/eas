import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { GlobalConstants } from '@eas-utility/global.constants';

@Component({
  selector: 'eas-feeder-add',
  templateUrl: './feeder-add.component.html',
  styleUrls: ['./feeder-add.component.css']
})
export class FeederAddComponent implements OnInit {

  user : any;
  feeder:any;
  substationList: any;
  _submitClicked : boolean;
  
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants, 
    private feederService : FeederService, private substationService: SubstationService) { 

  }

  ngOnInit() {
    this.feeder = {};
    this.substationList = null;
    this.user = this.globalResources.getUserDetails();
  }

  zoneChanged(){
    console.log("zoneChanged");
    this.substationList = null;
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
    if(this.globalResources.validateForm(feederAddForm)){
      this._submitClicked = true;
      this.feederService.addFeeder(this.feeder).subscribe(successResponese =>{
        this._submitClicked = false;
        let alertResponse = this.globalResources.successAlert("Feeder added successfully");
        alertResponse.then(result =>{
          this.feeder = {};
          this.globalResources.resetValidateForm(feederAddForm);
        });
      }, errorResponse =>{
        console.log(errorResponse);
        this._submitClicked = false;
        let alertResponse = this.globalResources.errorAlert(errorResponse.error.errorMessage);
        alertResponse.then(result =>{
          console.log("alert result", result);
        });
      });
    }
  }

  resetClicked(){

  }

}
