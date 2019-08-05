import { Component, OnInit } from '@angular/core';
import { RegionService } from '@eas-services/region-service/region.service';
import { GlobalResources } from 'app/utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';

@Component({
  selector: 'eas-region-view',
  templateUrl: './region-view.component.html',
  styleUrls: ['./region-view.component.css']
})
export class RegionViewComponent implements OnInit {

  user: any;
  pager: any ;
  pageSize: number;
  loading : boolean;
  regionList: any;
  regionToEdit: any = {};
  pagedRegionList: any;
  display: any = 'none';
  constructor(private regionService : RegionService, private globalResources : GlobalResources, private paginationService : PaginationService) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
    this.getRegionList();
  }

  getRegionList(){
    this.loading = true;
    this.regionService.getRegions(false).subscribe(successResponse =>{
      this.loading = false;
      this.regionList = successResponse;
      console.log(successResponse);
      this.initializePaginationVariables();
      this.setPage(1);
    }, errorResponse =>{
      this.loading = false;
      console.log(errorResponse);
    });
  }

  editClicked(region){
    this.regionToEdit = Object.assign({}, region);
    this.regionToEdit.oldName = region.name;
    this.openModal();
  }

  _updateClicked: boolean;
  updateregion(updateregionForm){
    if(this.globalResources.validateForm(updateregionForm)){
      this._updateClicked = true;
      this.regionService.updateRegion(this.regionToEdit, false).subscribe(successResposne =>{
        this._updateClicked = false;
        this.closeModal();
        let alertResponse = this.globalResources.successAlert("region updated successfully");
        alertResponse.then(result =>{
          console.log("alert result", result);
          this.getRegionList();
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
  

  openModal(){
    this.display = 'block';
  }

  closeModal(){
    this.display = 'none';
  }
}