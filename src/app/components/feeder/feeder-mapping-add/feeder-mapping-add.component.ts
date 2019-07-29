import { Component, OnInit } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';
import { SubstationService } from '@eas-services/substation/substation.service';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { GlobalConstants } from 'app/utility/global.constants';
import { DivisionService } from '@eas-services/division-service/division.service';

@Component({
  selector: 'eas-feeder-mapping-add',
  templateUrl: './feeder-mapping-add.component.html',
  styleUrls: ['./feeder-mapping-add.component.css']
})
export class FeederMappingAddComponent implements OnInit {

  user : any = {};
  substations : any = [];
  feeders : any = [];
  feederMapping : any = {};
  originalDivisions : any = [];
  originalFeeders : any = [];
  constructor(private globalResources : GlobalResources, private substationService : SubstationService, private feederService : FeederService,
    public globalConstants : GlobalConstants, private divisionService : DivisionService) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
  }

  zoneChanged(zoneId){
    this.feederMapping.substationId = undefined;
    this.feederMapping.feeder = undefined;
    this.getSubstationByZoneId(zoneId);
  }

  getSubstationByZoneId(zoneId){
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(success =>{
      this.substations = success;
    }, error =>{
      console.log(error);
    })
  }

  substationChanged(substationId){
    this.feederMapping.feeder = undefined;
    this.getFeedersBySubstationId(substationId);
  }

  getFeedersBySubstationId(substationId){
    this.feederService.getFeederBySubstationId(substationId).subscribe(success =>{
      this.feeders = success;
    }, error =>{
      console.log(error);
    });
  }

  feederChanged(feeder){
    if(feeder.type === this.globalConstants.FEEDER_TYPE_INTER_ZONE || feeder.type === this.globalConstants.FEEDER_TYPE_INTER_DIVISION){
      this.getDivisionsByCircleId(this.user.circle.id);
    }
  }

  getDivisionsByCircleId(circleId){
    this.divisionService.getDivisionsByCircleId(circleId, false).subscribe(success =>{
      this.originalDivisions = success;
    }, error=>{
      console.log(error);
    });
  }

  originalDivisionChanged(originalDivisionId){
    this.feederService.getFeederByDivisionId(originalDivisionId).subscribe(success =>{
      this.originalFeeders = success;
    }, error =>{
      console.log(error);
    });
  }

  submitButtonClicked(){
    this.feederMapping.feederId = this.feederMapping.feeder.id;
    this.feederMapping.originalFeederId = this.feederMapping.originalFeeder.id;
    this.feederMapping.originalFeederSubstationId = this.feederMapping.originalFeeder.substationId;
    console.log(this.feederMapping);
    this.addMapping();
  }

  addMapping(){
    this.feederService.addFeederMapping(this.feederMapping, true).subscribe(success =>{
      let result = <any> success;
      if(result.status === 201){
        this.globalResources.successAlert("Mapping inserted successfully");
        this.feederMapping = {};
      }
    }, error =>{
      console.log(error)
    });
  }

}
