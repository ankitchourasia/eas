import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { DivisionService } from '@eas-services/division-service/division.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { ReportService } from '@eas-services/report-service/report.service';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-report-d1',
  templateUrl: './report-d1.component.html',
  styleUrls: ['./report-d1.component.css']
})
export class ReportD1Component implements OnInit {

  searchFormData: any;
  regionList: any;
  circleList: any;
  divisionList: any;
  zoneList: any;
  user: any;
  pager: any;
  pageSize: number;
  searchResultList: any;
  pagedSearchResultList: any;
  _searchClicked: boolean;
  _generateClicked: boolean;
  viewResultList: any;
  reportGenerated: boolean;
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private paginationService: PaginationService, private regionService: RegionService, 
    private circleService: CircleService, private divisionService: DivisionService,
    private zoneService: ZoneService, private reportService: ReportService) { }

  ngOnInit() {
    this.searchFormData = {};
    this.setPartialData()
  }

  setPartialData(){
    this.zoneList = [];
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.getRegionList();
    }else if(this.user.role === GlobalConfiguration.ROLE_ADMIN){
      // this.zoneList = (this.user.zoneList);
      this.getZoneListByDivisionId(this.user.division.id);
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      this.searchFormData.region = this.user.region;
      this.searchFormData.circle = this.user.circle;
      this.searchFormData.division = this.user.division;
    }else if(this.user.role === GlobalConfiguration.ROLE_FIELD_ADMIN){
      this.zoneList.push(this.user.zone);
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      this.searchFormData.region = this.user.region;
      this.searchFormData.circle = this.user.circle;
      this.searchFormData.division = this.user.division;
      this.searchFormData.zone = this.user.zone;
    }
  }
  
  getRegionList(){
    this.regionService.getRegions(false).subscribe(successResponse =>{
      this.regionList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  regionChanged(region){
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.circleList = null;
      this.searchFormData.circle = undefined;
      this.divisionList = null;
      this.searchFormData.division = undefined;
      this.zoneList = null;
      this.searchFormData.zone = undefined;
      this.getCircleListByRegionId(region.id);
    }
  }

  getCircleListByRegionId(regionId){
    this.circleService.getCirclesByRegionId(regionId, false).subscribe(successResponse =>{
      this.circleList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  circleChanged(circle){
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.divisionList = null;
      this.searchFormData.division = undefined;
      this.zoneList = null;
      this.searchFormData.zone = undefined;
      this.getDivisionListByCircleId(circle.id);
    }
  }

  getDivisionListByCircleId(circleId){
    this.divisionService.getDivisionsByCircleId(circleId, false).subscribe(successResponse =>{
      this.divisionList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  divisionChanged(division){
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.zoneList = null;
      this.searchFormData.zone = undefined;
      this.getZoneListByDivisionId(division.id);
    }
  }

  getZoneListByDivisionId(divisionId){
    // this.zoneList = this.user.zoneList;
    this.zoneList = [];
    this.zoneService.getZonesByDivisionId(divisionId, false).subscribe(successResponse =>{
      this.zoneList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }
  
  zoneChanged(zone){
    this.searchResultList = null;
  }

    billMonthChanged(){
      this.searchResultList = null;
    if(this.searchFormData.billMonth && this.searchFormData.billMonthYear){
      this.searchFormData.billingMonth = this.searchFormData.billMonth + "-" + this.searchFormData.billMonthYear;
    }
  }

  billMonthYearChanged(){
    this.searchResultList = null;
    if(this.searchFormData.billMonth && this.searchFormData.billMonthYear){
      this.searchFormData.billingMonth = this.searchFormData.billMonth + "-" + this.searchFormData.billMonthYear;
    }
  }

  searchClicked(){
    this._searchClicked = true;
    this.reportGenerated = false;
    this.lossGenerationStatus = false;
    if(this.searchFormData.zone === "ALL"){
      this.getByDivisionIdAndBillMonth();
    }else{
      this.getByZoneIdAndBillMonth();
    }
  }

  getByZoneIdAndBillMonth(){
    this.searchResultList = null;
    this._searchClicked = true;
    this.reportService.getD1GenerationStatusByZoneIdAndBillMonth(this.searchFormData.zone.id, this.searchFormData.billingMonth, false).subscribe(successResponse =>{
      this._searchClicked = false;
      this.searchResultList = successResponse;
      console.log(this.searchResultList);
      this.lossGenerationStatus = this.checkGenerationStatus(this.searchResultList);
      this.initializePaginationVariables();
      this.setPage(1);
    },errorResponse =>{
      this._searchClicked = false;
      console.log(errorResponse);
    });
  }

  lossGenerationStatus: boolean;
  getByDivisionIdAndBillMonth(){
    this.searchResultList = null;
    this._searchClicked = true;
    this.reportService.getD1GenerationStatusByDivisionIdAndBillMonth(this.searchFormData.division.id, this.searchFormData.billingMonth, false).subscribe(successResponse =>{
      this._searchClicked = false;
      this.searchResultList = successResponse;
      this.lossGenerationStatus = this.checkGenerationStatus(this.searchResultList);
      this.initializePaginationVariables();
      this.setPage(1);
    },errorResponse =>{
      this._searchClicked = false;
      console.log(errorResponse);
    });
  }

  checkGenerationStatus(resultList):boolean{
    if(resultList && resultList.length){
      for(let item of resultList) {
        if(!item.feederReadingInserted || !item.exportReadingInserted || !item.htReadingInserted){
          return false;
        }
      }
      return true;
    } else{
      return false;
    }
  }

  generateClicked(){
    this._generateClicked = true;
    this.reportGenerated = false
    this._generateClicked = false;
    if(this.searchFormData.zone === "ALL"){
      this.generateD1ReportForDivision(this.searchFormData.division.id, this.searchFormData.billingMonth);
    }else{
      this.generateD1ReportForZone(this.searchFormData.zone.id, this.searchFormData.billingMonth);
    }
  }

  // generateD1ReportForDivision(d1Object){
  //   this._generateClicked = true;
  //   this.reportService.generateD1ReportForDivision(d1Object, true).subscribe(successResponse =>{
  //     this._generateClicked = false;
  //     let result = <any>successResponse;
  //     if(result && result.status === 201){
  //       this.reportGenerated = true
  //       this.globalResources.successAlert("Report generated successfully !");
  //     }else{
  //       console.log("success with invalid result");
  //     }
  //   },errorResponse =>{
  //     console.log(errorResponse);
  //     this._generateClicked = false;
  //     if(errorResponse.status === 417){
  //       this.reportGenerated = true;
  //       this.globalResources.errorAlert(errorResponse.error.errorMessage);
  //     }else{
  //       this.globalResources.errorAlert(errorResponse.error.errorMessage);
  //     }
  //   });
  // }

  // generateD1ReportForZone(d1Object){
  //   this._generateClicked = true;
  //   this.reportService.generateD1ReportForZone(d1Object, true).subscribe(successResponse =>{
  //     this._generateClicked = false;
  //     let result = <any>successResponse;
  //     if(result && result.status === 201){
  //       this.reportGenerated = true
  //       this.globalResources.successAlert("Report generated successfully !");
  //     }else{
  //       console.log("success with invalid result");
  //     }
  //   },errorResponse =>{
  //     console.log(errorResponse);
  //     this._generateClicked = false;
  //     if(errorResponse.status === 417){
  //       this.reportGenerated = true;
  //       this.globalResources.errorAlert(errorResponse.error.errorMessage);
  //     }else{
  //       this.globalResources.errorAlert(errorResponse.error.errorMessage);
  //     }
  //   });
  // }

  viewClicked(){
    if(this.searchFormData.zone === "ALL"){
      this.viewByDivisionIdAndBillMonth();
    }else{
      this.viewByZoneIdAndBillMonth();
    }
  }

  viewByZoneIdAndBillMonth(){
    this.viewResultList = [];
    this.reportService.getD1ByZoneIdAndBillMonth(this.searchFormData.zone.id, this.searchFormData.billingMonth, false).subscribe(successResponse =>{
      if(successResponse){
        this.viewResultList.push(successResponse);
      }
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  viewByDivisionIdAndBillMonth(){
    this.viewResultList = [];
    this.reportService.getD1ByDivisionIdAndBillMonth(this.searchFormData.division.id, this.searchFormData.billingMonth, false).subscribe(successResponse =>{
      if(successResponse){
        this.viewResultList = successResponse;
      }
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  exportClicked(){
    let encodedCredentials = sessionStorage.getItem('encodedCredentials');
    let params = {
      Authorization: "Basic " + encodedCredentials,
    };
    let fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "report/d1-report/export/division/id/" + this.searchFormData.division.id + "/bill-month/" + this.searchFormData.billingMonth;
    this.globalResources.downloadFile(fileUrl,params);
  }

  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 12;
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.searchResultList.length, page, this.pageSize);
    this.pagedSearchResultList = this.searchResultList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  fetchClicked : boolean;
  fetchButtonClicked(missingData){
    this.fetchClicked = true;
    this.reportService.getD1ReportDataByZoneIdAndBillMonth(missingData.zone.id, missingData.billMonth, false).subscribe(success =>{
      this.fetchClicked = false;
      console.log(success);
      this.searchClicked();
      this.globalResources.successAlert("Data fetched successfully.");
    }, error =>{
      this.fetchClicked = false;
      console.log(error);
      if(error.status === 417){
        this.reportGenerated = true;
        this.globalResources.errorAlert(error.error.errorMessage);
      }else{
        this.globalResources.errorAlert("Unable to generate report");
      }
    });
  }

  generateD1ReportForZone(zoneId, billMonth){
    this._generateClicked = true;
    this.reportService.generateD1ReportDataByZoneIdAndBillMonth(zoneId, billMonth, true).subscribe(successResponse =>{
      this._generateClicked = false;
      let result = <any>successResponse;
      console.log(successResponse);
      if(result && result.status === 201){
        this.reportGenerated = true
        this.globalResources.successAlert("Report generated successfully !");
      }else{
        console.log("success with invalid result");
      }
    },errorResponse =>{
      console.log(errorResponse);
      this._generateClicked = false;
      if(errorResponse.status === 417){
        this.reportGenerated = true;
        this.globalResources.errorAlert(errorResponse.error.errorMessage);
      }else{
        this.globalResources.errorAlert("Unable to generate report");
      }
    });
  }

  generateD1ReportForDivision(divisionId, billMonth){
    this._generateClicked = true;
    this.reportService.generateD1ReportDataByDivisionIdAndBillMonth(divisionId, billMonth, true).subscribe(successResponse =>{
      this._generateClicked = false;
      let result = <any>successResponse;
      console.log(successResponse);
      if(result && result.status === 201){
        this.reportGenerated = true
        this.globalResources.successAlert("Report generated successfully !");
      }else{
        console.log("success with invalid result");
      }
    },errorResponse =>{
      console.log(errorResponse);
      this._generateClicked = false;
      if(errorResponse.status === 417){
        this.reportGenerated = true;
        this.globalResources.errorAlert(errorResponse.error.errorMessage);
      }else{
        this.globalResources.errorAlert("Unable to generate report");
      }
    });
  }
}
