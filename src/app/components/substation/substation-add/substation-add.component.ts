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

  substation : any = {};
  user : any;
  submitButtonClicked : boolean;
  constructor(public globalResources: GlobalResources, private globalConstants : GlobalConstants,
    private zoneService : ZoneService, private substationService : SubstationService) { 

  }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
  }

  submitClicked(substationAddForm){
    this.submitButtonClicked = true;
    if(this.globalResources.validateForm(substationAddForm)){
      this.substationService.addSubstation(this.substation).subscribe(success =>{
        this.submitButtonClicked = false;
        let alertResponse = this.globalResources.successAlert("Substation added successfully");
        alertResponse.then(result =>{
          this.substation = {};
          this.globalResources.resetValidateForm(substationAddForm);
        });
      }, error =>{
        this.submitButtonClicked = false;
        console.log(error);
      })
    }
  }

  // getZones(){
  //   this.zoneService.getZonesFromDivisionId(this.user.division.id).subscribe(success =>{
  //     this.zoneList = success;
  //   }, error =>{
  //     console.log(error);
  //   })
  // }

}
