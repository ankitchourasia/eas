import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { ZoneService } from '@eas-services/zone/zone.service';

@Component({
  selector: 'eas-zone-view',
  templateUrl: './zone-view.component.html',
  styleUrls: ['./zone-view.component.css']
})
export class ZoneViewComponent implements OnInit {

  COMPONENT_NAME: string = "ZoneViewComponent";
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
    this.setInitialValue();
  }

  setInitialValue(){
    this.zoneToEdit = undefined;
    this.zoneList = [];
    this.pagedZoneList = [];
    this.getZoneList();
  }

  getZoneList(){
    this.loading = true;
    this.zoneList = [];
    this.zoneService.getZones(false).subscribe(successResponse =>{
      this.loading = false;
      this.zoneList = successResponse;
      this.initializePaginationVariables();
      if(this.zoneList && this.zoneList.length){
        this.setPage(1);
      }
    }, errorResponse =>{
      this.loading = false;
      console.log(errorResponse);
    });
  }

  editClicked(circle){
    this.zoneToEdit = Object.assign({}, circle);
    this.zoneToEdit.oldName = circle.name;
  }

  _updateClicked: boolean;
  updateClicked(zoneEditForm, modalCloseButtonRef){
    let methodName = "updateClicked";
    if(!this.globalResources.validateForm(zoneEditForm)){
      return;
    }
    this._updateClicked = true;
    this.zoneService.updateZone(this.zoneToEdit, false).subscribe(successResposne =>{
      this._updateClicked = false;
      let alertResponse = this.globalResources.successAlert("Zone updated successfully");
      alertResponse.then(result =>{
        this.closeModal(zoneEditForm, modalCloseButtonRef);
        this.getZoneList();
      });
    }, errorResponse =>{
      this._updateClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);;
    })
  }

  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 10;
    this.pagedZoneList = [];
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.zoneList.length, page, this.pageSize);
    this.pagedZoneList = this.zoneList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  closeModal(zoneEditForm, modalCloseButtonRef){
    this.globalResources.resetValidateForm(zoneEditForm);
    modalCloseButtonRef.click();
    this._updateClicked = false;
    this.zoneToEdit = undefined;
  }
}