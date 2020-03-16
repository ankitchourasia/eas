import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalResources } from '@eas-utility/global.resources';
import { DtrService } from '@eas-services/dtr-service/dtr.service';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-dtr-read-view',
  templateUrl: './dtr-read-view.component.html',
  styleUrls: ['./dtr-read-view.component.css']
})
export class DtrReadViewComponent implements OnInit {

  COMPONENT_NAME: string = "DtrReadViewComponent";
  user: any;
  billMonth:any;
  billMonthYear:any;
  dtrReadingList: any;
  dtrReadingToEdit: any;
  _searchClicked: boolean;
  pager: any;
  pageSize: number;
  pagedDtrReadingList : any;
  constructor(public globalConstants: GlobalConstants, public globalResources: GlobalResources,
    private dtrService : DtrService, private paginationService : PaginationService) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
  }

  searchClicked(){
    let billingMonth = this.billMonth + "-" + this.billMonthYear;
    if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
    this.getAllDtrReadingByDivisionIdAndBillMonth(this.user.division.id, billingMonth);
    }else if(this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
      this.getAllDtrReadingByZoneIdAndBillMonth(this.user.zone.id, billingMonth);
    }
  }

  getAllDtrReadingByDivisionIdAndBillMonth(divisionId, billingMonth){
    let methodName = "getAllDtrReadingByDivisionIdAndBillMonth";
    this._searchClicked = true;
    this.dtrReadingList = [];
    this.dtrService.getReadingByDivisionIdAndBillMonth(divisionId, billingMonth, false).subscribe(successResponse =>{
      this._searchClicked = false;
      this.dtrReadingList = successResponse;
      this.initializePaginationVariables();
      if(this.dtrReadingList && this.dtrReadingList.length){
        this.setPage(1);
      }
    },errorResponse=>{
      this._searchClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  getAllDtrReadingByZoneIdAndBillMonth(zoneId, billingMonth){
    let methodName = "getAllDtrReadingByZoneIdAndBillMonth";
    this._searchClicked = true;
    this.dtrReadingList = [];
    this.dtrService.getReadingByZoneIdAndBillMonth(zoneId, billingMonth, false).subscribe(successResponse =>{
      this._searchClicked = false;
      this.dtrReadingList = successResponse;
      this.initializePaginationVariables();
      if(this.dtrReadingList && this.dtrReadingList.length){
        this.setPage(1);
      }
    },errorResponse=>{
      this._searchClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
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
    this.pager = this.paginationService.getPager(this.dtrReadingList.length, page, this.pageSize);
    this.pagedDtrReadingList = this.dtrReadingList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  editClicked(dtr){
    this.dtrReadingToEdit = Object.assign({}, dtr);
  }

  dtrCurrentReadingChanged(){
    this.readingConvertStringToNumber(this.dtrReadingToEdit);
    this.calculateDifference();
  }

  calculateDifference(){
    let currentReading = Number(this.dtrReadingToEdit.currReading);
		let previousReading = Number(this.dtrReadingToEdit.prevReading);
    if(currentReading !== null && currentReading !== undefined  && previousReading !== null && previousReading !== undefined && currentReading >= previousReading){
			this.dtrReadingToEdit.readingDiff = currentReading - previousReading;
			this.dtrReadingToEdit.readingDiff = Math.round(this.dtrReadingToEdit.readingDiff * 100) / 100;
			this.dtrReadingToEdit.meterConsumption = this.dtrReadingToEdit.readingDiff * this.dtrReadingToEdit.mf;
      this.dtrReadingToEdit.meterConsumption = Math.round(this.dtrReadingToEdit.meterConsumption * 100) / 100;
      if(this.dtrReadingToEdit.assUnit){
        this.dtrReadingToEdit.totalConsumption = this.dtrReadingToEdit.meterConsumption + this.dtrReadingToEdit.assUnit;
      }else{
        this.dtrReadingToEdit.totalConsumption = this.dtrReadingToEdit.meterConsumption;
      }
		}
  }
  
  dtrAssessmentUnitChanged(){
    this.readingConvertStringToNumber(this.dtrReadingToEdit);
    if(this.dtrReadingToEdit.assUnit){
      this.dtrReadingToEdit.totalConsumption = this.dtrReadingToEdit.meterConsumption + this.dtrReadingToEdit.assUnit;
    }else{
      this.dtrReadingToEdit.totalConsumption = this.dtrReadingToEdit.meterConsumption;
    }
  }

  readingConvertStringToNumber(dtrReadingToEdit){
    dtrReadingToEdit.mf = Number(this.dtrReadingToEdit.mf);
    dtrReadingToEdit.prevReading = Number(this.dtrReadingToEdit.prevReading);
    dtrReadingToEdit.currReading = Number(this.dtrReadingToEdit.currReading);
    dtrReadingToEdit.readingDiff = Number(this.dtrReadingToEdit.readingDiff);
    dtrReadingToEdit.meterConsumption = Number(this.dtrReadingToEdit.meterConsumption);
    dtrReadingToEdit.assUnit = Number(this.dtrReadingToEdit.assUnit);
    dtrReadingToEdit.totalConsumption = Number(this.dtrReadingToEdit.totalConsumption);
  }

  _updateClicked: boolean;
  updateClicked(dtrReadingUpdateForm, modalCloseButtonRef){
    if(this.globalResources.validateForm(dtrReadingUpdateForm)){
      this._updateClicked = true;
      this.readingConvertStringToNumber(this.dtrReadingToEdit);
      this.calculateDifference();
      this._updateClicked = false;
      this.updateDTRRead(dtrReadingUpdateForm, modalCloseButtonRef);
    }
  }

  updateDTRRead(dtrReadingUpdateForm, modalCloseButtonRef){
    let methodName = "updateDTRRead";
    this._updateClicked = true;
    let nextBillMonth = this.globalResources.getNextBillMonth(this.dtrReadingToEdit.billMonth);
    this.dtrService.updateDTRRead(this.dtrReadingToEdit, nextBillMonth, this.user.username).subscribe(successResponese =>{
      this._updateClicked = false;
      let alertResponse = this.globalResources.successAlert("DTR read updated successfully");
      alertResponse.then(result =>{
        this.closeModal(dtrReadingUpdateForm, modalCloseButtonRef);
      });
    },errorResponse=>{
      this._updateClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }
  
  closeModal(dtrReadingUpdateForm, modalCloseButtonRef){
    this.globalResources.resetValidateForm(dtrReadingUpdateForm);
    modalCloseButtonRef.click();
    this._updateClicked = false;
    this.dtrReadingToEdit = undefined;
  }

  exportClicked(){
    var params = {
      Authorization: 'Basic ' + sessionStorage.getItem('encodedCredentials'),
      billMonth: (this.billMonth + "-" + this.billMonthYear)
    };
    let fileUrl = null;
    if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
			fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "export/dtr/reading/division/" + this.user.division.id;
		}else{
			fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "export/dtr/reading/zone/" + this.user.zone.id;
		}
    this.globalResources.downloadFile(fileUrl, params);
  }

}
