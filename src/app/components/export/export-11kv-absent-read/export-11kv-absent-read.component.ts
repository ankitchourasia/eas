import { Component, OnInit } from '@angular/core';
import { ExportService } from '@eas-services/export-service/export.service';
import { GlobalResources } from '@eas-utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-export-11kv-absent-read',
  templateUrl: './export-11kv-absent-read.component.html',
  styleUrls: ['./export-11kv-absent-read.component.css']
})
export class Export11KVAbsentReadComponent implements OnInit {

  COMPONENT_NAME: "Feeder33KVAbsentReadComponent";
  user : any;
  zone: any;
  billMonth : string;
  month: string;
  year: string;
  zoneList: any;
  exportPoints: any;
  pager: any;
  pageSize: number;
  pagedExportPoints : any;
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
      this.getByZoneId(this.user.zone.id);
    }
  }

  setInitialValue(){
    this.pagedExportPoints = [];
    this.exportPoints = [];
  }

  zoneChanged(){
    this.setInitialValue();
  }

  searchClicked(){
    this.pagedExportPoints = [];
    if(this.zone === "ALL"){
      this.getByDivisionId(this.user.division.id);
    }else{
      this.getByZoneId(this.zone.id);
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

  getByDivisionId(divisionId){
    let methodName = "geByDivisionId";
    this.exportPoints = [];
    if(this.user && this.user.division){
      this.loading = true;
      this.exportService.getAbsent11KVExportReadByDivisionId(divisionId, this.billMonth, false).subscribe(successResponese =>{
        this.loading = false;
        this.exportPoints = successResponese;
        this.initializePaginationVariables();
        if(this.exportPoints && this.exportPoints.length){
          this.setPage(1);
        }
      }, errorResponse =>{
        this.loading = false;
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
      });
    }
  }

  getByZoneId(zoneId){
    let methodName = "getByZoneId";
    this.exportPoints = [];
    if(this.user && this.user.division){
      this.loading = true;
      this.exportService.getAbsent11KVExportReadByZoneId(zoneId, this.billMonth, false).subscribe(successResponese =>{
        this.loading = false;
        this.exportPoints = successResponese;
        console.log(this.exportPoints);
        this.initializePaginationVariables();
        if(this.exportPoints && this.exportPoints.length){
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
    this.pagedExportPoints = [];
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.exportPoints.length, page, this.pageSize);
    this.pagedExportPoints = this.exportPoints.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedExportPoints);
  }

}
