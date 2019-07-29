import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'app/utility/global.constants';
import { GlobalResources } from 'app/utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { ExportService } from '@eas-services/export-service/export.service';
import { NgForm } from '@angular/forms';

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
  updateFormData: any = {};
  _updateClicked: boolean;
  display: any = "none";
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
    this.exportPointReadingList = null;
    this.exportService.getAll11KVExportPointReadingsByZoneIdAndBillMonth(zoneId, billingMonth, false).subscribe(
      successResponse =>{
        console.log(successResponse);
        this._searchClicked = false;
        this.exportPointReadingList = successResponse;
        this.initializePaginationVariables();
        this.setPage(1);
      }, errorResponse =>{
        console.log(errorResponse);
        this._searchClicked = false;
        this.globalResources.errorAlert("Error while fetching all the feeders export point reading.");
      }
    );
  }

  editClicked(exportPointReading){
    this.updateFormData  = Object.assign({}, exportPointReading);
    this.updateFormData.prevReadingDate = this.globalResources.getDateFromDatetimestamp(this.updateFormData.prevReadingDate);
    this.updateFormData.currReadingDate = this.globalResources.getDateFromDatetimestamp(this.updateFormData.currReadingDate);
    this.updateFormData.mf =  Number.parseFloat(this.updateFormData.mf);
    this.updateFormData.assUnit = Number.parseFloat(this.updateFormData.assUnit);
    this.updateFormData.prevReading = Number.parseFloat(this.updateFormData.prevReading);
    this.updateFormData.currReading = Number.parseFloat(this.updateFormData.currReading);
    this.updateFormData.meterConsumption = Number.parseFloat(this.updateFormData.meterConsumption);
    this.updateFormData.readingDiff = Number.parseFloat(this.updateFormData.readingDiff);
    this.updateFormData.totalConsumption = Number.parseFloat(this.updateFormData.totalConsumption);
    console.log(this.updateFormData);
    this.openModal();
  }

  currentReadingDateChanged(){
    this.updateFormData.currReadingDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.updateFormData.currReadingDate);
  }

  currentReadingChanged(){
    this.calculateDifference();
  }

  assessmentUnitChanged(){
    if(this.updateFormData.assUnit){
      this.updateFormData.totalConsumption = this.updateFormData.meterConsumption + this.updateFormData.assUnit;
    }else{
      this.updateFormData.totalConsumption = this.updateFormData.meterConsumption;
    }
  }

  calculateDifference(){
    console.log("inside calculate difference");
    let currentReading = Number.parseFloat(this.updateFormData.currReading);
    let previousReading = Number.parseFloat(this.updateFormData.prevReading);
    if(currentReading !== null && currentReading !== undefined && previousReading !== null && previousReading !== undefined && currentReading >= previousReading){
      let difference = currentReading - previousReading;
      this.updateFormData.readingDiff = difference;
      this.updateFormData.readingDiff = Math.round(this.updateFormData.readingDiff * 100) / 100;
      this.updateFormData.meterConsumption = difference * this.updateFormData.mf;
      console.log("feeder consumption before rounding: "+this.updateFormData.meterConsumption);
      this.updateFormData.meterConsumption = Math.round(this.updateFormData.meterConsumption * 100) / 100;
      console.log("feeder consumption after rounding: "+this.updateFormData.meterConsumption);
      if(this.updateFormData.assUnit){
        this.updateFormData.totalConsumption = this.updateFormData.meterConsumption + this.updateFormData.assUnit;
      }else{
        this.updateFormData.totalConsumption = this.updateFormData.meterConsumption;
      }
    }
  }

  updateClicked(exportPointReadingUpdateForm: NgForm){
    if(this.globalResources.validateForm(exportPointReadingUpdateForm)){
      this.calculateDifference();
      this.updateExportPointReading();
    }
  }

  updateExportPointReading(){
    this._updateClicked = true;
    let nextBillMonth = this.globalResources.getNextBillMonth(this.updateFormData.billMonth);
    this.exportService.update11KVExportPointReading(this.updateFormData, nextBillMonth, this.user.username, false).subscribe(
      successResponse =>{
        console.log(successResponse);
        this._updateClicked = false;
        this.updateFormData = {};
        this.closeModal();
        let alertResponse = this.globalResources.successAlert("11kv Export Reading updated Successfully!");
        alertResponse.then(result =>{
          this.searchClicked();
        });
      },errorResponse =>{
        console.log(errorResponse);
        this._updateClicked = false;
        this.globalResources.errorAlert("Error while updating Reading.");
      }
    );  
  }

  cancelClicked(exportPointReadingUpdateForm){
    this.globalResources.resetValidateForm(exportPointReadingUpdateForm);
    this.updateFormData = {};
    this.closeModal();
  }

  openModal(){
    this.display = 'block';
  }

  closeModal(){
    this.display = 'none';
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
