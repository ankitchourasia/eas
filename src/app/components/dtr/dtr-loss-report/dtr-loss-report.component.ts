import { Component, OnInit } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';
import { GlobalConstants } from 'app/utility/global.constants';
import { DtrService } from '@eas-services/dtr-service/dtr.service';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { DivisionService } from '@eas-services/division-service/division.service';
import { ZoneService } from '@eas-services/zone/zone.service';

@Component({
  selector: 'eas-dtr-loss-report',
  templateUrl: './dtr-loss-report.component.html',
  styleUrls: ['./dtr-loss-report.component.css']
})
export class DtrLossReportComponent implements OnInit {

  user : any;
  zoneList: any;
  regionList: any;
  circleList: any;
  divisionList: any;
  dtrList: any;
  feederList: any;
  substationList: any;
  userDetails: any;
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants, private dtrService : DtrService, 
    private feederService : FeederService, private substationService: SubstationService, private regionService: RegionService, 
    private circleService: CircleService, private divisionService: DivisionService, private zoneService: ZoneService) { }

  ngOnInit() {
    this.userDetails = {};
    this.substationList = null;
    this.user = this.globalResources.getUserDetails();
    this.checkUserRoll(this.user);
  }

  checkUserRoll(user){
    console.log(user);
    this.zoneList = [];
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    if(user.role === this.globalConstants.ROLE_SUPER_ADMIN){
      this.getRegionList();
    }else if(user.role === this.globalConstants.ROLE_ADMIN){
      this.zoneList = (user.zoneList);
      this.regionList.push(user.region);
      this.circleList.push(user.circle);
      this.divisionList.push(user.division);
      this.userDetails.region = user.region;
      this.userDetails.circle = user.circle;
      this.userDetails.division = user.division;
    }else if(user.role === this.globalConstants.ROLE_FIELD_ADMIN){
      this.zoneList.push(user.zone);
      this.regionList.push(user.region);
      this.circleList.push(user.circle);
      this.divisionList.push(user.division);
      this.userDetails.region = user.region;
      this.userDetails.circle = user.circle;
      this.userDetails.division = user.division;
      this.userDetails.zone = user.zone;
      this.getSubstationByZoneId(this.userDetails.zone.id);
    }
  }
  
  getRegionList(){
    this.regionService.getRegions(false).subscribe(successResponse =>{
      this.regionList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  regionChanged(region){
    if(this.user.role === this.globalConstants.ROLE_SUPER_ADMIN){
      this.circleList = null;
      this.userDetails.circle = undefined;
      this.divisionList = null;
      this.userDetails.division = undefined;
      this.zoneList = null;
      this.userDetails.zone = undefined;
      this.substationList = null;
      this.userDetails.substation = undefined;
      this.feederList = null;
      this.userDetails.feeder = undefined;
      this.dtrList = null;
      this.userDetails.dtr = undefined;
      this.getCircleListByRegionId(region.id);
    }
  }

  getCircleListByRegionId(regionId){
    this.circleService.getCirclesByRegionId(regionId, false).subscribe(successResponse =>{
      this.circleList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  circleChanged(circle){
    if(this.user.role === this.globalConstants.ROLE_SUPER_ADMIN){
      this.divisionList = null;
      this.userDetails.division = undefined;
      this.zoneList = null;
      this.userDetails.zone = undefined;
      this.substationList = null;
      this.userDetails.substation = undefined;
      this.feederList = null;
      this.userDetails.feeder = undefined;
      this.dtrList = null;
      this.userDetails.dtr = undefined;
      this.getDivisionListByCircleId(circle.id);
    }
  }

  getDivisionListByCircleId(circleId){
    this.divisionService.getDivisionsByCircleId(circleId, false).subscribe(successResponse =>{
      this.divisionList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  divisionChanged(division){
    if(this.user.role === this.globalConstants.ROLE_SUPER_ADMIN){
      this.zoneList = null;
      this.userDetails.zone = undefined;
      this.substationList = null;
      this.userDetails.substation = undefined;
      this.feederList = null;
      this.userDetails.feeder = undefined;
      this.dtrList = null;
      this.userDetails.dtr = undefined;
      this.getZoneListByDivisionId(division.id);
    }
  }

  getZoneListByDivisionId(divisionId){
    this.zoneList = this.user.zoneList;
    this.zoneService.getZonseByDivisionId(divisionId, false).subscribe(successResponse =>{
      this.zoneList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }
  
  zoneChanged(zone){
    this.substationList = null;
    this.userDetails.substation = undefined;
    this.feederList = null;
    this.userDetails.feeder = undefined;
    this.dtrList = null;
    this.userDetails.dtr = undefined;
    this.getSubstationByZoneId(zone.id);
  }

  getSubstationByZoneId(zoneId){
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(successResponese =>{
      this.substationList = successResponese;
    }, errorResponse =>{
      console.log(errorResponse);
    });
  }

  substationChanged(substation){
    this.feederList = null;
    this.userDetails.feeder = undefined;
    this.dtrList = null;
    this.userDetails.dtr = undefined;
    this.getFeederBySubstationId(substation.id);  
  }

  getFeederBySubstationId(substationId){
    this.feederService.getFeederBySubstationId(substationId).subscribe(successResponese =>{
      this.feederList = successResponese;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  feederChanged(feeder){
    this.dtrList = null;
    this.userDetails.dtr = undefined;
    this.getDTRByFeederId(feeder.id);
  }

  getDTRByFeederId(feederId){
    this.dtrService.getDTRByFeederId(feederId).subscribe(successResponse =>{
      console.log(successResponse);
      this.dtrList = successResponse;
    }, errorResponse =>{
      console.log(errorResponse)
    });
  }

}
