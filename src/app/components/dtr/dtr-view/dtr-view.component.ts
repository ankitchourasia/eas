import { Component, OnInit } from '@angular/core';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { DtrService } from '@eas-services/dtr-service/dtr.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { ZoneService } from '@eas-services/zone/zone.service';

@Component({
  selector: 'eas-dtr-view',
  templateUrl: './dtr-view.component.html',
  styleUrls: ['./dtr-view.component.css']
})
export class DtrViewComponent implements OnInit {

  COMPONENT_NAME: string = "DtrViewComponent";
  user : any;
  dtrList: any;
  dtrToEdit: any;
  zoneList: any;
  feederList: any;
  substationList: any;
  pager: any;
  pageSize: number;
  pagedDtrList : any;
  loading : boolean;
  public readonly ROLE_ADMIN = GlobalConfiguration.ROLE_ADMIN;
  public readonly ROLE_HTM_ADMIN = GlobalConfiguration.ROLE_HTM_ADMIN;
  constructor(private dtrService : DtrService, private feederService : FeederService,  
    private substationService : SubstationService, public globalConstants : GlobalConstants, 
    private globalResources : GlobalResources, private paginationService : PaginationService,
    private zoneService: ZoneService) { }

    ngOnInit() {
      this.user = this.globalResources.getUserDetails();
      this.searchClicked();
    }
  
    searchClicked(){
      if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
      this.getDTRByDivisionId(this.user.division.id);
      }else if(this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
        this.getDTRByZoneId(this.user.zone.id);
      }
    }

  getDTRByDivisionId(divisionId){
    this.loading = true;
    this.dtrList = [];
    this.dtrService.getDTRByDivisionId(divisionId).subscribe(successResponese =>{
      this.loading = false;
      this.dtrList = successResponese;
      this.initializePaginationVariables();
      if(this.dtrList && this.dtrList.length){
        this.setPage(1);
      }
    }, errorResponse =>{
      this.loading = false;
      console.log(errorResponse);
    });
  }

  getDTRByZoneId(zoneId){
    // this.loading = true;
    // this.dtrList = [];
    // this.dtrService.getDTRByZoneId(zoneId).subscribe(successResponese =>{
    //   this.loading = false;
    //   this.dtrList = successResponese;
    //   this.initializePaginationVariables();
    //   if(this.dtrList && this.dtrList.length){
    //     this.setPage(1);
    //   }
    // }, errorResponse =>{
    //   this.loading = false;
    //   console.log(errorResponse);
    // });
  }

  exportClicked(){
    var params = {Authorization: 'Basic ' + sessionStorage.getItem('encodedCredentials')};
    let fileUrl = null;
    if(this.user.role === this.ROLE_ADMIN){
			fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "export/dtr/division/" + this.user.division.id;
		}else{
			fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "export/dtr/zone/" + this.user.zone.id;
		}
    this.globalResources.downloadFile(fileUrl,params)
  }

  _deleteClicked: boolean;
  deleteClicked(dtr){
    let confirmAlertResponse : any = this.globalResources.confirmAlert("Are you sure to delete this dtr ?")
    confirmAlertResponse.then((result) => {
      if(result.value) {
        this.deleteDTR(dtr.id, this.user.username);
      }else{
        console.log("confirm alert else");
      }
    });
  }

  deleteDTR(dtrId, deletedBy){
    let methodName = "deleteDTR";
    this._deleteClicked = true;
    this.dtrService.deleteDTRById(dtrId, deletedBy).subscribe(successResponse => {
      this._deleteClicked = false;
      let alertResponse = this.globalResources.successAlert("DTR deleted successfully");
      alertResponse.then(result =>{
        this.getDTRByDivisionId(this.user.division.id);
      });
    }, errorResponse =>{
      this._deleteClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  _editClicked: boolean;
  editClicked(dtr){
    console.log(dtr);
    this.dtrToEdit = Object.assign({}, dtr);
    this.dtrToEdit.srDate = this.globalResources.getDateFromDatetimestamp(this.dtrToEdit.srDate);
    this.getZoneListByDivisionId(this.dtrToEdit.zone.division.id);
    this.getSubstationByZoneId(this.dtrToEdit.zoneId);
    this.getFeederBySubstationId(this.dtrToEdit.substationId);
    this._editClicked = true;
  }

  getZoneListByDivisionId(divisionId){
    this.zoneList = [];
    this.zoneService.getZonesByDivisionId(divisionId, false).subscribe(successResponse =>{
      this.zoneList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  zoneChanged(){
    this.substationList = null;
    this.dtrToEdit.feederId = undefined;
    this.dtrToEdit.substationId = undefined;
    this.getSubstationByZoneId(this.dtrToEdit.zoneId);
  }

  getSubstationByZoneId(zoneId){
    this.substationList = [];
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(successResponese =>{
      this.substationList = successResponese;
    }, errorResponse =>{
      console.log(errorResponse);
    });
  }

  substationChanged(){
    this.feederList = null;
    this.dtrToEdit.feederId = undefined;
    this.getFeederBySubstationId(this.dtrToEdit.substationId);  
  }

  getFeederBySubstationId(substationId){
    this.feederList = [];
    this.feederService.getFeederBySubstationId(substationId).subscribe(successResponese =>{
      this.feederList = successResponese;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  srDateChanged(){
    this.dtrToEdit.srDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.dtrToEdit.srDate);
  }
  
  _updateClicked: boolean;
  updateClicked(updateDTRForm, modalCloseButtonRef){
    let methodName = "updateClicked";
    if(this.globalResources.validateForm(updateDTRForm)){
      this._updateClicked = true;
      this.dtrService.updateDTR(this.dtrToEdit, this.user.username).subscribe(successResponese =>{
        this._updateClicked = false;
        let alertResponse = this.globalResources.successAlert("DTR updated successfully");
        alertResponse.then(result =>{
          this.closeModal(updateDTRForm, modalCloseButtonRef);
          this._editClicked = false;
          this.getDTRByDivisionId(this.user.division.id);
          this.dtrToEdit = null;
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
    this.pager = this.paginationService.getPager(this.dtrList.length, page, this.pageSize);
    this.pagedDtrList = this.dtrList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  
  closeModal(updateDTRForm, modalCloseButtonRef){
    this.globalResources.resetValidateForm(updateDTRForm);
    modalCloseButtonRef.click();
    this._editClicked = false;
  }

}
