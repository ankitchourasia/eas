import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '@eas-utility/global.constants';
import { HtConsumerService } from '@eas-services/ht-consumer-service/ht-consumer.service';
import { GlobalResources } from '@eas-utility/global.resources';
import { ZoneService } from '@eas-services/zone/zone.service';

@Component({
  selector: 'eas-ht-consumer-33kv-reading-add',
  templateUrl: './ht-consumer-33kv-reading-add.component.html',
  styleUrls: ['./ht-consumer-33kv-reading-add.component.css']
})
export class HtConsumer33KVReadingAddComponent implements OnInit {

  COMPONENT_NAME: string = "HtConsumer33KVReadingAddComponent";
  user: any;
  formData : any;
  zoneList: any;
  consumerList: any;
  loading : boolean;
  _submitClicked: boolean;
  constructor(public globalConstants : GlobalConstants, private htConsumerService : HtConsumerService,
     private globalResources : GlobalResources, private zoneService: ZoneService) { }

  ngOnInit() {
    this.setInitialData();
    this.user = this.globalResources.getUserDetails();
    if(this.user && this.user.division){
      this.getZoneListByDivisionId(this.user.division.id);
    }
  }

  setInitialData(){
    this.formData = {};
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
    this.getHTConsumerListByZoneId(zone.id);
  }

  getHTConsumerListByZoneId(zoneId){
    this.consumerList = [];
    this.htConsumerService.getHTConsumer33KVListByZoneId(zoneId, false).subscribe(success =>{
      console.log(success);
      this.consumerList = success;
    }, error =>{
      console.log(error);
    });
  }

  submitClicked(readAddForm){
    if(this.globalResources.validateForm(readAddForm)){
      this.formData.billMonth = this.formData.month + '-' + this.formData.year;
      this.formData.zoneId = this.formData.consumer.zoneId;
      this.formData.htConsumer33KVId = this.formData.consumer.id;
      this.formData.feeder33KVId = this.formData.consumer.feeder33KVId;
      this.add33KVHTConsumerReading(readAddForm);
    }
  }

  add33KVHTConsumerReading(readAddForm){
    let methodName = "add33KVHTConsumerReading";
    this._submitClicked = true;
    console.log(this.formData);
    this.htConsumerService.add33KVHTConsumerReading(this.formData, true).subscribe(success =>{
      this._submitClicked = false;
      let result = <any> success;
      if(result.status === 201){
        let alertResposne = this.globalResources.successAlert("Data added successfully");
        alertResposne.then(result=>{
          this.setInitialData();
          this.globalResources.resetValidateForm(readAddForm);
        });
      }
    }, errorResponse =>{
      this._submitClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  resetClicked(readAddForm){
    this.setInitialData();
    this.globalResources.resetValidateForm(readAddForm);
  }

}