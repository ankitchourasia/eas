import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { GlobalConstants } from 'app/utility/global.constants';
import { GlobalResources } from 'app/utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';

@Component({
  selector: 'eas-feeder-absent-reading-view',
  templateUrl: './feeder-absent-reading-view.component.html',
  styleUrls: ['./feeder-absent-reading-view.component.css']
})
export class FeederAbsentReadingViewComponent implements OnInit {

  user : any = {};
  billMonth : string;
  feederAbsentReadings : any;
  pagedFeederAbsentReadings : any = [];
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
  }

  getFeederAbsentReadings(){
    this.loading =true;
    this.billMonth = this.month + '-' + this.year;
    this.feederService.getFeederAbsentReadingsByDivisionId(this.user.division.id, this.billMonth).subscribe(success =>{
      this.loading = false;
      console.log(success);
      this.feederAbsentReadings = success;
      this.initializePaginationVariables();
      this.setPage(1);
    }, error =>{
      this.loading = false;
      console.log(error);
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
    this.pager = this.paginationService.getPager(this.feederAbsentReadings.length, page, this.pageSize);
    this.pagedFeederAbsentReadings = this.feederAbsentReadings.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedFeederAbsentReadings);
  }

}
