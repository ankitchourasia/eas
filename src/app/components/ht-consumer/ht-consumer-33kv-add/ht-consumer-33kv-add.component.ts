import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { SubstationService } from '@eas-services/substation/substation.service';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { HtConsumerService } from '@eas-services/ht-consumer-service/ht-consumer.service';
import { ZoneService } from '@eas-services/zone/zone.service';

@Component({
  selector: 'eas-ht-consumer-33kv-add',
  templateUrl: './ht-consumer-33kv-add.component.html',
  styleUrls: ['./ht-consumer-33kv-add.component.css']
})
export class HtConsumer33KVAddComponent implements OnInit {

  COMPONENT_NAME = "HtConsumer33KVAddComponent";
  user : any = {};
  htConsumer : any = {};
  feederList : any = [];
  zoneList: any = [];
  loading : boolean;
  constructor(private globalResources : GlobalResources,private feederService : FeederService, 
    private htConsumerService : HtConsumerService, private zoneService: ZoneService) { }

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

  zoneChanged(zone){
    console.log("zone changed");
    this.htConsumer.feeder = undefined;
    this.htConsumer.feeder33KVId = undefined;
    this.get33KVFeederByZoneId(zone.id);
  }

  get33KVFeederByZoneId(zoneId){
    this.feederList = [];
    this.feederService.get33KVFeederByZoneId(zoneId, false).subscribe(success =>{
      this.feederList = success;
    }, error =>{
      console.log(error);
    });
  }

  submitClicked(htConsumerAddForm){
    this.htConsumer.regionId = this.user.region.id;
    this.htConsumer.circleId = this.user.circle.id;
    this.htConsumer.divisionId = this.user.division.id;
    this.htConsumer.zoneId = this.htConsumer.zone.id;
    this.htConsumer.feeder33KVId = this.htConsumer.feeder.id;
    this.add33KVHTConsumer(htConsumerAddForm);
  }

  add33KVHTConsumer(htConsumerAddForm){
    let methodName = "add33KVHTConsumer";
    this.loading = true;
    console.log(this.htConsumer);
    this.htConsumerService.add33KVHTConsumer(this.htConsumer, true).subscribe(success =>{
      let result = <any> success;
      console.log(result);
      this.loading = false;
      if(result.status === 201){
        this.globalResources.successAlert("Consumer Added Successfully");
        this.htConsumer = {};
        this.globalResources.resetValidateForm(htConsumerAddForm);
      }
    }, error =>{
      this.loading = false;
      this.globalResources.handleError(error, this.COMPONENT_NAME, methodName);
    });
  }

}
