import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { ZoneService } from '@eas-services/zone/zone.service';

@Component({
  selector: 'eas-feeder-33kv-add',
  templateUrl: './feeder-33kv-add.component.html',
  styleUrls: ['./feeder-33kv-add.component.css']
})
export class Feeder33KVAddComponent implements OnInit {
  COMPONENT_NAME = "Feeder33KVAddComponent";
  user : any;
  feeder:any;
  zoneList: any;
  _submitClicked : boolean;
  
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants, 
    private feederService : FeederService, private substationService: SubstationService,
    private zoneService: ZoneService) { 

  }

  ngOnInit() {
    this.feeder = {};
    this.user = this.globalResources.getUserDetails();
    this.getZoneListByDivisionId(this.user.division.id);
  }

  getZoneListByDivisionId(divisionId){
    this.zoneList = [];
    this.zoneService.getZonesByDivisionId(divisionId, false).subscribe(successResponse =>{
      this.zoneList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  zoneChanged(){
    console.log("zoneChanged");
  }
  
  submitClicked(feederAddForm){
    let methodName = "submitClicked";
    console.log(this.feeder);
    if(this.globalResources.validateForm(feederAddForm)){
      this._submitClicked = true;
      this.feederService.add33KVFeeder(this.feeder, false).subscribe(successResponese =>{
        this._submitClicked = false;
        let alertResponse = this.globalResources.successAlert("Feeder added successfully");
        alertResponse.then(result =>{
          this.feeder = {};
          this.globalResources.resetValidateForm(feederAddForm);
        });
      }, errorResponse =>{
        console.log(errorResponse);
        this._submitClicked = false;
        let alertResponse = this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
        alertResponse.then(result =>{
          
        });
      });
    }
  }

  resetClicked(){

  }

}
