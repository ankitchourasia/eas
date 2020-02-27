import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { SubstationService } from '@eas-services/substation/substation.service';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { HtConsumerService } from '@eas-services/ht-consumer-service/ht-consumer.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-ht-consumer-add',
  templateUrl: './ht-consumer-add.component.html',
  styleUrls: ['./ht-consumer-add.component.css']
})
export class HtConsumerAddComponent implements OnInit {

  COMPONENT_NAME: string = "HtConsumerAddComponent";
  user : any = {};
  htConsumer : any = {};
  regionList: any;
  circleList: any;
  divisionList: any;
  zoneList: any;
  substations : any;
  feeders : any;
  loading : boolean;
  constructor(private globalResources : GlobalResources, private substationService : SubstationService,
    private feederService : FeederService, private htConsumerService : HtConsumerService,
    private zoneService: ZoneService) { }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.htConsumer = {};
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    this.zoneList = [];
    this.substations = [];
    this.feeders = [];
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      this.getZoneListByDivisionId(this.user.division.id);
      this.htConsumer.region = this.user.region;
      this.htConsumer.circle = this.user.circle;
      this.htConsumer.division = this.user.division;
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
    this.htConsumer.substationId = undefined;
    this.getSubstationByZoneId(zoneId);
  }

  getSubstationByZoneId(zoneId){
    this.substations = [];
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(success =>{
      this.substations = success;
    }, error =>{
      console.log(error);
    })
  }

  substationChanged(substationId){
    this.htConsumer.feederId = undefined;
    this.getFeedersBySubstationId(substationId);
  }

  getFeedersBySubstationId(substationId){
    this.feeders = [];
    this.feederService.getFeederBySubstationId(substationId).subscribe(success =>{
      this.feeders = success;
    }, error =>{
      console.log(error);
    });
  }

  submitClicked(htConsumerAddForm){
    this.htConsumer.regionId = this.user.region.id;
    this.htConsumer.circleId = this.user.circle.id;
    this.htConsumer.divisionId = this.user.division.id;
    this.addHTConsumer(htConsumerAddForm);
  }

  addHTConsumer(htConsumerAddForm){
    let methodName = "addHTConsumer";
    this.loading = true;
    console.log(this.htConsumer);
    this.htConsumerService.addHTConsumer(this.htConsumer, true).subscribe(success =>{
      this.loading = false;
      let result = <any> success;
      if(result.status === 201){
        let alertResponse =this.globalResources.successAlert("Consumer added successfully");
        alertResponse.then(result =>{
          this.setPartialData();
          this.globalResources.resetValidateForm(htConsumerAddForm);
        });
      }else{
        this.globalResources.handleError(success, this.COMPONENT_NAME, methodName);
      }
    }, errorResponse =>{
      this.loading = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  resetClicked(htConsumerAddForm){
    this.setPartialData();
    this.globalResources.resetValidateForm(htConsumerAddForm);
  }

}
