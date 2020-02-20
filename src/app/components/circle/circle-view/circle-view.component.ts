import { Component, OnInit, ElementRef } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { CircleService } from '@eas-services/circle-service/circle.service';

@Component({
  selector: 'eas-circle-view',
  templateUrl: './circle-view.component.html',
  styleUrls: ['./circle-view.component.css']
})
export class CircleViewComponent implements OnInit {

  COMPONENT_NAME: string = "CircleViewComponent";
  // user: any;
  pager: any ;
  pageSize: number;
  loading : boolean;
  circleList: any;
  regionList: any;
  circleToEdit: any = {};
  pagedCircleList: any;
  constructor(private globalResources : GlobalResources, private paginationService : PaginationService,
    private circleService: CircleService) { }

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
      this.initializePaginationVariables();
      if(this.circleList && this.circleList.length){
        this.setPage(1);
      }
    }, errorResponse =>{
      this.loading = false;
      console.log(errorResponse);
    });
  }

  editClicked(circle){
    this.circleToEdit = Object.assign({}, circle);
    console.log(this.circleToEdit);
    this.circleToEdit.oldName = circle.name;
  }

  _updateClicked: boolean;
  updateClicked(modalCloseButtonRef){
    let methodName = "updateClicked"
    this._updateClicked = true;
    this.circleService.updateCircle(this.circleToEdit, false).subscribe(successResposne =>{
      this._updateClicked = false;
      let alertResponse = this.globalResources.successAlert("Circle updated successfully");
      alertResponse.then(result =>{
        this.closeModal(modalCloseButtonRef);
        this.getCircleList();
      });
    }, errorResponse =>{
      this._updateClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);;
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

  closeModal(modalCloseButtonRef){
    modalCloseButtonRef.click();
  }
}