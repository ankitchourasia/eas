import { Component, OnInit } from '@angular/core';
import { SubstationService } from '@eas-services/substation/substation.service';
import { GlobalResources } from '@eas-utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { ZoneService } from '@eas-services/zone/zone.service';

@Component({
  selector: 'eas-substation-view',
  templateUrl: './substation-view.component.html',
  styleUrls: ['./substation-view.component.css']
})
export class SubstationViewComponent implements OnInit {

  COMPONENT_NAME: "SubstationViewComponent";
  user : any;
  zoneList: any;
  substationList : any;
  substationToEdit : any;
  pagedSubstationList : any;

  pager: any ;
  pageSize: number;
  loading : boolean;
  constructor(private substationService : SubstationService, private globalResources : GlobalResources,
    private paginationService : PaginationService, private zoneService: ZoneService) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
    this.getSubstations();
  }

  getSubstations(){
    let methodName = "getSubstations"
    this.loading = true;
    this.substationList = [];
    this.substationService.getSubstationByDivisionId(this.user.division.id).subscribe(successResponse =>{
      this.loading = false;
      this.substationList = successResponse;
      this.initializePaginationVariables();
      this.setPage(1);
    }, errorResponse =>{
      this.loading = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  editClicked(substation){
    this.substationToEdit = Object.assign({}, substation);
    this.getZoneListByDivisionId(this.substationToEdit.zone.division.id);
  }

  getZoneListByDivisionId(divisionId){
    this.zoneList = [];
    this.zoneService.getZonesByDivisionId(divisionId, false).subscribe(successResponse =>{
      this.zoneList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  _deleteClicked: boolean;
  deleteClicked(substation){
    let confirmAlertResponse : any = this.globalResources.confirmAlert("Are you sure to delete this substation ?")
    confirmAlertResponse.then((result) => {
      if(result.value) {
        this.deleteSubstation(substation.id, this.user.username);
      }else{
        console.log("confirm alert else");
      }
    });
  }

  deleteSubstation(substationId, deletedBy){
    this._deleteClicked = true;
    this.substationService.deleteSubstationById(substationId, deletedBy).subscribe(success => {
      this._deleteClicked = false;
      let alertResponse = this.globalResources.successAlert("Substation deleted successfully");
      alertResponse.then(result =>{
        this.getSubstations();
      });
    }, error =>{
      console.log(error);
      this._deleteClicked = false;
    });
  }

  _updateClicked: boolean;
  updateSubstation(updateSubstationForm, modalCloseButtonRef){
    if(this.globalResources.validateForm(updateSubstationForm)){
      this._updateClicked = true;
      this.substationService.updateSubstation(this.substationToEdit, this.user.username).subscribe(success =>{
        this._updateClicked = false;
        let alertResponse = this.globalResources.successAlert("Substation updated successfully");
        alertResponse.then(result =>{
          console.log("alert result", result);
          this.closeModal(modalCloseButtonRef);
          this.getSubstations();
        });
      }, error =>{
        console.log(error);
        this._updateClicked = false;
        let alertResponse = this.globalResources.errorAlert("Unable to update substation.");
        alertResponse.then(result =>{
          console.log("alert result", result);
        });
      })
    }
  }

  initiatePager(totalCount, pageNo, pageSize){
    this.pager = this.paginationService.getPager(totalCount, pageNo, pageSize);
  }

  
  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 10;
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.substationList.length, page, this.pageSize);
    this.pagedSubstationList = this.substationList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  
  closeModal(modalCloseButtonRef){
    modalCloseButtonRef.click();
  }

  
  exportClicked(){
    var params = {Authorization: 'Basic ' + sessionStorage.getItem('encodedCredentials')};
    let fileUrl = null;
    if(this.user.role === 'admin'){
			fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "export/substation/division/" + this.user.division.id;
		}else{
			fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "export/substation/zone/" + this.user.zone.id;
    }
    this.globalResources.downloadFile(fileUrl, params);
  }

}
