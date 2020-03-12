import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { HtConsumerService } from '@eas-services/ht-consumer-service/ht-consumer.service';

@Component({
  selector: 'eas-ht-consumer-33kv-view',
  templateUrl: './ht-consumer-33kv-view.component.html',
  styleUrls: ['./ht-consumer-33kv-view.component.css']
})
export class HtConsumer33KVViewComponent implements OnInit {

  COMPONENT_NAME: "HtConsumer33KVViewComponent";
  user : any;
  zone: any;
  zoneList: any;
  htConsumerList: any;
  pager: any;
  pageSize: number;
  pagedHTConsumerList : any;
  loading : boolean;
  
  constructor(private htConsumerService: HtConsumerService, private globalResources : GlobalResources, 
    private paginationService : PaginationService, private zoneService: ZoneService, 
    public globalConstants: GlobalConstants) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
      this.getZoneListByDivisionId(this.user.division.id);
    }else if(this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
      this.zone = this.user.zone;
      this.zoneList.push(this.user.zone);
      this.getHTConsumerByZoneId(this.user.zone.id);
    }
  }

  zoneChanged(){
    this.pagedHTConsumerList = [];
    if(this.zone === "ALL"){
      this.getHTConsumerByDivisionId(this.user.division.id);
    }else{
      this.getHTConsumerByZoneId(this.zone.id);
    }
  }
    
  getZoneListByDivisionId(divisionId){
    this.zoneList = [];
    this.zoneService.getZonesByDivisionId(divisionId, false).subscribe(successResponse =>{
      this.zoneList = <any>successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  getHTConsumerByDivisionId(divisionId){
    let methodName = "getHTConsumerByDivisionId";
    this.htConsumerList = [];
    if(this.user && this.user.division){
      this.loading = true;
      this.htConsumerService.getHTConsumer33KVListByDivisionId(divisionId, false).subscribe(successResponese =>{
        this.loading = false;
        this.htConsumerList = successResponese;
        this.initializePaginationVariables();
        if(this.htConsumerList && this.htConsumerList.length){
          this.setPage(1);
        }
      }, errorResponse =>{
        this.loading = false;
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
      });
    }
  }

  getHTConsumerByZoneId(zoneId){
    let methodName = "getHTConsumerByZoneId";
    this.htConsumerList = [];
    if(this.user && this.user.division){
      this.loading = true;
      this.htConsumerService.getHTConsumer33KVListByZoneId(zoneId, false).subscribe(successResponese =>{
        this.loading = false;
        this.htConsumerList = successResponese;
        this.initializePaginationVariables();
        if(this.htConsumerList && this.htConsumerList.length){
          this.setPage(1);
        }
      }, errorResponse =>{
        this.loading = false;
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
      });
    }
  }
  
  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 10;
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.htConsumerList.length, page, this.pageSize);
    this.pagedHTConsumerList = this.htConsumerList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
