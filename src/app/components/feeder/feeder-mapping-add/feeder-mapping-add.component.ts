import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { SubstationService } from '@eas-services/substation/substation.service';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { DivisionService } from '@eas-services/division-service/division.service';
import { ZoneService } from '@eas-services/zone/zone.service';

@Component({
  selector: 'eas-feeder-mapping-add',
  templateUrl: './feeder-mapping-add.component.html',
  styleUrls: ['./feeder-mapping-add.component.css']
})
export class FeederMappingAddComponent implements OnInit {

  user : any = {};
  substations : any = [];
  feeders : any = [];
  zoneList: any = [];
  feederMapping : any = {};
  originalDivisions : any = [];
  originalFeeders : any = [];
  _submitClicked: boolean;
  constructor(private globalResources : GlobalResources, private substationService : SubstationService, 
    private feederService : FeederService, public globalConstants : GlobalConstants, 
    private divisionService : DivisionService, private zoneService: ZoneService) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
    if(this.user && this.user.division){
      this.getZoneListByDivisionId(this.user.division.id);
    }
  }
  
  getZoneListByDivisionId(divisionId){
    this.zoneList = [];
    this.zoneService.getZonesByDivisionId(divisionId, false).subscribe(successResponse =>{
      this.zoneList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  zoneChanged(zoneId){
    this.feederMapping.substationId = undefined;
    this.feederMapping.feeder = undefined;
    this.getSubstationByZoneId(zoneId);
  }

  getSubstationByZoneId(zoneId){
    this.substations = [];
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
    this.feeders = [];
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
    this.originalDivisions = [];
    this.divisionService.getDivisionsByCircleId(circleId, false).subscribe(successResponse =>{
      this.originalDivisions = successResponse;
    }, errorResponse =>{
      console.log(errorResponse);
    });
  }

  originalDivisionChanged(originalDivisionId){
    this.originalFeeders = [];
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
