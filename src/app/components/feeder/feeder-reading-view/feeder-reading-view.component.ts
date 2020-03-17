import { Component, OnInit } from '@angular/core';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { GlobalResources } from '@eas-utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-feeder-reading-view',
  templateUrl: './feeder-reading-view.component.html',
  styleUrls: ['./feeder-reading-view.component.css']
})
export class FeederReadingViewComponent implements OnInit {

  COMPONENT_NAME: "FeederReadingViewComponent";
  user: any = {};
  billMonth: string;
  feederReadingList: any;
  pagedFeederReadingList: any;
  month: string;
  year: string;
  loading: boolean;
  readingToEdit: any;
  _updateClicked: boolean;

  pager: any;
  pageSize: number;
  public readonly ROLE_ADMIN = GlobalConfiguration.ROLE_ADMIN;
  constructor(private feederService: FeederService, public globalConstants: GlobalConstants,
    private globalResources: GlobalResources, private paginationService: PaginationService) { }

  ngOnInit() {
    this.setInitialValues();
    this.user = this.globalResources.getUserDetails();
  }

  setInitialValues(){
    this.readingToEdit = undefined;
    this.feederReadingList = [];
    this.pagedFeederReadingList = [];
  } 

  searchClicked(){
    this.setInitialValues();
    this.getFeederReadings();
  }
  
  getFeederReadings(){
    let methodName = "getFeederReading";
    this.feederReadingList = [];
    this.billMonth = this.month + '-' + this.year;
    if(this.user && this.user.division){
      this.loading =true;
      this.feederService.getFeederReadingsByDivisionId(this.user.division.id, this.billMonth).subscribe(successResponse =>{
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
  }

  editClicked(reading){
    this.readingToEdit = Object.assign({}, reading);
    this.readingToEdit.currReadingDate = this.globalResources.getDateFromDatetimestamp(this.readingToEdit.currReadingDate);
  }

  updateClicked(updateForm, closeButtonRef){
    if(this.globalResources.validateForm(updateForm)){
      this.readingToEdit.currReadingDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.readingToEdit.currReadingDate);
      this.calculateConsumption();
      this.updateReading(updateForm, closeButtonRef);
    }
  }

  readingChanged(){
    this.calculateConsumption();
  }

  assessmentChanged(){
      this.calculateConsumption();
  }

  calculateConsumption(){
    this.readingToEdit.readingDiff = (Number.parseFloat(this.readingToEdit.currReading) - Number.parseFloat(this.readingToEdit.prevReading)).toFixed(2);
    this.readingToEdit.meterConsumption =  Number.parseInt(this.readingToEdit.readingDiff) * Number.parseFloat(this.readingToEdit.mf);
    this.calculateTotalConsumption();
  }

  calculateTotalConsumption(){
    if(this.readingToEdit.assUnit){
      this.readingToEdit.totalConsumption = Number.parseInt(this.readingToEdit.meterConsumption) + Number.parseInt(this.readingToEdit.assUnit);
    } else{
      this.readingToEdit.totalConsumption = this.readingToEdit.meterConsumption;
    }
  }

  updateReading(updateForm, closeButtonRef){
    let methodName = "updateReading";
    this._updateClicked = true;
    let nextBillMonth = this.globalResources.getNextBillMonth(this.readingToEdit.billMonth);
    this.feederService.updateFeederReading(this.readingToEdit, nextBillMonth, this.user.username).subscribe(success =>{
      this._updateClicked = false;
      let aletResponse = this.globalResources.successAlert("Feeder reading updated successfully");
      aletResponse.then(result =>{
        this.closeModal(updateForm, closeButtonRef);
        this.readingToEdit = undefined;
      });
    }, errorResponse =>{
      this._updateClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

    
  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 10;
    this.pagedFeederReadingList = [];
  }

  setPage(page: number) {
    console.log("inside set page");
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.feederReadingList.length, page, this.pageSize);
    this.pagedFeederReadingList = this.feederReadingList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  closeModal(updateForm, closeButtonRef){
    this.globalResources.resetValidateForm(updateForm);
    closeButtonRef.click();
    this._updateClicked = false;
    this.readingToEdit = undefined;
  }
}
