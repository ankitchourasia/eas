import { Component, OnInit } from '@angular/core';
import { GlobalResources } from 'app/utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { ZoneService } from '@eas-services/zone/zone.service';

@Component({
  selector: 'eas-zone-view',
  templateUrl: './zone-view.component.html',
  styleUrls: ['./zone-view.component.css']
})
export class ZoneViewComponent implements OnInit {

  pager: any ;
  pageSize: number;
  loading : boolean;
  zoneList: any;
  circleList: any;
  regionList: any;
  zoneToEdit: any = {};
  pagedZoneList: any;
  constructor(private globalResources : GlobalResources, private paginationService : PaginationService,
    private zoneService: ZoneService) { }

  ngOnInit() {
    this.getPartialData();
  }

  getPartialData(){
    this.getZoneList();
  }

  getZoneList(){
    this.loading = true;
    this.zoneList = null;
    this.zoneService.getZones(false).subscribe(successResponse =>{
      this.loading = false;
      this.zoneList = successResponse;
      console.log(successResponse);
      this.initializePaginationVariables();
      this.setPage(1);
    }, errorResponse =>{
      this.loading = false;
      console.log(errorResponse);
    });
  }

  editClicked(circle){
    this.zoneToEdit = Object.assign({}, circle);
    console.log(this.zoneToEdit);
    this.zoneToEdit.oldName = circle.name;
  }

  _updateClicked: boolean;
  updateClicked(modalCloseButtonRef){
    this._updateClicked = true;
    this.zoneService.updateZone(this.zoneToEdit, false).subscribe(successResposne =>{
      this._updateClicked = false;
      console.log(successResposne);
      let alertResponse = this.globalResources.successAlert("Zone updated successfully");
      alertResponse.then(result =>{
        this.closeModal(modalCloseButtonRef);
        this.getZoneList();
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
    this.pager = this.paginationService.getPager(this.zoneList.length, page, this.pageSize);
    this.pagedZoneList = this.zoneList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  closeModal(modalCloseButtonRef){
    modalCloseButtonRef.click();
  }
}