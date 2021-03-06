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

  COMPONENT_NAME: string = "HtConsumerReadingAddComponent";
  formData : any;
  consumer : any;
  month : string;
  year : string;
  serviceNumber: any;
  loading : boolean;
  _submitClicked: boolean;
  constructor(public globalConstants : GlobalConstants, private htConsumerService : HtConsumerService,
     private globalResources : GlobalResources) { }

  ngOnInit() {
    this.setInitialData();
  }

  setInitialData(){
    this.formData = {};
    this.consumer = null;
  }

  searchInputChanged(){
    this.setInitialData();
  }

  searchButtonClicked(){
    this.setInitialData();
    this.getConsumerDetails();
  }

  getConsumerDetails(){
    this.loading = true;
    this.consumer = null;
    this.htConsumerService.getHTConsumerByServiceNo(this.serviceNumber, false).subscribe(success =>{
      this.loading = false;
      this.consumer = success;
      console.log(this.consumer);
      this.formData.consumerId = this.consumer.id;
    }, error =>{
      this.loading = false;
      console.log(error);
      this.globalResources.errorAlert("consumer not found");
    });
  }

  submitClicked(readAddForm){
    if(this.globalResources.validateForm(readAddForm)){
      this._submitClicked = true;
      let billMonth = this.month + '-' + this.year;
      this.formData.billMonth = billMonth;
      this.formData.regionId = this.consumer.region.id;
      this.formData.circleId = this.consumer.circle.id;
      this.formData.divisionId = this.consumer.division.id;
      this.formData.substationId = this.consumer.substation.id;
      this.formData.zoneId = this.consumer.zone.id;
      this.formData.feederId = this.consumer.feeder.id;
      this.formData.consumerId = this.consumer.id;
      this.formData.serviceNumber = this.serviceNumber;
      this._submitClicked = false;
      this.addReading(readAddForm);
    }
  }

  addReading(readAddForm){
    let methodName = "addReading";
    this._submitClicked = true;
    this.htConsumerService.addHTConsumerReading(this.formData, true).subscribe(success =>{
      this._submitClicked = false;
      let result = <any> success;
      if(result.status === 201){
        let alertResponse =this.globalResources.successAlert("Reading added successfully");
        alertResponse.then(result =>{
          this.setInitialData();
          this.globalResources.resetValidateForm(readAddForm);
        });
      }else{
        this.globalResources.handleError(success, this.COMPONENT_NAME, methodName);
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
