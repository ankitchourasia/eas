import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalResources } from '@eas-utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { ExportService } from '@eas-services/export-service/export.service';
import { NgForm } from '@angular/forms';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-export-point-reading-view',
  templateUrl: './export-point-reading-view.component.html',
  styleUrls: ['./export-point-reading-view.component.css']
})
export class ExportPointReadingViewComponent implements OnInit {

  COMPONENT_NAME: string = "ExportPointReadingViewComponent";
  user: any;
  zoneList: any;
  billMonth: any;
  billMonthYear: any;
  selectedZone: any;
  pager: any;
  pageSize: number;
  pagedExportPointReadingList : any;
  exportPointReadingList: any;
  updateFormData: any = {};
  _updateClicked: boolean;
  _searchClicked: boolean;
  constructor(public globalResources: GlobalResources, public globalConstants : GlobalConstants,
     public paginationService :PaginationService, private exportService: ExportService,
     private zoneService: ZoneService) { }

  ngOnInit() {
    this.setInitialValue();
    this.setPartialData();
  }

  setInitialValue(){
    this.exportPointReadingList = [];
    this.pagedExportPointReadingList = [];
  }

  setPartialData(){
    this.zoneList = [];
    this.exportPointReadingList = [];
    this.pagedExportPointReadingList = [];
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
      this.getZoneListByDivisionId(this.user.division.id);
    }else if(this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
      this.zoneList.push(this.user.zone);
      this.selectedZone = this.user.zone;
    }
  }

  getZoneListByDivisionId(divisionId){
    this.zoneList = [];
    this.zoneService.getZonesByDivisionId(divisionId, false).subscribe(successResponse =>{
      this.zoneList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  searchClicked(){
    this.setInitialValue();
    let billingMonth = this.billMonth + "-" + this.billMonthYear;
    this.get11KVExportPointReadingsByZoneIdAndBillMonth(this.selectedZone.id, billingMonth);
  }

  get11KVExportPointReadingsByZoneIdAndBillMonth(zoneId, billingMonth){
    this._searchClicked = true;
    this.exportPointReadingList = [];
    this.exportService.getAll11KVExportPointReadingsByZoneIdAndBillMonth(zoneId, billingMonth, false).subscribe(
      successResponse =>{
        this._searchClicked = false;
        this.exportPointReadingList = successResponse;
        this.initializePaginationVariables();
        if(this.exportPointReadingList && this.exportPointReadingList.length){
          this.setPage(1);
        }
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
    this.updateFormData.mf =  Number(this.updateFormData.mf);
    this.updateFormData.assUnit = Number(this.updateFormData.assUnit);
    this.updateFormData.prevReading = Number(this.updateFormData.prevReading);
    this.updateFormData.currReading = Number(this.updateFormData.currReading);
    this.updateFormData.meterConsumption = Number(this.updateFormData.meterConsumption);
    this.updateFormData.readingDiff = Number(this.updateFormData.readingDiff);
    this.updateFormData.totalConsumption = Number(this.updateFormData.totalConsumption);
  }

  currentReadingDateChanged(){
    this.updateFormData.currReadingDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.updateFormData.currReadingDate);
  }

  currentReadingChanged(){
    this.calculateDifference();
  }

  assessmentUnitChanged(){
    if(this.updateFormData.assUnit){
      this.updateFormData.totalConsumption = this.globalResources.getValueAsNumberWithFixed((this.updateFormData.meterConsumption + this.updateFormData.assUnit), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    }else{
      this.updateFormData.totalConsumption = this.updateFormData.meterConsumption;
    }
  }

  calculateDifference(){
    let currentReading = Number(this.updateFormData.currReading);
    let previousReading = Number(this.updateFormData.prevReading);
    if(currentReading !== null && currentReading !== undefined && previousReading !== null && previousReading !== undefined && currentReading >= previousReading){
      let difference = this.globalResources.getValueAsNumberWithFixed((currentReading - previousReading), GlobalConstants.CALCULATION_ROUNDING_SCALE);
      this.updateFormData.readingDiff = difference;
      this.updateFormData.readingDiff = Math.round(this.updateFormData.readingDiff * 100) / 100;
      this.updateFormData.meterConsumption = this.globalResources.getValueAsNumberWithFixed((difference * this.updateFormData.mf), GlobalConstants.CALCULATION_ROUNDING_SCALE);
      this.updateFormData.meterConsumption = Math.round(this.updateFormData.meterConsumption * 100) / 100;
      if(this.updateFormData.assUnit){
        this.updateFormData.totalConsumption = this.globalResources.getValueAsNumberWithFixed((this.updateFormData.meterConsumption + this.updateFormData.assUnit), GlobalConstants.CALCULATION_ROUNDING_SCALE);
      }else{
        this.updateFormData.totalConsumption = this.updateFormData.meterConsumption;
      }
    }
  }

  updateClicked(exportPointReadingUpdateForm: NgForm, modalCloseButtonRef){
    if(this.globalResources.validateForm(exportPointReadingUpdateForm)){
      this.calculateDifference();
      this.updateExportPointReading(exportPointReadingUpdateForm, modalCloseButtonRef);
    }
  }

  updateExportPointReading(exportPointReadingUpdateForm, modalCloseButtonRef){
    let methodName = "updateExportPointReading";
    this._updateClicked = true;
    let nextBillMonth = this.globalResources.getNextBillMonth(this.updateFormData.billMonth);
    this.exportService.update11KVExportPointReading(this.updateFormData, nextBillMonth, this.user.username, false).subscribe(
      successResponse =>{
        this._updateClicked = false;
        let alertResponse = this.globalResources.successAlert("Export point reading updated successfully");
        alertResponse.then(result =>{
          this.updateExportPointReadingList();
          this.closeModal(exportPointReadingUpdateForm, modalCloseButtonRef);
        });
      },errorResponse =>{
        this._updateClicked = false;
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
      }
    );  
  }

  updateExportPointReadingList(){
    let itemIndex = this.exportPointReadingList.findIndex((reading) => (reading.id === this.updateFormData.id));
    this.exportPointReadingList[itemIndex] = this.updateFormData;
    this.setPage(this.pager.currentPage);
  }

  closeModal(exportPointReadingUpdateForm, modalCloseButtonRef){
    this.globalResources.resetValidateForm(exportPointReadingUpdateForm);
    modalCloseButtonRef.click();
    this._updateClicked = false;
    this.updateFormData = undefined;
  }

  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 10;
    this.pagedExportPointReadingList = [];
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.exportPointReadingList.length, page, this.pageSize);
    this.pagedExportPointReadingList = this.exportPointReadingList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
