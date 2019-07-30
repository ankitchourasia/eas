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

  file: any;
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
  uploadButtonClicked: boolean;

  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private billFileService: BillFileService, public paginationService: PaginationService) { }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.zoneList = [];
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === this.globalConstants.ROLE_ADMIN){
      this.zoneList = this.user.zoneList;
    }else if(this.user.role === this.globalConstants.ROLE_FIELD_ADMIN){
      this.zoneList.push(this.user.zone);
      this.selectedZone = this.user.zone;
    }
  }

  fileChanged(event) {
    // this.fileName = this.fileName.split("\\").pop();
    this.file = null;
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.file = fileList[0];
      this.fileName = this.file.name;
      console.log(this.file);
    }
  }

  uploadClicked(fileUploadResultTemplate){
    this.uploadButtonClicked = true;
    this.billFileService.uploadBillFile(this.file, this.user.username, true).subscribe(
      successResponse =>{
        let result = <any>successResponse;
        this.file.upload = result.body;
        this.uploadButtonClicked = false;
        setTimeout(() => {
          let alertResponse = this.globalResources.templateAlert(fileUploadResultTemplate, {title:"Bill File Uploaded Successfully !"});
          // this.globalResources.templateAlert(document.getElementById('fileUploadResult'), "Bill File Uploaded Successfully !");
          alertResponse.then((result) => {
            this.getUploadedBillFileList();
          });
        }, 10);
      },
      errorResponse =>{
        console.log(errorResponse);
        this.uploadButtonClicked = false;
        if(errorResponse.status === 417){
          let data = errorResponse.error;
          this.globalResources.errorAlert("BillFile Already uploaded for bill month : " + data.billMonth);
        }else{
          let errorMessage = errorResponse.error.message;
          this.globalResources.errorAlert("Some error occured while uploading bill file.Try Again !<br>"+ errorMessage);
        }
      }
    );
  }

  getUploadedBillFileList(){
    let billingMonth = this.billMonth + "-" + this.billMonthYear;
    if(this.selectedZone && this.selectedZone.id){
      this.getUploadedBillFileListByZoneIdAndBillMonth(this.selectedZone.id, billingMonth);
    }else{
      this.getUploadedBillFileListByDivisionNameAndBillMonth(this.user.division.name, billingMonth);
    }
  }

  getUploadedBillFileListByZoneIdAndBillMonth(zoneId, billingMonth){
    this.billFileRefs = null;
    this.billFileService.getUploadedBillFileListByZoneIdAndBillMonth(zoneId, billingMonth, false).subscribe(successResponse =>{
      this.billFileRefs = successResponse;
      console.log(successResponse);
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  getUploadedBillFileListByDivisionNameAndBillMonth(divisionName, billingMonth){
    this.billFileRefs = null;
    this.billFileService.getUploadedBillFileListByDivisionNameAndBillMonth(divisionName, billingMonth, false).subscribe(successResponse =>{
      this.billFileRefs = successResponse;
      console.log(successResponse);
    },errorResponse =>{
      console.log(errorResponse);
    });
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
