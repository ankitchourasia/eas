import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { GlobalResources } from 'app/utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { GlobalConstants } from 'app/utility/global.constants';

@Component({
  selector: 'eas-feeder-reading-view',
  templateUrl: './feeder-reading-view.component.html',
  styleUrls: ['./feeder-reading-view.component.css']
})
export class FeederReadingViewComponent implements OnInit {

  years : any = [];
  user : any = {};
  billMonth : string;
  feederReadings : any;
  pagedFeederReadings : any = [];
  month : string;
  year : string;
  loading : boolean;
  readingToEdit : any;
  updateButtonClicked : boolean;

  pager: any;
  pageSize: number;
  
  @ViewChild('closeButtonRef') closeButtonRef: ElementRef;
  constructor(private feederService : FeederService, public globalConstants : GlobalConstants,
    private globalResources : GlobalResources, private paginationService : PaginationService) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
    this.fetchCurrentYear();
  }

  fetchCurrentYear(){
		var year = 2016;
		this.years = [];
		while(year <= 2026){
			this.years.push(year++);
		}
  }
  
  getFeederReadings(){
    this.loading =true;
    this.billMonth = this.month + '-' + this.year;
    this.feederService.getFeederReadingsByDivisionId(this.user.division.id, this.billMonth).subscribe(success =>{
      this.loading = false;
      console.log(success);
      this.feederReadings = success;
      this.initializePaginationVariables();
      this.setPage(1);
    }, error =>{
      this.loading = false;
      console.log(error);
    });
  }

  editClicked(reading){
    this.readingToEdit = Object.assign({}, reading);
    this.readingToEdit.currReadingDate = this.globalResources.getDateFromDatetimestamp(this.readingToEdit.currReadingDate);
  }

  updateClicked(updateForm){
    if(this.globalResources.validateForm(updateForm)){
      this.readingToEdit.currReadingDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.readingToEdit.currReadingDate);
      this.calculateConsumption();
      let nextBillMonth = this.globalResources.getNextBillMonth(this.readingToEdit.billMonth);
      this.updateReading(nextBillMonth);
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

  updateReading(nextBillMonth){
    this.updateButtonClicked = true;
    this.feederService.updateFeederReading(this.readingToEdit, nextBillMonth, this.user.username).subscribe(success =>{
      this.updateButtonClicked = false;
      console.log(success);
      this.globalResources.successAlert("Feeder reading updated successfully");
      this.readingToEdit = undefined;
      this.closeModal(this.closeButtonRef);
    }, error =>{
      this.updateButtonClicked = false;
      console.log(error);
      this.globalResources.errorAlert(error.error.errorMessage);
    });
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
    this.pager = this.paginationService.getPager(this.feederReadings.length, page, this.pageSize);
    this.pagedFeederReadings = this.feederReadings.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedFeederReadings);
  }

  closeModal(closeButtonRef: ElementRef){
    closeButtonRef.nativeElement.click();
  }
}
