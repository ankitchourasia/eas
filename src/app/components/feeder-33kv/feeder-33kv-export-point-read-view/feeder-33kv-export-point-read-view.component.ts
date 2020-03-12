import { Component, OnInit } from '@angular/core';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { ExportService } from '@eas-services/export-service/export.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalResources } from '@eas-utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';

@Component({
  selector: 'eas-feeder-33kv-export-point-read-view',
  templateUrl: './feeder-33kv-export-point-read-view.component.html',
  styleUrls: ['./feeder-33kv-export-point-read-view.component.css']
})
export class Feeder33KVExportPointReadViewComponent implements OnInit {

  COMPONENT_NAME: "Feeder33KVExportPointReadViewComponent";
  user: any = {};
  billMonth: string;
  exportPointReadingList: any;
  pagedExportPointReadingList: any;
  month: string;
  year: string;
  loading: boolean;
  zone:any;
  zoneList: any;
  pager: any;
  pageSize: number;
  public readonly ROLE_ADMIN = GlobalConfiguration.ROLE_ADMIN;
  
  constructor(private exportService: ExportService, private zoneService: ZoneService,
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
    this.exportPointReadingList = [];
    this.pagedExportPointReadingList = [];
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
    this.pagedExportPointReadingList = [];
    if(this.zone === "ALL"){
      this.getExportPointReadsByDivisionIdAndBillMonth(this.user.division.id, this.billMonth);
    }else{
      this.getExportPointReadsByZoneIdAndBillMonth(this.zone.id, this.billMonth);
    }
  }
  
  getExportPointReadsByDivisionIdAndBillMonth(divisionId, billMonth){
    let methodName = "getExportPointReadsByDivisionIdAndBillMonth";
    this.loading =true;
    this.exportPointReadingList = [];
    this.exportService.get33KVFeederExportPointReadsByDivisionIdAndbillMonth(divisionId, billMonth, false).subscribe(successResponse =>{
      this.loading = false;
      this.exportPointReadingList = successResponse;
      this.initializePaginationVariables();
      if(this.exportPointReadingList &&  this.exportPointReadingList.length){
        this.setPage(1);
      }
    }, errorResponse =>{
      this.loading = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  
  getExportPointReadsByZoneIdAndBillMonth(zoneId, billMonth){
    let methodName = "getFeederByZoneId";
    this.loading = true;
    this.exportPointReadingList = [];
    this.exportService.get33KVFeederExportPointReadsByZoneIdAndbillMonth(zoneId, billMonth, false).subscribe(successResponse =>{
      this.loading = false;
      this.exportPointReadingList = successResponse;
      this.initializePaginationVariables();
      if(this.exportPointReadingList &&  this.exportPointReadingList.length){
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
    this.pager = this.paginationService.getPager(this.exportPointReadingList.length, page, this.pageSize);
    this.pagedExportPointReadingList = this.exportPointReadingList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
