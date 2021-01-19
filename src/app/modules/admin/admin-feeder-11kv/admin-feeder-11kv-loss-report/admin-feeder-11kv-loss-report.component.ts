import { Component, OnInit } from '@angular/core';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalResources } from '@eas-utility/global.resources';
import { AdminFeeder11KVMenuService } from '../admin-feeder-11kv-menu.service';

@Component({
  selector: 'eas-admin-feeder-11kv-loss-report',
  templateUrl: './admin-feeder-11kv-loss-report.component.html',
  styleUrls: ['./admin-feeder-11kv-loss-report.component.css']
})
export class AdminFeeder11KVLossReportComponent implements OnInit {

  COMPONENT_NAME = "AdminFeeder11KVLossReportComponent";
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
    private globalResources: GlobalResources, private paginationService: PaginationService, private adminFeeder11KVMenuService: AdminFeeder11KVMenuService) { 
      if(!this.adminFeeder11KVMenuService.EIGHTEENTH_MENU.active){
        this.adminFeeder11KVMenuService.menuClicked(this.adminFeeder11KVMenuService.EIGHTEENTH_MENU);
      }
    }

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
      this.getFeederLoss();
    }
    
    getFeederLoss(){
      let methodName = "getFeederLoss";
      this.feederData = [];
      this.billMonth = this.month + '-' + this.year;
      if(this.user && this.user.division){
        this.loading =true;
        this.feederService.getFeederLossByDivisionId(this.user.division.id, this.billMonth).subscribe(successResponse =>{
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

    generateClicked : boolean;
    generateButtonClicked(){
      let methodName = "generateButtonClicked";
      this.billMonth = this.month + '-' + this.year;
      if(this.user && this.user.division){
        this.generateClicked =true;
        this.feederService.generateFeederLossByDivisionId(this.user.division.id, this.billMonth).subscribe(successResponse =>{
          this.generateClicked = false;
          this.getFeederLoss();
        }, errorResponse =>{
          this.generateClicked = false;
          this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
          if(errorResponse.error.status === 417){
            this.getFeederLoss();
          }
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
