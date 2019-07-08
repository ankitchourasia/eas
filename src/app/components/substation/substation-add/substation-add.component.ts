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

  formData = {};
  substation : any = {};
  zoneList : any = [];
  user : any;
  constructor(public globalResources: GlobalResources, private globalConstants : GlobalConstants, private zoneService : ZoneService,
    private substationService : SubstationService) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === this.globalConstants.ROLE_ADMIN){
      this.getZones();
    }
  }

  submitClicked(feederAddForm){
    if(this.globalResources.validateForm(feederAddForm)){
      this.substationService.addSubstation(this.substation).subscribe(success =>{
        console.log(success);
      }, error =>{
        console.log(error);
      })
    }
  }

  getZones(){
    this.zoneService.getZonesFromDivisionId(this.user.division.id).subscribe(success =>{
      this.zoneList = success;
    }, error =>{
      console.log(error);
    })
  }

}
