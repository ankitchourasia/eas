import { Component, OnInit } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { GlobalConstants } from 'app/utility/global.constants';

@Component({
  selector: 'eas-feeder-add',
  templateUrl: './feeder-add.component.html',
  styleUrls: ['./feeder-add.component.css']
})
export class FeederAddComponent implements OnInit {

  user : any;
  feeder:any;
  substationList: any;
  submitButtonClicked : boolean;
  
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
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(successResponese =>{
      this.substationList = successResponese;
    }, error =>{
      console.log(error);
    });
  }
  
  submitClicked(feederAddForm){
    if(this.globalResources.validateForm(feederAddForm)){
      this.submitButtonClicked = true;
      this.feederService.addFeeder(this.feeder).subscribe(successResponese =>{
        this.submitButtonClicked = false;
        let alertResponse = this.globalResources.successAlert("Feeder added successfully");
        alertResponse.then(result =>{
          this.feeder = {};
          this.globalResources.resetValidateForm(feederAddForm);
        });
      }, errorResponse =>{
        console.log(errorResponse);
        this.submitButtonClicked = false;
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
