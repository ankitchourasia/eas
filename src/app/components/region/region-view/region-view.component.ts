import { Component, OnInit } from '@angular/core';
import { RegionService } from '@eas-services/region-service/region.service';
import { GlobalResources } from '@eas-utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';

@Component({
  selector: 'eas-region-view',
  templateUrl: './region-view.component.html',
  styleUrls: ['./region-view.component.css']
})
export class RegionViewComponent implements OnInit {

  COMPONENT_NAME: string = "RegionViewComponent";
  user: any;
  pager: any ;
  pageSize: number;
  loading : boolean;
  regionList: any;
  regionToEdit: any = {};
  pagedRegionList: any;
  constructor(private regionService : RegionService, private globalResources : GlobalResources,
    private paginationService : PaginationService) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
    this.getRegionList();
  }

  getRegionList(){
    this.loading = true;
    this.regionService.getRegions(false).subscribe(successResponse =>{
      this.loading = false;
      this.regionList = successResponse;
      this.initializePaginationVariables();
      if(this.regionList && this.regionList.length){
        this.setPage(1);
      }
    }, errorResponse =>{
      this.loading = false;
      console.log(errorResponse);
    });
  }

  editClicked(region){
    this.regionToEdit = Object.assign({}, region);
    this.regionToEdit.oldName = region.name;
  }

  _updateClicked: boolean;
  updateClicked(updateRegionForm, modalCloseButtonRef){
    let methodName = "updateClicked";
    this._updateClicked = true;
      this.regionService.updateRegion(this.regionToEdit, false).subscribe(successResposne =>{
        this._updateClicked = false;
        let alertResponse = this.globalResources.successAlert("Region updated successfully");
        alertResponse.then(result =>{
          this.closeModal(updateRegionForm, modalCloseButtonRef);
          this.getRegionList();
        });
      }, errorResponse =>{
        this._updateClicked = false;
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
        
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
    this.pager = this.paginationService.getPager(this.regionList.length, page, this.pageSize);
    this.pagedRegionList = this.regionList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  closeModal(updateRegionForm, modalCloseButtonRef){
    this.globalResources.resetValidateForm(updateRegionForm);
    modalCloseButtonRef.click();
  }
}