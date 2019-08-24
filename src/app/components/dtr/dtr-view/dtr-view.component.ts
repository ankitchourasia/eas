import { Component, OnInit } from '@angular/core';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { GlobalResources } from 'app/utility/global.resources';
import { GlobalConstants } from 'app/utility/global.constants';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { DtrService } from '@eas-services/dtr-service/dtr.service';
import { GlobalConfiguration } from 'app/utility/global-configuration';

@Component({
  selector: 'eas-dtr-view',
  templateUrl: './dtr-view.component.html',
  styleUrls: ['./dtr-view.component.css']
})
export class DtrViewComponent implements OnInit {

  user : any;
  dtrList: any;
  dtrToEdit: any;
  feederList: any;
  substationList: any;
  pager: any;
  pageSize: number;
  pagedDtrList : any;
  loading : boolean;
  
  constructor(private dtrService : DtrService, private feederService : FeederService,  private substationService : SubstationService, 
    public globalConstants : GlobalConstants, private globalResources : GlobalResources, private paginationService : PaginationService) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
    this.getDTRByDivisionId(this.user.division.id);
  }

  getDTRByDivisionId(divisionId){
    this.loading = true;
    this.dtrList = [];
    this.dtrService.getDTRByDivisionId(divisionId).subscribe(successResponese =>{
      this.loading = false;
      this.dtrList = successResponese;
      console.log(this.dtrList);
      this.initializePaginationVariables();
      this.setPage(1);
    }, errorResponse =>{
      this.loading = false;
      console.log(errorResponse);
    });
  }

  exportClicked(){
    var params = {Authorization: 'Basic ' + sessionStorage.getItem('encodedCredentials')};
    let fileUrl = null;
    if(this.user.role === 'admin'){
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
    this._deleteClicked = true;
    this.dtrService.deleteDTRById(dtrId, deletedBy).subscribe(successResponse => {
      this._deleteClicked = false;
      let alertResponse = this.globalResources.successAlert("dtr deleted successfully");
      alertResponse.then(result =>{
        this.getDTRByDivisionId(this.user.division.id);
      });
    }, errorResponse =>{
      console.log(errorResponse);
      this._deleteClicked = false;
      this.globalResources.errorAlert(errorResponse.error.errorMessage);
    });
  }

  _editClicked: boolean;
  editClicked(dtr){
    this.dtrToEdit = Object.assign({}, dtr);
    this.dtrToEdit.srDate = this.globalResources.getDateFromDatetimestamp(this.dtrToEdit.srDate);
    this.getSubstationByZoneId(this.dtrToEdit.zoneId);
    this.getFeederBySubstationId(this.dtrToEdit.substationId);
    this._editClicked = true;
  }

  zoneChanged(){
    this.substationList = null;
    this.dtrToEdit.feederId = undefined;
    this.dtrToEdit.substationId = undefined;
    this.getSubstationByZoneId(this.dtrToEdit.zoneId);
  }

  getSubstationByZoneId(zoneId){
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
    if(this.globalResources.validateForm(updateDTRForm)){
      this._updateClicked = true;
      this.dtrService.updateDTR(this.dtrToEdit, this.user.username).subscribe(successResponese =>{
        this._updateClicked = false;
        let alertResponse = this.globalResources.successAlert("DTR updated successfully");
        alertResponse.then(result =>{
          console.log("alert result", result);
          this.closeModal(modalCloseButtonRef);
          this._editClicked = false;
          this.getDTRByDivisionId(this.user.division.id);
          this.dtrToEdit = null;
        });
      }, errorResponse =>{
        console.log(errorResponse);
        this._updateClicked = false;
        let alertResponse = this.globalResources.errorAlert(errorResponse.error.errorMessage);
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
    this.pager = this.paginationService.getPager(this.dtrList.length, page, this.pageSize);
    this.pagedDtrList = this.dtrList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  
  closeModal(modalCloseButtonRef){
    modalCloseButtonRef.click();
  }

  dtrUpdateModalCancel(dtrUpdateForm){
    this._editClicked = false;
    this.globalResources.resetValidateForm(dtrUpdateForm);
  }

}
