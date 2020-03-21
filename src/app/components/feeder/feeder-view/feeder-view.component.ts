import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { ZoneService } from '@eas-services/zone/zone.service';

@Component({
  selector: 'eas-feeder-view',
  templateUrl: './feeder-view.component.html',
  styleUrls: ['./feeder-view.component.css']
})
export class FeederViewComponent implements OnInit {

  COMPONENT_NAME: "FeederViewComponent";
  user : any;
  zoneList: any;
  feederList : any;
  feederToEdit: any;
  substationList: any;
  pager: any;
  pageSize: number;
  pagedFeederList : any;
  loading : boolean;
  _deleteClicked: boolean;
  public readonly ROLE_ADMIN = GlobalConfiguration.ROLE_ADMIN;
  public readonly ROLE_HTM_ADMIN = GlobalConfiguration.ROLE_HTM_ADMIN;
  constructor(private feederService : FeederService,  private substationService : SubstationService, 
    private globalResources : GlobalResources, private paginationService : PaginationService, 
    private zoneService: ZoneService) { }

  ngOnInit() {
    this.setInitialValue();
    this.user = this.globalResources.getUserDetails();
    this.getFeeders();
  }

  setInitialValue(){
    this.feederToEdit = undefined;
    this.zoneList = [];
    this.feederList = [];
    this.substationList = [];
    this.pagedFeederList = [];
  }

  getFeeders(){
    let methodName = "getFeeders";
    this.feederList = [];
    if(this.user && this.user.division){
      this.loading = true;
      this.feederService.getFeederByDivisionId(this.user.division.id).subscribe(successResponese =>{
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
    let fileUrl = undefined;
    if(this.user.role === this.ROLE_ADMIN){
			fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "export/feeder/division/" + this.user.division.id;
		}else{
			fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "export/feeder/zone/" + this.user.zone.id;
		}
    this.globalResources.downloadFile(fileUrl, params)
  }

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
    this._deleteClicked = true;
    this.feederService.deleteFeederById(feederId, deletedBy).subscribe(success => {
      this._deleteClicked = false;
      let alertResponse = this.globalResources.successAlert("feeder deleted successfully");
      alertResponse.then(result =>{
        this.getFeeders();
      });
    }, error =>{
      this._deleteClicked = false;
      this.globalResources.handleError(error, this.COMPONENT_NAME, methodName);
    });
  }

  
  editButtonClicked(feeder){
    this.feederToEdit = Object.assign({}, feeder);
    this.getZoneListByDivisionId(this.feederToEdit.zone.division.id);
    this.getSubstationByZoneId(this.feederToEdit.zoneId);
  }

  getZoneListByDivisionId(divisionId){
    if(this.zoneList && this.zoneList.length > 0){
      return;
    }
    this.zoneList = [];
    this.zoneService.getZonesByDivisionId(divisionId, false).subscribe(successResponse =>{
      this.zoneList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  zoneChanged(){
    console.log("zoneChanged");
    this.substationList = undefined;
    this.feederToEdit.substationId = undefined;
    this.getSubstationByZoneId(this.feederToEdit.zoneId);
  }

  getSubstationByZoneId(zoneId){
    this.substationList = [];
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(successResponese =>{
      this.substationList = successResponese;
    }, errorResponse =>{
      console.log(errorResponse);
    });
  }
  
  _updateClicked: boolean;
  updateClicked(updateFeederForm, modalCloseButtonRef){
    let methodName = "updateClicked";
    if(this.globalResources.validateForm(updateFeederForm)){
      this._updateClicked = true;
      this.feederService.updateFeeder(this.feederToEdit, this.user.username).subscribe(successResponese =>{
        this._updateClicked = false;
        let alertResponse = this.globalResources.successAlert("Feeder updated successfully");
        alertResponse.then(result =>{
          this.closeModal(updateFeederForm, modalCloseButtonRef);
          this.getFeeders();
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
    this.pagedFeederList = [];
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.feederList.length, page, this.pageSize);
    this.pagedFeederList = this.feederList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  
  closeModal(updateFeederForm, modalCloseButtonRef){
    this.globalResources.resetValidateForm(updateFeederForm);
    modalCloseButtonRef.click();
    this._updateClicked = false;
    this.feederToEdit = undefined;
  }
}
