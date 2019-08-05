import { Component, OnInit } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { DivisionService } from '@eas-services/division-service/division.service';

@Component({
  selector: 'eas-division-view',
  templateUrl: './division-view.component.html',
  styleUrls: ['./division-view.component.css']
})
export class DivisionViewComponent implements OnInit {

  pager: any ;
  pageSize: number;
  loading : boolean;
  divisionList: any;
  circleList: any;
  regionList: any;
  divisionToEdit: any = {};
  pagedDivisionList: any;
  constructor(private globalResources : GlobalResources, private paginationService : PaginationService,
    private regionService : RegionService, private circleService: CircleService, private divisionService: DivisionService) { }

  ngOnInit() {
    this.getPartialData();
  }

  getPartialData(){
    this.getDivisionList();
  }

  getDivisionList(){
    this.loading = true;
    this.divisionList = null;
    this.divisionService.getDivisions(false).subscribe(successResponse =>{
      this.loading = false;
      this.divisionList = successResponse;
      this.initializePaginationVariables();
      this.setPage(1);
    }, errorResponse =>{
      this.loading = false;
      console.log(errorResponse);
    });
  }

  editClicked(circle){
    this.divisionToEdit = Object.assign({}, circle);
    console.log(this.divisionToEdit);
    this.divisionToEdit.oldName = circle.name;
    this.getRegionList();
  }

  getRegionList(){
    this.regionService.getRegions(false).subscribe(successResponse =>{
      this.regionList = successResponse;
      this.divisionToEdit.region = this.regionList.find(region => region.id === this.divisionToEdit.regionId);
    }, errorResponse =>{
      console.log(errorResponse);
    });
  }

  _updateClicked: boolean;
  updateClicked(updateCircleModalId){
    this._updateClicked = true;
    this.circleService.updateCircle(this.divisionToEdit, false).subscribe(successResposne =>{
      this._updateClicked = false;
      console.log(successResposne);
      // this.globalResources.closeModal(updateCircleModalId);
      let alertResponse = this.globalResources.successAlert("Circle updated successfully");
      alertResponse.then(result =>{
        console.log("alert result", result);
        this.getDivisionList();
      });
    }, errorResponse =>{
      console.log(errorResponse);
      this._updateClicked = false;
      let alertResponse = this.globalResources.errorAlert("Unable to update region.");
      alertResponse.then(result =>{
        console.log("alert result", result);
      });
    })
  }

  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 10;
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.divisionList.length, page, this.pageSize);
    this.pagedDivisionList = this.divisionList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  

  openModal(){
    // this.display = 'block';
  }

  closeModal(){
    // this.display = 'none';
  }
}