import { Component, OnInit } from '@angular/core';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { GlobalResources } from '@eas-utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-feeder-33kv-absent-read',
  templateUrl: './feeder-33kv-absent-read.component.html',
  styleUrls: ['./feeder-33kv-absent-read.component.css']
})
export class Feeder33KVAbsentReadComponent implements OnInit {

  COMPONENT_NAME: "Feeder33KVAbsentReadComponent";
  user : any;
  zone: any;
  billMonth : string;
  month: string;
  year: string;
  zoneList: any;
  feederList: any;
  pager: any;
  pageSize: number;
  pagedFeederList : any;
  loading : boolean;
  
  constructor(private feederService : FeederService, private globalResources : GlobalResources, 
    private paginationService : PaginationService, private zoneService: ZoneService, 
    public globalConstants: GlobalConstants) { }

  ngOnInit() {
    this.setInitialValue();
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
      this.getZoneListByDivisionId(this.user.division.id);
    }else if(this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
      this.zone = this.user.zone;
      this.zoneList.push(this.user.zone);
      this.getFeederByZoneId(this.user.zone.id);
    }
  }

  setInitialValue(){
    this.pagedFeederList = [];
    this.feederList = [];
  }

  zoneChanged(){
    this.setInitialValue();
  }

  searchClicked(){
    this.pagedFeederList = [];
    if(this.zone === "ALL"){
      this.getFeederByDivisionId(this.user.division.id);
    }else{
      this.getFeederByZoneId(this.zone.id);
    }
  }

  billMonthChanged(){
    this.setInitialValue();
    if(this.month && this.year){
      this.billMonth = this.month + '-' + this.year;
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

  getFeederByDivisionId(divisionId){
    let methodName = "getFeederByDivisionId";
    this.feederList = [];
    if(this.user && this.user.division){
      this.loading = true;
      this.feederService.getAbsent33KVFeederReadByDivisionId(divisionId, this.billMonth, false).subscribe(successResponese =>{
        this.loading = false;
        this.feederList = successResponese;
        this.initializePaginationVariables();
        if(this.feederList && this.feederList.length){
          this.setPage(1);
        }
      }, errorResponse =>{
        this.loading = false;
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
      });
    }
  }

  getFeederByZoneId(zoneId){
    let methodName = "getFeederByZoneId";
    this.feederList = [];
    if(this.user && this.user.division){
      this.loading = true;
      this.feederService.getAbsent33KVFeederReadByZoneId(zoneId, this.billMonth, false).subscribe(successResponese =>{
        this.loading = false;
        this.feederList = successResponese;
        this.initializePaginationVariables();
        if(this.feederList && this.feederList.length){
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
    this.pagedFeederList = [];
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.feederList.length, page, this.pageSize);
    this.pagedFeederList = this.feederList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedFeederList);
  }

}
