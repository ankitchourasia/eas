import { Component, OnInit } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';
import { GlobalConstants } from 'app/utility/global.constants';
import { BillFileService } from '@eas-services/bill-file-service/bill-file.service';
import { PaginationService } from '@eas-services/pagination/pagination.service';

@Component({
  selector: 'eas-bill-file-upload',
  templateUrl: './bill-file-upload.component.html',
  styleUrls: ['./bill-file-upload.component.css']
})
export class BillFileUploadComponent implements OnInit {

  fileName: any;
  billMonth: any;
  billMonthYear: any;
  user: any;
  zoneList: any;
  selectedZone: any;
  billFileRefs: any;
  pager: any;
  pageSize: number;
  missingBillFileRefFeederList: any;
  pagedMissingBillFileRefFeederList: any;
  searchButtonClicked: boolean;
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private billFileService: BillFileService, public paginationService: PaginationService) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
  }

  searchClicked(){
    let billingMonth = this.billMonth + "-" + this.billMonthYear;
    if(this.selectedZone.id){
      this.getNotUploadedBillFileListByZoneIdAndBillMonth(this.selectedZone.id, billingMonth);
    }else{
      this.getNotUploadedBillFileListByDivisionIdAndBillMonth(this.user.division.id, billingMonth);
    }
  }

  getNotUploadedBillFileListByZoneIdAndBillMonth(zoneId, billingMonth){
    this.missingBillFileRefFeederList = null;
    this.searchButtonClicked = true;
    this.billFileService.getNotUploadedBillFileListByZoneIdAndBillMonth(zoneId, billingMonth, false).subscribe(successResponse =>{
      this.searchButtonClicked = false;
      this.missingBillFileRefFeederList = successResponse;
      console.log(successResponse);
      this.initializePaginationVariables();
      this.setPage(1);
    },errorResponse =>{
      console.log(errorResponse);
      this.searchButtonClicked = false;
    });
  }

  getNotUploadedBillFileListByDivisionIdAndBillMonth(divisionId, billingMonth){
    this.missingBillFileRefFeederList = null;
    this.searchButtonClicked = true;
    this.billFileService.getNotUploadedBillFileListByDivisionIdAndBillMonth(divisionId, billingMonth, false).subscribe(successResponse =>{
      this.searchButtonClicked = false;
      this.missingBillFileRefFeederList = successResponse;
      console.log(successResponse);
      this.initializePaginationVariables();
      this.setPage(1);
    },errorResponse =>{
      console.log(errorResponse);
      this.searchButtonClicked = false;
    });
  }

  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 10;
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.missingBillFileRefFeederList.length, page, this.pageSize);
    this.pagedMissingBillFileRefFeederList = this.missingBillFileRefFeederList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
