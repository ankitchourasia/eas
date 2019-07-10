import { Component, OnInit } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';
import { SubstationService } from '@eas-services/substation/substation.service';

@Component({
  selector: 'eas-feeder-reading-add',
  templateUrl: './feeder-reading-add.component.html',
  styleUrls: ['./feeder-reading-add.component.css']
})
export class FeederReadingAddComponent implements OnInit {

  user : any = {};
  feederReading = {};
  substations : any = [];
  constructor(private globalResources : GlobalResources, private substationService : SubstationService) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
  }

  zoneChanged(zoneId){
    this.getSubstationByZoneId(zoneId);
  }

  getSubstationByZoneId(zoneId){
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(success =>{
      console.log(success);
      this.substations = success;
    }, error =>{
      console.log(error);
    })
  }

  substationChanged(substationId){
    this.getFeedersBySubstationId(substationId);
  }

  getFeedersBySubstationId(substationId){

  }
}
