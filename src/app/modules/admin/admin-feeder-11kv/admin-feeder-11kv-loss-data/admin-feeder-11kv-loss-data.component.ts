import { Component, OnInit } from '@angular/core';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalResources } from '@eas-utility/global.resources';

@Component({
  selector: 'eas-admin-feeder-11kv-loss-data',
  templateUrl: './admin-feeder-11kv-loss-data.component.html',
  styleUrls: ['./admin-feeder-11kv-loss-data.component.css']
})
export class AdminFeeder11KVLossDataComponent implements OnInit {

  COMPONENT_NAME = "AdminFeeder11KVLossDataComponent";
  user: any = {};
  billMonth: string;
  feederData: any;
  pagedFeederData: any;
  month: string;
  year: string;
  loading: boolean;
  _updateClicked: boolean;

  pager: any;
  pageSize: number;

  constructor(private feederService: FeederService, public globalConstants: GlobalConstants,
    private globalResources: GlobalResources, private paginationService: PaginationService) { }

    ngOnInit() {
      this.setInitialValues();
      this.user = this.globalResources.getUserDetails();
    }
  
    setInitialValues(){
      this.feederData = [];
      this.pagedFeederData = [];
    } 
  
    searchClicked(){
      this.setInitialValues();
      this.getFeederLossData();
    }
    
    getFeederLossData(){
      let methodName = "getFeederLossData";
      this.feederData = [];
      this.billMonth = this.month + '-' + this.year;
      if(this.user && this.user.division){
        this.loading =true;
        this.feederService.getFeederLossDataByDivisionId(this.user.division.id, this.billMonth).subscribe(successResponse =>{
          this.loading = false;
          this.feederData = successResponse;
          this.initializePaginationVariables();
          if(this.feederData &&  this.feederData.length){
            this.setPage(1);
          }
        }, errorResponse =>{
          this.loading = false;
          this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
        });
      }
    }

  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 10;
    this.pagedFeederData = [];
  }

  setPage(page: number) {
    console.log("inside set page");
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.feederData.length, page, this.pageSize);
    this.pagedFeederData = this.feederData.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
