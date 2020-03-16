import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { ExportService } from '@eas-services/export-service/export.service';

@Component({
  selector: 'eas-feeder-33kv-export-point-view',
  templateUrl: './feeder-33kv-export-point-view.component.html',
  styleUrls: ['./feeder-33kv-export-point-view.component.css']
})
export class Feeder33KVExportPointViewComponent implements OnInit {

  COMPONENT_NAME: "Feeder33KVExportPointViewComponent";
  user : any;
  zone: any;
  zoneList: any;
  exportPointList: any;
  pager: any;
  pageSize: number;
  pagedExportPointList : any;
  loading : boolean;
  
  constructor(private exportService : ExportService, private globalResources : GlobalResources, 
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
      this.getExportPointByZoneId(this.user.zone.id);
    }
  }

  setInitialValue(){
    this.exportPointList = [];
    this.pagedExportPointList = [];
  }

  zoneChanged(){
    this.setInitialValue();
    if(this.zone === "ALL"){
      this.getExportPointByDivisionId(this.user.division.id);
    }else{
      this.getExportPointByZoneId(this.zone.id);
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

  getExportPointByDivisionId(divisionId){
    let methodName = "getExportPointByDivisionId";
    this.exportPointList = [];
    if(this.user && this.user.division){
      this.loading = true;
      this.exportService.get33KVExportPointsByDivisionId(divisionId, false).subscribe(successResponese =>{
        this.loading = false;
        this.exportPointList = successResponese;
        this.initializePaginationVariables();
        if(this.exportPointList && this.exportPointList.length){
          this.setPage(1);
        }
      }, errorResponse =>{
        this.loading = false;
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
      });
    }
  }

  getExportPointByZoneId(zoneId){
    let methodName = "getExportPointByZoneId";
    this.exportPointList = [];
    if(this.user && this.user.division){
      this.loading = true;
      this.exportService.get33KVExportPointsByZoneId(zoneId, false).subscribe(successResponese =>{
        this.loading = false;
        this.exportPointList = successResponese;
        this.initializePaginationVariables();
        if(this.exportPointList && this.exportPointList.length){
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
    this.pagedExportPointList = [];
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.exportPointList.length, page, this.pageSize);
    this.pagedExportPointList = this.exportPointList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
