import { Component, OnInit } from '@angular/core';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalResources } from '@eas-utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';

@Component({
  selector: 'eas-feeder-absent-reading-view',
  templateUrl: './feeder-absent-reading-view.component.html',
  styleUrls: ['./feeder-absent-reading-view.component.css']
})
export class FeederAbsentReadingViewComponent implements OnInit {

  COMPONENT_NAME = "FeederAbsentReadingViewComponent";
  user : any = {};
  billMonth : string;
  feederAbsentReadingList : any;
  pagedFeederAbsentReadingList : any;
  month : string;
  year : string;
  loading : boolean;
  readingToEdit : any;
  updateButtonClicked : boolean;

  pager: any;
  pageSize: number;
  
  constructor(private feederService : FeederService, public globalConstants : GlobalConstants,
    private globalResources : GlobalResources, private paginationService : PaginationService) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
  }

  getFeederAbsentReadings(){
    let methodName = "getFeederAbsentReadings"
    this.loading =true;
    this.feederAbsentReadingList = [];
    this.billMonth = this.month + '-' + this.year;
    this.feederService.getFeederAbsentReadingsByDivisionId(this.user.division.id, this.billMonth).subscribe(successResponse =>{
      this.loading = false;
      console.log(successResponse);
      this.feederAbsentReadingList = successResponse;
      this.initializePaginationVariables();
      this.setPage(1);
    }, errorResponse =>{
      this.loading = false;
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
    this.pager = this.paginationService.getPager(this.feederAbsentReadingList.length, page, this.pageSize);
    this.pagedFeederAbsentReadingList = this.feederAbsentReadingList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedFeederAbsentReadingList);
  }

}
