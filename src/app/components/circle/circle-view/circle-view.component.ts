import { Component, OnInit } from '@angular/core';
import { RegionService } from '@eas-services/region-service/region.service';
import { GlobalResources } from 'app/utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { CircleService } from '@eas-services/circle-service/circle.service';

@Component({
  selector: 'eas-circle-view',
  templateUrl: './circle-view.component.html',
  styleUrls: ['./circle-view.component.css']
})
export class CircleViewComponent implements OnInit {

  // user: any;
  pager: any ;
  pageSize: number;
  loading : boolean;
  circleList: any;
  regionList: any;
  circleToEdit: any = {};
  pagedCircleList: any;
  constructor(private globalResources : GlobalResources, private paginationService : PaginationService,
    private regionService : RegionService, private circleService: CircleService) { }

  ngOnInit() {
    this.getPartialData();
  }

  getPartialData(){
    this.getCircleList();
  }

  getCircleList(){
    this.loading = true;
    this.circleList;
    this.circleService.getCircles(false).subscribe(successResponse =>{
      this.loading = false;
      this.circleList = successResponse;
      console.log(successResponse);
      this.initializePaginationVariables();
      this.setPage(1);
    }, errorResponse =>{
      this.loading = false;
      console.log(errorResponse);
    });
  }

  editClicked(circle){
    this.circleToEdit = Object.assign({}, circle);
    console.log(this.circleToEdit);
    this.circleToEdit.oldName = circle.name;
    this.getRegionList();
  }

  getRegionList(){
    this.regionService.getRegions(false).subscribe(successResponse =>{
      this.regionList = successResponse;
      this.circleToEdit.region = this.regionList.find(region => region.id === this.circleToEdit.regionId);
    }, errorResponse =>{
      console.log(errorResponse);
    });
  }

  _updateClicked: boolean;
  updateClicked(updateCircleModalId){
    this._updateClicked = true;
    this.circleService.updateCircle(this.circleToEdit, false).subscribe(successResposne =>{
      this._updateClicked = false;
      console.log(successResposne);
      // this.globalResources.closeModal(updateCircleModalId);
      let alertResponse = this.globalResources.successAlert("Circle updated successfully");
      alertResponse.then(result =>{
        console.log("alert result", result);
        this.getCircleList();
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
    this.pager = this.paginationService.getPager(this.circleList.length, page, this.pageSize);
    this.pagedCircleList = this.circleList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  

  openModal(){
    // this.display = 'block';
  }

  closeModal(){
    // this.display = 'none';
  }
}