import { Component, OnInit } from '@angular/core';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { FeederService } from '@eas-services/feeder/feeder.service';
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
  zone: any;
  zoneList: any;
  feederToEdit: any;
  feederList: any;
  pager: any;
  pageSize: number;
  pagedFeederList : any;
  loading : boolean;
  
  constructor(private feederService : FeederService, private globalResources : GlobalResources, 
    private paginationService : PaginationService, private zoneService: ZoneService, 
    public globalConstants: GlobalConstants) { }

  ngOnInit() {
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
      this.zone = "ALL";
      this.getZoneListByDivisionId(this.user.division.id);
      this.getFeederByDivisionId(this.user.division.id);
    }else if(this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
      this.zoneList.push(this.user.zone);
      this.getFeederByZoneId(this.user.zone.id);
    }
  }

  zoneChanged(){
    this.pagedFeederList = [];
    if(this.zone === "ALL"){
      this.getFeederByDivisionId(this.user.division.id);
    }else{
      this.getFeederByZoneId(this.zone.id);
    }
  }

    
  getZoneListByDivisionId(divisionId){
    this.zoneList = [];
    this.zoneService.getZonesByDivisionId(divisionId, false).subscribe(successResponse =>{
      this.zoneList = <any>successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  getFeederByDivisionId(divisionId){
    let methodName = "getFeederByDivisionId";
    this.feederList = [];
    if(this.user && this.user.division){
      this.loading = true;
      this.feederService.get33KVFeederByDivisionId(divisionId, false).subscribe(successResponese =>{
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

  getFeederByZoneId(zoneId){
    let methodName = "getFeederByZoneId";
    this.feederList = [];
    if(this.user && this.user.division){
      this.loading = true;
      this.feederService.get33KVFeederByZoneId(zoneId, false).subscribe(successResponese =>{
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
    if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
			fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "export/feeder-33kv/division/" + this.user.division.id;
		}else{
			fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "export/feeder-33kv/zone/" + this.user.zone.id;
		}
    this.globalResources.downloadFile(fileUrl, params)
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
