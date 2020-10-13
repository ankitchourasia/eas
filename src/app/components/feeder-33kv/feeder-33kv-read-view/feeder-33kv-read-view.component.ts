import { Component, OnInit } from '@angular/core';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalResources } from '@eas-utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { ZoneService } from '@eas-services/zone/zone.service';

@Component({
  selector: 'eas-feeder-33kv-read-view',
  templateUrl: './feeder-33kv-read-view.component.html',
  styleUrls: ['./feeder-33kv-read-view.component.css']
})
export class Feeder33KVReadViewComponent implements OnInit {

  COMPONENT_NAME: "Feeder33KVReadViewComponent";
  user: any = {};
  billMonth: string;
  feederReadingList: any;
  pagedFeederReadingList: any;
  month: string;
  year: string;
  loading: boolean;
  zone:any;
  zoneList: any;
  pager: any;
  pageSize: number;
  readingToEdit: any;
  _updateClicked: boolean;
  public readonly ROLE_ADMIN = GlobalConfiguration.ROLE_ADMIN;
  
  constructor(private feederService: FeederService, private zoneService: ZoneService,
    public globalConstants: GlobalConstants, private globalResources: GlobalResources, 
    private paginationService: PaginationService) { }

  ngOnInit() {
    this.setInitailValue();
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
      this.getZoneListByDivisionId(this.user.division.id);
    }else if(this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
      this.zoneList.push(this.user.zone);
    }
  }

  setInitailValue(){
    this.readingToEdit = undefined;
    this.feederReadingList = [];
    this.pagedFeederReadingList = [];
  }

  getZoneListByDivisionId(divisionId){
    this.zoneList = [];
    this.zoneService.getZonesByDivisionId(divisionId, false).subscribe(successResponse =>{
      this.zoneList = <any>successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  zoneChanged(){
    this.setInitailValue();
  }

  billMonthChanged(){
    this.setInitailValue();
    if(this.month && this.year){
      this.billMonth = this.month + '-' + this.year;
    }
  }
    
  searchClicked(){
    this.pagedFeederReadingList = [];
    if(this.zone === "ALL"){
      this.getFeederReadingsByDivisionIdAndBillMonth(this.user.division.id, this.billMonth);
    }else{
      this.getFeederByZoneIdAndBillMonth(this.zone.id, this.billMonth);
    }
  }
  
  getFeederReadingsByDivisionIdAndBillMonth(divisionId, billMonth){
    let methodName = "getFeederReadingsByDivisionIdAndBillMonth";
    this.loading =true;
    this.feederReadingList = [];
    this.feederService.get33KVFeederReadingsByDivisionIdAndbillMonth(divisionId, billMonth, false).subscribe(successResponse =>{
      this.loading = false;
      this.feederReadingList = successResponse;
      this.initializePaginationVariables();
      if(this.feederReadingList &&  this.feederReadingList.length){
        this.setPage(1);
      }
    }, errorResponse =>{
      this.loading = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  
  getFeederByZoneIdAndBillMonth(zoneId, billMonth){
    let methodName = "getFeederByZoneIdAndBillMonth";
    this.loading = true;
    this.feederReadingList = [];
    this.feederService.get33KVFeederReadingsByZoneIdAndBillMonth(zoneId, billMonth, false).subscribe(successResponse =>{
      this.loading = false;
      this.feederReadingList = successResponse;
      this.initializePaginationVariables();
      if(this.feederReadingList &&  this.feederReadingList.length){
        this.setPage(1);
      }
    }, errorResponse =>{
      this.loading = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    })
  }

  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 10;
  }

  setPage(page: number) {
    console.log("inside set page");
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.feederReadingList.length, page, this.pageSize);
    this.pagedFeederReadingList = this.feederReadingList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  editClicked(reading){
    this.readingToEdit = JSON.parse(JSON.stringify(reading));
    this.readingToEdit.currentReadDate = this.globalResources.getDateFromDatetimestamp(this.readingToEdit.currentReadDate);
  }

  readingChanged(){
    this.calculateConsumption();
  }

  assessmentChanged(){
      this.calculateConsumption();
  }

  calculateConsumption(){
    this.readingToEdit.difference = this.globalResources.getValueAsNumberWithFixed((this.readingToEdit.currentRead - this.readingToEdit.previousRead), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    this.readingToEdit.consumption =  this.globalResources.getValueAsNumberWithFixed((this.readingToEdit.difference * this.readingToEdit.mf), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    this.calculateTotalConsumption();
  }

  calculateTotalConsumption(){
    if(this.readingToEdit.assessment){
      this.readingToEdit.totalConsumption = this.globalResources.getValueAsNumberWithFixed((this.readingToEdit.consumption + this.readingToEdit.assessment), GlobalConstants.CALCULATION_ROUNDING_SCALE);
    } else{
      this.readingToEdit.totalConsumption = this.readingToEdit.consumption;
    }
  }

  updateClicked(updateForm, closeButtonRef){
    if(this.globalResources.validateForm(updateForm)){
      this.readingToEdit.currentReadDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.readingToEdit.currentReadDate);
      this.calculateConsumption();
      this.updateReading(updateForm, closeButtonRef);
    }
  }

  updateReading(updateForm, closeButtonRef){
    let methodName = "updateReading";
    this._updateClicked = true;
    let nextBillMonth = this.globalResources.getNextBillMonth(this.readingToEdit.billMonth);
    this.feederService.update33KVFeederReading(this.readingToEdit, nextBillMonth).subscribe(success =>{
      this._updateClicked = false;
      let aletResponse = this.globalResources.successAlert("Feeder reading updated successfully");
      aletResponse.then(result =>{
        this.updateFeederReadingList();
        this.closeModal(updateForm, closeButtonRef);
      });
    }, errorResponse =>{
      this._updateClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  updateFeederReadingList(){
    let itemIndex = this.feederReadingList.findIndex((reading) => (reading.id === this.readingToEdit.id));
    this.feederReadingList[itemIndex] = this.readingToEdit;
    this.setPage(this.pager.currentPage);
  }

  closeModal(updateForm, closeButtonRef){
    this.globalResources.resetValidateForm(updateForm);
    closeButtonRef.click();
    this._updateClicked = false;
    this.readingToEdit = undefined;
  }
}
