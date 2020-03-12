import { Component, OnInit } from '@angular/core';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalResources } from '@eas-utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { ZoneService } from '@eas-services/zone/zone.service';

@Component({
  selector: 'eas-feeder-33kv-read-view',
  templateUrl: './feeder-33kv-read-view.component.html',
  styleUrls: ['./feeder-33kv-read-view.component.css']
})
export class Feeder33KVReadViewComponent implements OnInit {

  COMPONENT_NAME: "Feeder33KVReadViewComponent";
  user: any = {};
  billMonth: string;
  feederReadingList: any;
  pagedFeederReadingList: any;
  month: string;
  year: string;
  loading: boolean;
  zone:any;
  zoneList: any;
  pager: any;
  pageSize: number;
  public readonly ROLE_ADMIN = GlobalConfiguration.ROLE_ADMIN;
  
  constructor(private feederService: FeederService, private zoneService: ZoneService,
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
    this.feederReadingList = [];
    this.pagedFeederReadingList = [];
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
    this.pagedFeederReadingList = [];
    if(this.zone === "ALL"){
      this.getFeederReadingsByDivisionId(this.user.division.id);
    }else{
      this.getFeederByZoneId(this.zone.id);
    }
  }
  
  getFeederReadingsByDivisionId(divisionId){
    let methodName = "getFeederReadingsByDivisionId";
    this.loading =true;
    this.feederReadingList = [];
    this.feederService.get33KVFeederReadingsByDivisionIdAndbillMonth(divisionId, this.billMonth, false).subscribe(successResponse =>{
      this.loading = false;
      this.feederReadingList = successResponse;
      this.initializePaginationVariables();
      if(this.feederReadingList &&  this.feederReadingList.length){
        this.setPage(1);
      }
    }, errorResponse =>{
      this.loading = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  
  getFeederByZoneId(zoneId){
    let methodName = "getFeederByZoneId";
    this.loading = true;
    this.feederReadingList = [];
    this.feederService.get33KVFeederReadingsByZoneIdAndBillMonth(zoneId, this.billMonth, false).subscribe(successResponse =>{
      this.loading = false;
      this.feederReadingList = successResponse;
      this.initializePaginationVariables();
      if(this.feederReadingList &&  this.feederReadingList.length){
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
    this.pager = this.paginationService.getPager(this.feederReadingList.length, page, this.pageSize);
    this.pagedFeederReadingList = this.feederReadingList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
