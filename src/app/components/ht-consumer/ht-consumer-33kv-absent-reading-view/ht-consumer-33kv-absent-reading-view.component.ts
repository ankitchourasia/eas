import { Component, OnInit } from '@angular/core';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalResources } from '@eas-utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { HtConsumerService } from '@eas-services/ht-consumer-service/ht-consumer.service';

@Component({
  selector: 'eas-ht-consumer-33kv-absent-reading-view',
  templateUrl: './ht-consumer-33kv-absent-reading-view.component.html',
  styleUrls: ['./ht-consumer-33kv-absent-reading-view.component.css']
})
export class HtConsumer33KVAbsentReadingViewComponent implements OnInit {

  COMPONENT_NAME: "HtConsumer33KVAbsentReadingViewComponent";
  user: any = {};
  billMonth: string;
  htConsumerReadingList: any;
  pagedHTConsumerReadingList: any;
  month: string;
  year: string;
  loading: boolean;
  zone:any;
  zoneList: any;
  pager: any;
  pageSize: number;
  public readonly ROLE_ADMIN = GlobalConfiguration.ROLE_ADMIN;
  
  constructor(private htConsumerService: HtConsumerService, private zoneService: ZoneService,
    public globalConstants: GlobalConstants, private globalResources: GlobalResources, 
    private paginationService: PaginationService) { }

  ngOnInit() {
    this.setInitailValue();
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
      this.getZoneListByDivisionId(this.user.division.id);
    }else if(this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
      this.zoneList.push(this.user.zone);
    }
  }

  setInitailValue(){
    this.htConsumerReadingList = [];
    this.pagedHTConsumerReadingList = [];
  }

  getZoneListByDivisionId(divisionId){
    this.zoneList = [];
    this.zoneService.getZonesByDivisionId(divisionId, false).subscribe(successResponse =>{
      this.zoneList = <any>successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  zoneChanged(){
    this.setInitailValue();
  }

  billMonthChanged(){
    this.setInitailValue();
    if(this.month && this.year){
      this.billMonth = this.month + '-' + this.year;
    }
  }
    
  searchClicked(){
    this.pagedHTConsumerReadingList = [];
    if(this.zone === "ALL"){
      this.getHTConsumerAbsentReadsByDivisionIdAndBillMonth(this.user.division.id, this.billMonth);
    }else{
      this.getHTConsumerAbsentReadsByZoneIdAndBillMonth(this.zone.id, this.billMonth);
    }
  }
  
  getHTConsumerAbsentReadsByDivisionIdAndBillMonth(divisionId, billMonth){
    let methodName = "getHTConsumerAbsentReadsByDivisionIdAndBillMonth";
    this.loading =true;
    this.htConsumerReadingList = [];
    this.htConsumerService.get33KVHTConsumerAbsentReadsByDivisionIdAndbillMonth(divisionId, billMonth, false).subscribe(successResponse =>{
      this.loading = false;
      this.htConsumerReadingList = successResponse;
      this.initializePaginationVariables();
      if(this.htConsumerReadingList &&  this.htConsumerReadingList.length){
        this.setPage(1);
      }
    }, errorResponse =>{
      this.loading = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  
  getHTConsumerAbsentReadsByZoneIdAndBillMonth(zoneId, billMonth){
    let methodName = "getHTConsumerAbsentReadsByZoneIdAndBillMonth";
    this.loading = true;
    this.htConsumerReadingList = [];
    this.htConsumerService.get33KVHTConsumerAbsentReadsByZoneIdAndbillMonth(zoneId, billMonth, false).subscribe(successResponse =>{
      this.loading = false;
      this.htConsumerReadingList = successResponse;
      this.initializePaginationVariables();
      if(this.htConsumerReadingList &&  this.htConsumerReadingList.length){
        this.setPage(1);
      }
    }, errorResponse =>{
      this.loading = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    })
  }

  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 10;
  }

  setPage(page: number) {
    console.log("inside set page");
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.htConsumerReadingList.length, page, this.pageSize);
    this.pagedHTConsumerReadingList = this.htConsumerReadingList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
