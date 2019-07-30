import { Component, OnInit } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';
import { GlobalConstants } from 'app/utility/global.constants';
import { ZoneService } from '@eas-services/zone/zone.service';
import { SubstationService } from '@eas-services/substation/substation.service';

@Component({
  selector: 'eas-substation-add',
  templateUrl: './substation-add.component.html',
  styleUrls: ['./substation-add.component.css']
})
export class SubstationAddComponent implements OnInit {

  substation : any;
  user : any;
  zoneList: any;
  submitButtonClicked : boolean;
  constructor(public globalResources: GlobalResources, private globalConstants : GlobalConstants,
    private zoneService : ZoneService, private substationService : SubstationService) { 

  }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.substation = {};
    this.zoneList = [];
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === this.globalConstants.ROLE_ADMIN){
      this.zoneList = this.user.zoneList;
    }else if(this.user.role === this.globalConstants.ROLE_FIELD_ADMIN){
      this.zoneList.push(this.user.zone);
      this.substation.zone = this.user.zone;
      this.substation.zoneId = this.substation.zone.id;
    }
  }

  zoneChanged(){
    this.substation.zoneId = this.substation.zone.id;
  }

  submitClicked(substationAddForm){
    this.submitButtonClicked = true;
    if(this.globalResources.validateForm(substationAddForm)){
      this.substationService.addSubstation(this.substation).subscribe(success =>{
        this.submitButtonClicked = false;
        let alertResponse = this.globalResources.successAlert("Substation added successfully");
        alertResponse.then(result =>{
          this.setPartialData();
          this.globalResources.resetValidateForm(substationAddForm);
        });
      }, error =>{
        this.submitButtonClicked = false;
        console.log(error);
      })
    }
  }

  resetClicked(substationAddForm){
    this.setPartialData();
    this.globalResources.resetValidateForm(substationAddForm);
  }

  // getZones(){
  //   this.zoneService.getZonesFromDivisionId(this.user.division.id).subscribe(success =>{
  //     this.zoneList = success;
  //   }, error =>{
  //     console.log(error);
  //   })
  // }

}
