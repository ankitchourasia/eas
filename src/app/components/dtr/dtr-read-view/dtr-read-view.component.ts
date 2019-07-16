import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GlobalConstants } from 'app/utility/global.constants';
import { GlobalResources } from 'app/utility/global.resources';
import { DtrService } from '@eas-services/dtr-service/dtr.service';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { GlobalConfiguration } from 'app/utility/global-configuration';
import $ from 'jQuery';

@Component({
  selector: 'eas-dtr-read-view',
  templateUrl: './dtr-read-view.component.html',
  styleUrls: ['./dtr-read-view.component.css']
})
export class DtrReadViewComponent implements OnInit {

  user: any;
  billMonth:any;
  billMonthYear:any;
  dtrReadingList: any;
  dtrReadingToEdit: any;
  searchButtonClicked: boolean;
  pager: any;
  pageSize: number;
  pagedDtrReadingList : any;
  @ViewChild('modalCloseButtonRef') modalCloseButtonRef: ElementRef;
  constructor(public globalConstants: GlobalConstants, public globalResources: GlobalResources,
    private dtrService : DtrService, private paginationService : PaginationService) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
    this.getCurrentYear();
  }

  years: any = [];
  getCurrentYear(){
    let year = 2016;
    while(year <= 2050){
      this.years.push(year++);
    }
  }

  searchClicked(){
    this.dtrReadingList = null;
    if(this.user.role === this.globalConstants.ROLE_ADMIN){
    this.getAllDtrReadingByDivisionId(this.user.division.id);
    }else if(this.user.role === this.globalConstants.ROLE_FIELD_ADMIN){
      this.getAllDtrReadingByZoneId(this.user.zone.id);
    }
  }

  getAllDtrReadingByDivisionId(divisionId){
    this.searchButtonClicked = true;
    let billingMonth = this.billMonth + "-" + this.billMonthYear;
    this.dtrService.getReadingByDivisionId(billingMonth, divisionId, false).subscribe(successResponse =>{
      this.searchButtonClicked = false;
      this.dtrReadingList = successResponse;
      this.initializePaginationVariables();
      this.setPage(1);
      console.log(successResponse);
    },errorResponse =>{ 
      console.log(errorResponse);
      this.searchButtonClicked = false;
      this.globalResources.errorAlert(errorResponse.error.errorMessage);
    });
  }

  getAllDtrReadingByZoneId(zoneId){
    this.searchButtonClicked = true;
    let billingMonth = this.billMonth + "-" + this.billMonthYear;
    this.dtrService.getReadingByDivisionId(billingMonth, zoneId, false).subscribe(successResponse =>{
      this.searchButtonClicked = false;
      this.dtrReadingList = successResponse;
      this.initializePaginationVariables();
      this.setPage(1);
      console.log(successResponse);
    },errorResponse =>{
      console.log(errorResponse);
      this.searchButtonClicked = false;
      this.globalResources.errorAlert(errorResponse.error.errorMessage);
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

  editButtonClicked: boolean;
  editClicked(dtr){
    this.dtrReadingToEdit = Object.assign({}, dtr);
    this.editButtonClicked = true;
  }

  dtrCurrentReadingChanged(){
    this.readingConvertStringToNumber(this.dtrReadingToEdit);
    this.calculateDifference();
  }

  calculateDifference(){
    let currentReading = this.dtrReadingToEdit.currReading;
		let previousReading = this.dtrReadingToEdit.prevReading;
    if(currentReading  && previousReading && currentReading >= previousReading){
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
    dtrReadingToEdit.mf = Number.parseFloat(this.dtrReadingToEdit.mf);
    dtrReadingToEdit.prevReading = Number.parseFloat(this.dtrReadingToEdit.prevReading);
    dtrReadingToEdit.currReading = Number.parseFloat(this.dtrReadingToEdit.currReading);
    dtrReadingToEdit.readingDiff = Number.parseFloat(this.dtrReadingToEdit.readingDiff);
    dtrReadingToEdit.meterConsumption = Number.parseFloat(this.dtrReadingToEdit.meterConsumption);
    dtrReadingToEdit.assUnit = Number.parseFloat(this.dtrReadingToEdit.assUnit);
    dtrReadingToEdit.totalConsumption = Number.parseFloat(this.dtrReadingToEdit.totalConsumption);
  }

  updateButtonClicked: boolean;
  updateClicked(dtrReadingUpdateForm){
    if(this.globalResources.validateForm(dtrReadingUpdateForm)){
      this.updateButtonClicked = true;
      this.readingConvertStringToNumber(this.dtrReadingToEdit);
      this.calculateDifference();
      this.updateButtonClicked = false;
      console.log(this.dtrReadingToEdit);
      this.updateDTRRead(dtrReadingUpdateForm);
    }
  }

  updateDTRRead(dtrReadingUpdateForm){
    this.updateButtonClicked = true;
    let nextBillMonth = this.getNextBillMonth(this.dtrReadingToEdit.billMonth);
    console.log(this.dtrReadingToEdit, nextBillMonth, this.user.username);
    this.updateButtonClicked = false;
    this.dtrService.updateDTRRead(this.dtrReadingToEdit, nextBillMonth, this.user.username).subscribe(successResponese =>{
      this.updateButtonClicked = false;
      let alertResponse = this.globalResources.successAlert("DTR read updated successfully");
      alertResponse.then(result =>{
        this.globalResources.resetValidateForm(dtrReadingUpdateForm);
        this.closeModal(this.modalCloseButtonRef);
      });
    }, errorResponse =>{
      console.log(errorResponse);
      this.updateButtonClicked = false;
      let alertResponse = this.globalResources.errorAlert(errorResponse.error.errorMessage);
      alertResponse.then(result =>{
        console.log("alert result", result);
      });
    });
  }
  
  closeModal(modalCloseButtonRef: ElementRef){
    modalCloseButtonRef.nativeElement.click();
  }

  dtrUpdateModalCancel(dtrUpdateForm){
    this.editButtonClicked = false;
    this.globalResources.resetValidateForm(dtrUpdateForm);
  }

  getNextBillMonth(billMonth){
    var values = billMonth.split('-');
    var month = values[0];
    var year = 	parseInt(values[1]);
    var nextMonth;
    var nextYear = year;
    switch (month) {
    case "DEC":
      nextMonth = 'JAN';
      nextYear = nextYear + 1;
      break;
    case "JAN":
      nextMonth = 'FEB';
      break;
    case "FEB":
      nextMonth = 'MAR';
      break;
    case "MAR":
      nextMonth = 'APR';
      break;
    case "APR":
      nextMonth = 'MAY';
      break;
    case "MAY":
      nextMonth = 'JUN';
      break;
    case "JUN":
      nextMonth = 'JUL';
      break;
    case "JUL":
      nextMonth = 'AUG';
      break;
    case "AUG":
      nextMonth = 'SEP';
      break;
    case "SEP":
      nextMonth = 'OCT';
      break;
    case "OCT":
      nextMonth = 'NOV';
      break;
    case "NOV":
      nextMonth = 'DEC';
      break;
    default:
      break;
    }
    return nextMonth.toUpperCase()+"-"+nextYear;
  }

  exportClicked(){
    var params = {
      Authorization: 'Basic ' + sessionStorage.getItem('encodedCredentials'),
      billMonth: (this.billMonth + "-" + this.billMonthYear)
    };
    let fileUrl = null;
    if(this.user.role === 'admin'){
			fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "export/dtr/reading/division/" + this.user.division.id;
		}else{
			fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "export/dtr/reading/zone/" + this.user.zone.id;
		}
    var url = [fileUrl, $.param(params)].join('?');
		window.open(url);
  }

}
