import { Component, OnInit } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { GlobalConstants } from 'app/utility/global.constants';

@Component({
  selector: 'eas-dtr-add',
  templateUrl: './dtr-add.component.html',
  styleUrls: ['./dtr-add.component.css']
})
export class DtrAddComponent implements OnInit {

  user : any;
  dtr:any;
  substationList: any;
  submitButtonClicked : boolean;

  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private feederService : FeederService,private substationService: SubstationService) { }

  ngOnInit() {
    this.dtr = {};
    this.substationList = null;
    this.user = this.globalResources.getUserDetails();
  }
  zoneChanged(){
    console.log("zoneChanged");
    this.substationList = null;
    this.dtr.substationId = undefined;
    this.getSubstationByZoneId(this.dtr.zoneId);
  }

  getSubstationByZoneId(zoneId){
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(succcess =>{
      this.substationList = succcess;
    }, error =>{
      console.log(error);
    });
  }

  substationChanged(){

  }
  
  submitClicked(feederAddForm){
    this.submitButtonClicked = true;
    if(this.globalResources.validateForm(feederAddForm)){
      this.feederService.addFeeder(this.dtr).subscribe(success =>{
        this.submitButtonClicked = false;
        let alertResponse = this.globalResources.successAlert("Feeder added successfully");
        alertResponse.then(result =>{
          this.dtr = {};
          this.globalResources.resetValidateForm(feederAddForm);
        });
      }, error =>{
        this.submitButtonClicked = false;
        console.log(error);
      })
    } else{
      this.submitButtonClicked = false;
    }
  }

}
