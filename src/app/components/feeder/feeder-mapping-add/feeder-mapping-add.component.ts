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
  _submitClicked: boolean;
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
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(successResponse =>{
      this.substations = successResponse;
    }, errorResponse =>{
      console.log(errorResponse);
    })
  }

  substationChanged(substationId){
    this.feederMapping.feeder = undefined;
    this.getFeedersBySubstationId(substationId);
  }

  getFeedersBySubstationId(substationId){
    this.feederService.getFeederBySubstationId(substationId).subscribe(successResponse =>{
      this.feeders = successResponse;
    }, errorResponse =>{
      console.log(errorResponse);
    });
  }

  feederChanged(feeder){
    if(feeder.type === this.globalConstants.FEEDER_TYPE_INTER_ZONE || feeder.type === this.globalConstants.FEEDER_TYPE_INTER_DIVISION){
      this.getDivisionsByCircleId(this.user.circle.id);
    }
  }

  getDivisionsByCircleId(circleId){
    this.divisionService.getDivisionsByCircleId(circleId, false).subscribe(successResponse =>{
      this.originalDivisions = successResponse;
    }, errorResponse =>{
      console.log(errorResponse);
    });
  }

  originalDivisionChanged(originalDivisionId){
    this.feederService.getFeederByDivisionId(originalDivisionId).subscribe(successResponse =>{
      this.originalFeeders = successResponse;
    }, errorResponse =>{
      console.log(errorResponse);
    });
  }

  submitClicked(){
    this._submitClicked = true;
    this.feederMapping.feederId = this.feederMapping.feeder.id;
    this.feederMapping.originalFeederId = this.feederMapping.originalFeeder.id;
    this.feederMapping.originalFeederSubstationId = this.feederMapping.originalFeeder.substationId;
    console.log(this.feederMapping);
    this._submitClicked = false;
    this.addMapping();
  }

  addMapping(){
    this._submitClicked = true;
    this.feederService.addFeederMapping(this.feederMapping, true).subscribe(successResponse =>{
      this._submitClicked = false;
      let result = <any> successResponse;
      if(result.status === 201){
        this.globalResources.successAlert("Mapping inserted successfully");
        this.feederMapping = {};
      }
    }, errorResponse =>{
      this._submitClicked = false;
      console.log(errorResponse)
    });
  }

}
