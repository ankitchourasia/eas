import { Component, OnInit } from '@angular/core';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { DtrService } from '@eas-services/dtr-service/dtr.service';
import { GlobalResources } from '@eas-utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConstants } from '@eas-utility/global.constants';

@Component({
  selector: 'eas-feeder-33kv-view',
  templateUrl: './feeder-33kv-view.component.html',
  styleUrls: ['./feeder-33kv-view.component.css']
})
export class Feeder33KVViewComponent implements OnInit {

  COMPONENT_NAME: "Feeder33KVViewComponent";
  user : any;
  zoneList: any;
  feederToEdit: any;
  feederList: any;
  pager: any;
  pageSize: number;
  pagedFeederList : any;
  loading : boolean;
  public readonly ROLE_ADMIN = GlobalConfiguration.ROLE_ADMIN;
  public readonly ROLE_HTM_ADMIN = GlobalConfiguration.ROLE_HTM_ADMIN;
  constructor(private feederService : FeederService, private globalResources : GlobalResources, 
    private paginationService : PaginationService, private zoneService: ZoneService, 
    public globalConstants: GlobalConstants) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
    this.getFeeders();
  }

  getFeeders(){
    let methodName = "getFeeders";
    this.feederList = [];
    if(this.user && this.user.division){
      this.loading = true;
      this.feederService.get33KVFeederByDivisionId(this.user.division.id, false).subscribe(successResponese =>{
        this.loading = false;
        this.feederList = successResponese;
        this.initializePaginationVariables();
        if(this.feederList && this.feederList.length){
          this.setPage(1);
        }
      }, errorResponse =>{
        this.loading = false;
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
      });
    }
  }

  exportClicked(){
    var params = {Authorization: 'Basic ' + sessionStorage.getItem('encodedCredentials')};
    let fileUrl = null;
    if(this.user.role === this.ROLE_ADMIN){
			fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "export/feeder/division/" + this.user.division.id;
		}else{
			fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "export/feeder/zone/" + this.user.zone.id;
		}
    this.globalResources.downloadFile(fileUrl, params)
  }

  deleteButtonClicked: boolean;
  deleteClicked(feeder){
    let confirmAlertResponse : any = this.globalResources.confirmAlert("Are you sure to delete this feeder ?")
    confirmAlertResponse.then((result) => {
      if(result.value) {
        this.deleteFeeder(feeder.id, this.user.username);
      }else{
        console.log("confirm alert else");
      }
    });
  }

  deleteFeeder(feederId, deletedBy){
    let methodName = "deleteFeeder";
    this.deleteButtonClicked = true;
    this.feederService.deleteFeederById(feederId, deletedBy).subscribe(success => {
      this.deleteButtonClicked = false;
      let alertResponse = this.globalResources.successAlert("feeder deleted successfully");
      alertResponse.then(result =>{
        this.getFeeders();
      });
    }, error =>{
      this.deleteButtonClicked = false;
      this.globalResources.handleError(error, this.COMPONENT_NAME, methodName);
    });
  }

  
  editButtonClicked(feeder){
    this.feederToEdit = Object.assign({}, feeder);
    this.getZoneListByDivisionId(this.feederToEdit.zone.division.id);
  }

  getZoneListByDivisionId(divisionId){
    this.zoneList = [];
    this.zoneService.getZonesByDivisionId(divisionId, false).subscribe(successResponse =>{
      this.zoneList = <any>successResponse;
      this.get33KVFeedersByZoneId(this.feederToEdit.zone.id);
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  zoneChanged(){
    this.feederList = null;
    this.feederToEdit.id = undefined;
    this.get33KVFeedersByZoneId(this.feederToEdit.zoneId);
  }

  get33KVFeedersByZoneId(zoneId){
    this.feederList = [];
    this.feederService.get33KVFeederByZoneId(zoneId, false).subscribe(successResponese =>{
      this.feederList = <any>successResponese;
    }, errorResponse =>{
      console.log(errorResponse);
    });
  }

  feederChanged(){
  console.log("feederChanged");
  }
  
  _updateClicked: boolean;
  updateClicked(updateFeederForm, modalCloseButtonRef){
    let methodName = "updateClicked";
    if(this.globalResources.validateForm(updateFeederForm)){
      this._updateClicked = true;
      this.feederService.update33KVFeeder(this.feederToEdit, this.user.username).subscribe(successResponese =>{
        this._updateClicked = false;
        let alertResponse = this.globalResources.successAlert("Feeder updated successfully");
        alertResponse.then(result =>{
          console.log("alert result", result);
          this.closeModal(modalCloseButtonRef);
          this.getFeeders();
          this.feederToEdit = null;
        });
      }, errorResponse =>{
        this._updateClicked = false;
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
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
    this.pager = this.paginationService.getPager(this.feederList.length, page, this.pageSize);
    this.pagedFeederList = this.feederList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedFeederList);
  }
  
  closeModal(modalCloseButtonRef){
    modalCloseButtonRef.click();
  }
}
