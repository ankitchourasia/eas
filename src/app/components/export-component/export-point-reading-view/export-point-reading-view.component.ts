import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'app/utility/global.constants';
import { GlobalResources } from 'app/utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { ExportService } from '@eas-services/export-service/export.service';

@Component({
  selector: 'eas-export-point-reading-view',
  templateUrl: './export-point-reading-view.component.html',
  styleUrls: ['./export-point-reading-view.component.css']
})
export class ExportPointReadingViewComponent implements OnInit {

  user: any;
  billMonth: any;
  billMonthYear: any;
  zoneList: any;
  selectedZone: any;
  _searchClicked: boolean;
  pager: any;
  pageSize: number;
  pagedExportPointReadingList : any;
  exportPointReadingList: any;
  constructor(public globalResources: GlobalResources, public globalConstants : GlobalConstants,
     public paginationService :PaginationService, private exportService: ExportService) { }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.zoneList = [];
    this.user = this.globalResources.getUserDetails();
    console.log(this.user);
    if(this.user.role === this.globalConstants.ROLE_ADMIN){
      this.zoneList = this.user.zoneList;
    }else if(this.user.role === this.globalConstants.ROLE_FIELD_ADMIN){
      this.zoneList.push(this.user.zone);
      this.selectedZone = this.user.zone;
    }
  }

  searchClicked(){
    let billingMonth = this.billMonth + "-" + this.billMonthYear;
    this.get11KVExportPointReadingsByZoneIdAndBillMonth(this.user.zone.id, billingMonth);
  }

  get11KVExportPointReadingsByZoneIdAndBillMonth(zoneId, billingMonth){
    this._searchClicked = true;
    this.exportService.getAll11KVExportPointReadingsByZoneIdAndBillMonth(zoneId, billingMonth, false).subscribe(
      successResponse =>{
        this._searchClicked = false;
        console.log(successResponse);
      }, errorResponse =>{
        this._searchClicked = false;
        console.log(errorResponse);
      }
    );
  }

  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 10;
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.exportPointReadingList.length, page, this.pageSize);
    this.pagedExportPointReadingList = this.exportPointReadingList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
