import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { DtrService } from '@eas-services/dtr-service/dtr.service';
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
  public readonly ROLE_ADMIN = GlobalConfiguration.ROLE_ADMIN;
  public readonly ROLE_HTM_ADMIN = GlobalConfiguration.ROLE_HTM_ADMIN;
  constructor(private feederService : FeederService,  private substationService : SubstationService, 
    private dtrService : DtrService, private globalResources : GlobalResources, 
    private paginationService : PaginationService, private zoneService: ZoneService) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
    this.getFeeders();
  }

  getFeeders(){
    let methodName = "getFeeders";
    this.loading = true;
    this.feederList = [];
    this.feederService.getFeederByDivisionId(this.user.division.id).subscribe(successResponese =>{
      this.loading = false;
      this.feederList = successResponese;
      this.initializePaginationVariables();
      this.setPage(1);
    }, errorResponse =>{
      this.loading = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
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
    this.deleteButtonClicked = true;
    this.feederService.deleteFeederById(feederId, deletedBy).subscribe(success => {
      this.deleteButtonClicked = false;
      let alertResponse = this.globalResources.successAlert("feeder deleted successfully");
      alertResponse.then(result =>{
        this.getFeeders();
      });
    }, error =>{
      console.log(error);
      this.deleteButtonClicked = false;
    });
  }

  
  editButtonClicked(feeder){
    this.feederToEdit = Object.assign({}, feeder);
    console.log(this.feederToEdit);
    this.getZoneListByDivisionId(this.feederToEdit.zone.division.id);
    this.getSubstationByZoneId(this.feederToEdit.zoneId);
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
    console.log("zoneChanged");
    this.substationList = null;
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
    if(this.globalResources.validateForm(updateFeederForm)){
      this._updateClicked = true;
      this.feederService.updateFeeder(this.feederToEdit, this.user.username).subscribe(successResponese =>{
        this._updateClicked = false;
        let alertResponse = this.globalResources.successAlert("Feeder updated successfully");
        alertResponse.then(result =>{
          console.log("alert result", result);
          this.closeModal(modalCloseButtonRef);
          this.getFeeders();
          this.feederToEdit = null;
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
    this.pager = this.paginationService.getPager(this.feederList.length, page, this.pageSize);
    this.pagedFeederList = this.feederList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  
  closeModal(modalCloseButtonRef){
    modalCloseButtonRef.click();
  }
}
