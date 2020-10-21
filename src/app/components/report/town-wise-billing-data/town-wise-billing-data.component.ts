import { Component, OnInit } from '@angular/core';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { ReportService } from '@eas-services/report-service/report.service';
import { GlobalResources } from '@eas-utility/global.resources';

@Component({
  selector: 'eas-town-wise-billing-data',
  templateUrl: './town-wise-billing-data.component.html',
  styleUrls: ['./town-wise-billing-data.component.css']
})
export class TownWiseBillingDataComponent implements OnInit {

  constructor(private circleService : CircleService, private globalResources : GlobalResources, private reportService : ReportService) { }

  ngOnInit(): void {
    this.user = this.globalResources.getUserDetails();
    console.log(this.user);
    this.getTownListByZoneId(this.user.zone.id);
  }

  town : any = {};
  user : any;
  billingData : any;
  getTownListByZoneId(zoneId){
    this.town = [];
    this.circleService.getTownByZoneId(zoneId, false).subscribe(successResponse =>{
      this.town = successResponse;
      console.log(this.town);
      this.getBillingDataByTownId(this.town.id);
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  getBillingDataByTownId(townId){
    this.reportService.getD1BillingDataByTownId(townId, false).subscribe(success =>{
      this.billingData = success;
      console.log(this.billingData);
    }, error =>{
      console.log(error);
    });
  }

}
