import { Component, OnInit } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { GlobalConstants } from 'app/utility/global.constants';
import { DtrService } from '@eas-services/dtr-service/dtr.service';

@Component({
  selector: 'eas-dtr-add',
  templateUrl: './dtr-add.component.html',
  styleUrls: ['./dtr-add.component.css']
})
export class DtrAddComponent implements OnInit {

  user : any;
  dtr:any;
  feederList: any;
  substationList: any;
  submitButtonClicked : boolean;

  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private dtrService : DtrService, private feederService : FeederService, private substationService: SubstationService) { }

  ngOnInit() {
    this.dtr = {};
    this.substationList = null;
    this.user = this.globalResources.getUserDetails();
  }
  zoneChanged(){
    this.substationList = null;
    this.dtr.feederId = undefined;
    this.dtr.substationId = undefined;
    this.getSubstationByZoneId(this.dtr.zoneId);
  }

  getSubstationByZoneId(zoneId){
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(successResponese =>{
      this.substationList = successResponese;
    }, error =>{
      console.log(error);
    });
  }

  substationChanged(){
    this.feederList = null;
    this.dtr.feederId = undefined;
    this.getFeederBySubstationId(this.dtr.substationId);  
  }

  getFeederBySubstationId(substationId){
    this.feederService.getFeederBySubstationId(substationId).subscribe(successResponese =>{
      this.feederList = successResponese;
    },error =>{
      console.log(error);
    });
  }

  srDateChanged(){
    this.dtr.srDate = this.globalResources.makeDateAsDD_MM_YYYY(this.dtr.dummySrDate);
    this.dtr.srDateInString = this.dtr.srDate;
  }
  
  submitClicked(dtrAddForm){
    console.log(this.dtr);
    if(this.globalResources.validateForm(dtrAddForm)){
      // this.addDTR(dtrAddForm);
    }
  }

  addDTR(dtrAddForm){
    console.log(this.dtr);
    this.submitButtonClicked = true;
    this.dtrService.addDTR(this.dtr).subscribe(successResponese =>{
      this.submitButtonClicked = false;
      let alertResponse = this.globalResources.successAlert("DTR added successfully");
      alertResponse.then(result =>{
        this.dtr = {};
        this.globalResources.resetValidateForm(dtrAddForm);
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
