import { Component, OnInit } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';
import { SubstationService } from '@eas-services/substation/substation.service';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { HtConsumerService } from '@eas-services/ht-consumer-service/ht-consumer.service';

@Component({
  selector: 'eas-ht-consumer-add',
  templateUrl: './ht-consumer-add.component.html',
  styleUrls: ['./ht-consumer-add.component.css']
})
export class HtConsumerAddComponent implements OnInit {

  user : any = {};
  htConsumer : any = {};
  substations : any = [];
  feeders : any = [];
  loading : boolean;
  constructor(private globalResources : GlobalResources, private substationService : SubstationService, private feederService : FeederService, private htConsumerService : HtConsumerService) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
  }

  zoneChanged(zoneId){
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
    this.getFeedersBySubstationId(substationId);
  }

  getFeedersBySubstationId(substationId){
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
    this.loading = true;
    console.log(this.htConsumer);
    this.htConsumerService.addHTConsumer(this.htConsumer, true).subscribe(success =>{
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
      this.globalResources.errorAlert(error.error.errorMessage);
    });
  }

}
