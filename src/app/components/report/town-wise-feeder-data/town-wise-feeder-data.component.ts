import { Component, OnInit } from '@angular/core';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { ReportService } from '@eas-services/report-service/report.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalResources } from '@eas-utility/global.resources';

@Component({
  selector: 'eas-town-wise-feeder-data',
  templateUrl: './town-wise-feeder-data.component.html',
  styleUrls: ['./town-wise-feeder-data.component.css']
})
export class TownWiseFeederDataComponent implements OnInit {

  constructor(private circleService : CircleService, private globalResources : GlobalResources, private reportService : ReportService, public globalConstants : GlobalConstants) { }

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
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  loading : boolean;
  getBillingDataByTownId(townId, billMonth){
    this.billingData = undefined;
    this.loading = true;
    this.reportService.getFeederWiseBillingDataByTownId(townId, billMonth, false).subscribe(success =>{
      this.loading = false;
      this.billingData = success;
      console.log(this.billingData);
    }, error =>{
      this.loading = false;
      console.log(error);
    });
  }

  searchClicked(){
    this.billMonthChanged();
    this.getBillingDataByTownId(this.town.id, this.billMonth);
  }

  selectedMonth : any;
  selectedYear : any;
  billMonth : any;
  billMonthChanged(){
    if(this.selectedMonth && this.selectedYear){
      this.billMonth = this.selectedMonth + "-" + this.selectedYear;
    }
  }

}
