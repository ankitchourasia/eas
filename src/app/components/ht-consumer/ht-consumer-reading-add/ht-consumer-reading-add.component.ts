import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '@eas-utility/global.constants';
import { HtConsumerService } from '@eas-services/ht-consumer-service/ht-consumer.service';
import { GlobalResources } from '@eas-utility/global.resources';

@Component({
  selector: 'eas-ht-consumer-reading-add',
  templateUrl: './ht-consumer-reading-add.component.html',
  styleUrls: ['./ht-consumer-reading-add.component.css']
})
export class HtConsumerReadingAddComponent implements OnInit {

  reading : any = {};
  consumer : any;
  month : string;
  year : string;
  loading : boolean;
  constructor(public globalConstants : GlobalConstants, private htConsumerService : HtConsumerService, private globalResources : GlobalResources) { }

  ngOnInit() {
  }

  searchButtonClicked(){
    this.consumer = undefined;
    this.getConsumerDetails();
  }

  getConsumerDetails(){
    this.loading = true;
    this.htConsumerService.getHTConsumerByServiceNo(this.reading.serviceNumber, false).subscribe(success =>{
      this.loading = false;
      this.consumer = success;
      this.reading.consumerId = this.consumer.id;
    }, error =>{
      this.loading = false;
      console.log(error);
    });
  }

  submitClicked(){
    let billMonth = this.month + '-' + this.year;
    this.reading.billMonth = billMonth;
    this.reading.regionId = this.consumer.region.id;
    this.reading.circleId = this.consumer.circle.id;
    this.reading.divisionId = this.consumer.division.id;
    this.reading.substationId = this.consumer.substation.id;
    this.reading.zoneId = this.consumer.zone.id;
    this.reading.feederId = this.consumer.feeder.id;
    this.reading.consumerId = this.consumer.id;
    this.addReading();
  }

  addReading(){
    this.loading = true;
    this.htConsumerService.addHTConsumerReading(this.reading, true).subscribe(success =>{
      this.loading = false;
      let result = <any> success;
      if(result.status === 201){
        this.globalResources.successAlert("Reading Added successfully");
        this.consumer = undefined;
        this.reading = {};
      }
    }, error =>{
      this.loading = false;
      console.log(error);
      this.globalResources.errorAlert(error.error.errorMessage);
    });
  }

  resetClicked(){
    this.consumer = undefined;
  }

}
