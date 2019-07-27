import { Component, OnInit } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';
import { GlobalConstants } from 'app/utility/global.constants';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { ExportService } from '@eas-services/export-service/export.service';

@Component({
  selector: 'eas-export-point-view',
  templateUrl: './export-point-view.component.html',
  styleUrls: ['./export-point-view.component.css']
})
export class ExportPointViewComponent implements OnInit {

  user: any;
  zoneList: any;
  selectedZone: any;
  exportPointList:any;
  searchButtonClicked: boolean;
  statusChangedButtonClicked: boolean;
  pager: any;
  pageSize: number;
  pagedExportPointList : any;
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private exportService: ExportService, public paginationService: PaginationService) { }

  ngOnInit() {
    this.checkUserRoll();
  }

  checkUserRoll(){
    this.zoneList = [];
    this.user = this.globalResources.getUserDetails();
    console.log(this.user);
    if(this.user.role === this.globalConstants.ROLE_ADMIN){
      this.zoneList = this.user.zoneList;
    }else if(this.user.role === this.globalConstants.ROLE_FIELD_ADMIN){
      this.zoneList.push(this.user.zone);
      this.selectedZone = this.user.zone;
      this.getAll11KVExportPointsByZoneId(this.selectedZone.id);
    }
  }

  searchClicked(){
    this.getAll11KVExportPointsByZoneId(this.selectedZone.id);
  }

  getAll11KVExportPointsByZoneId(zoneId){
    this.exportPointList = null;
    this.searchButtonClicked = true;
    this.exportService.getAll11KVExportPointsByZoneId(zoneId, false).subscribe(
      successResponse =>{
        console.log(successResponse);
        this.searchButtonClicked = false;  
        this.exportPointList = successResponse;
        this.initializePaginationVariables();
        this.setPage(1);
      },errorResponse =>{
        console.log(errorResponse);
        this.searchButtonClicked = false;
        this.globalResources.errorAlert("Error while fetching Export point");
      }
    );
  }

  statusChanged(exportPoint){
    this.statusChangedButtonClicked = true;
    console.log(exportPoint);
    this.exportService.statusChanged(exportPoint, false).subscribe(
      successResponse =>{
        console.log(successResponse);
        this.statusChangedButtonClicked = false;  
        if(successResponse){
          // exportPoint = successResponse;
          this.getAll11KVExportPointsByZoneId(this.selectedZone.id);
        }
      },errorResponse =>{
        console.log(errorResponse);
        this.statusChangedButtonClicked = false;
        this.globalResources.errorAlert("Error while fetching Export point");
      }
    );
  }

  
  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 5;
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.exportPointList.length, page, this.pageSize);
    this.pagedExportPointList = this.exportPointList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
