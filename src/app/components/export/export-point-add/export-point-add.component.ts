import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { ExportService } from '@eas-services/export-service/export.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-export-point-add',
  templateUrl: './export-point-add.component.html',
  styleUrls: ['./export-point-add.component.css']
})
export class ExportPointAddComponent implements OnInit {

  COMPONENT_NAME: string = "ExportPointAddComponent ";
  user:any;
  formData: any;
  regionList: any;
  circleList: any;
  divisionList: any;
  zoneList: any;
  feederList:any;
  substationList: any;
  _submitClicked: boolean;
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants, 
    private substationService: SubstationService, private feederService : FeederService,
    private exportService: ExportService, private zoneService: ZoneService) { }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.formData = {};
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    this.zoneList = [];
    this.feederList = null;
    this.substationList = null;
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      // this.zoneList = this.user.zoneList;
      this.getZoneListByDivisionId(this.user.division.id);
      this.formData.region = this.user.region;
      this.formData.circle = this.user.circle;
      this.formData.division = this.user.division;
    }else if(this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      this.zoneList.push(this.user.zone);
      this.formData.region = this.user.region;
      this.formData.circle = this.user.circle;
      this.formData.division = this.user.division;
      this.formData.zone = this.user.zone;
      this.getSubstationByZoneId(this.formData.zone.id);
    }
  }

  getZoneListByDivisionId(divisionId){
    this.zoneList = [];
    this.zoneService.getZonesByDivisionId(divisionId, false).subscribe(successResponse =>{
      this.zoneList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  zoneChanged(zone){
    this.substationList = null;
    this.formData.substation = undefined;
    this.feederList = null;
    this.formData.feeder = undefined;
    this.getSubstationByZoneId(zone.id);
  }

  getSubstationByZoneId(zoneId){
    this.substationService.getSubstationsByZoneId(zoneId).subscribe(successResponese =>{
      this.substationList = successResponese;
    }, errorResponse =>{
      console.log(errorResponse);
    });
  }

  substationChanged(substation){
    this.feederList = null;
    this.formData.feeder = undefined;
    this.getFeederBySubstationId(substation.id);  
  }

  getFeederBySubstationId(substationId){
    this.feederService.getFeederBySubstationId(substationId).subscribe(successResponese =>{
      this.feederList = successResponese;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  srDateChanged(){
    this.formData.readingDateInString = this.globalResources.makeDateAsDD_MM_YYYY(this.formData.readingDate);
  }

  submitClicked(exportPointAddForm){
    if(this.globalResources.validateForm(exportPointAddForm)){
      this._submitClicked = true;
      this.formData.regionId = this.formData.region.id;
      this.formData.circleId = this.formData.circle.id;
      this.formData.divisionId = this.formData.division.id;
      this.formData.zoneId = this.formData.zone.id;
      this.formData.substationId = this.formData.substation.id;
      this.formData.feederId = this.formData.feeder.id;
      this.formData.billMonth = this.formData.month + "-" +  this.formData.year;
      this._submitClicked = false;
      this.addExportPoint(exportPointAddForm);
    }
  }

  addExportPoint(exportPointAddForm){
    let methodName = "addExportPoint";
    this._submitClicked = true;
    this.exportService.add11KVExportPoint(this.formData,this.user.username, false).subscribe(
      successResponse =>{
        this._submitClicked = false;
        console.log(successResponse);
        if(successResponse){
          let alertResponse =this.globalResources.successAlert("Export point added successfully");
          alertResponse.then(result =>{
            this.setPartialData();
            this.globalResources.resetValidateForm(exportPointAddForm);
          });
        }
      },errorResponse =>{
        this._submitClicked = false;
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
      });
  }

  resetClicked(exportPointAddForm){
    this.setPartialData();
    this.globalResources.resetValidateForm(exportPointAddForm);
  }

  clearPartialData(){
    this.setPartialData();
  }
}
