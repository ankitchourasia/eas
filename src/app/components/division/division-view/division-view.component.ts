import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { DivisionService } from '@eas-services/division-service/division.service';

@Component({
  selector: 'eas-division-view',
  templateUrl: './division-view.component.html',
  styleUrls: ['./division-view.component.css']
})
export class DivisionViewComponent implements OnInit {
  
  COMPONENT_NAME: string = "DivisionViewComponent";
  pager: any ;
  pageSize: number;
  loading : boolean;
  divisionList: any;
  circleList: any;
  regionList: any;
  divisionToEdit: any;
  pagedDivisionList: any;
  constructor(private globalResources : GlobalResources, private paginationService : PaginationService,
    private divisionService: DivisionService) { }

  ngOnInit() {
    this.setInitialValue();
  }

  setInitialValue(){
    this.divisionToEdit = undefined;
    this.divisionList = [];
    this.pagedDivisionList = [];
    this.getDivisionList();
  }

  getDivisionList(){
    this.loading = true;
    this.divisionList = null;
    this.divisionService.getDivisions(false).subscribe(successResponse =>{
      this.loading = false;
      this.divisionList = successResponse;
      this.initializePaginationVariables();
      if(this.divisionList && this.divisionList.length){
        this.setPage(1);
      }
    }, errorResponse =>{
      this.loading = false;
      console.log(errorResponse);
    });
  }

  editClicked(circle){
    this.divisionToEdit = Object.assign({}, circle);
    this.divisionToEdit.oldName = circle.name;
  }

  _updateClicked: boolean;
  updateClicked(divisionEditForm, modalCloseButtonRef){
    let methodName = "updateClicked";
    
    if(!this.globalResources.validateForm(divisionEditForm)){
      return;
    }

    this._updateClicked = true;
    this.divisionService.updateDivision(this.divisionToEdit, false).subscribe(successResposne =>{
      this._updateClicked = false;
      let alertResponse = this.globalResources.successAlert("Division updated successfully");
      alertResponse.then(result =>{
        this.closeModal(divisionEditForm, modalCloseButtonRef);
        this.getDivisionList();
      });
    }, errorResponse =>{
      this._updateClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);;
    })
  }

  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 10;
    this.pagedDivisionList = [];
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.divisionList.length, page, this.pageSize);
    this.pagedDivisionList = this.divisionList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  
  closeModal(divisionEditForm, modalCloseButtonRef){
    this.globalResources.resetValidateForm(divisionEditForm);
    modalCloseButtonRef.click();
    this._updateClicked = false;
    this.divisionToEdit = undefined;
  }
}