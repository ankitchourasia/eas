import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { GlobalConstants } from '@eas-utility/global.constants';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { ReportService } from '@eas-services/report-service/report.service';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-report-d4',
  templateUrl: './report-d4.component.html',
  styleUrls: ['./report-d4.component.css']
})
export class ReportD4Component implements OnInit {

  COMPONENT_NAME: string = "ReportD4Component";
  searchFormData: any;
  regionList: any;
  circleList: any;
  townList: any;
  user: any;
  _generateClicked: boolean;
  viewResultList: any;
  reportGenerated: boolean;
  billingDataAvailable: boolean;
  pager: any;
  pageSize: number;
  searchResultList: any;
  pagedSearchResultList: any;
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private paginationService: PaginationService, private regionService: RegionService,
    private circleService: CircleService, private reportService: ReportService) { }

  ngOnInit() {
    this.searchFormData = {};
    this.setPartialData()
  }

  setPartialData() {
    this.townList = [];
    this.regionList = [];
    this.circleList = [];
    this.user = this.globalResources.getUserDetails();
    if (this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN) {
      this.getRegionList();
    } else {
      this.getTownListByCircleId(this.user.circle.id);
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.searchFormData.region = this.user.region;
      this.searchFormData.circle = this.user.circle;
      this.searchFormData.division = this.user.division;
    }
  }

  getRegionList() {
    this.regionService.getRegions(false).subscribe(successResponse => {
      this.regionList = successResponse;
    }, errorResponse => {
      console.log(errorResponse);
    });
  }

  regionChanged(region) {
    if (this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN) {
      this.circleList = null;
      this.searchFormData.circle = undefined;
      this.townList = null;
      this.searchFormData.town = undefined;
      this.getCircleListByRegionId(region.id);
    }
  }

  getCircleListByRegionId(regionId) {
    this.circleService.getCirclesByRegionId(regionId, false).subscribe(successResponse => {
      this.circleList = successResponse;
    }, errorResponse => {
      console.log(errorResponse);
    });
  }

  circleChanged(circle) {
    if (this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN) {
      this.townList = null;
      this.searchFormData.town = undefined;
      this.getTownListByCircleId(circle.id);
    }
  }

  getTownListByCircleId(circleId) {
    this.townList = [];
    this.circleService.getTownsByCircleId(circleId, false).subscribe(successResponse => {
      this.townList = successResponse;
    }, errorResponse => {
      console.log(errorResponse);
    });
  }

  townChanged(town) {
    this.viewResultList = null;
    console.log(town);
  }

  billMonthChanged() {
    this.viewResultList = null;
    if (this.searchFormData.billMonth && this.searchFormData.billMonthYear) {
      this.searchFormData.billingMonth = this.searchFormData.billMonth + "-" + this.searchFormData.billMonthYear;
    }
  }

  billMonthYearChanged() {
    this.viewResultList = null;
    if (this.searchFormData.billMonth && this.searchFormData.billMonthYear) {
      this.searchFormData.billingMonth = this.searchFormData.billMonth + "-" + this.searchFormData.billMonthYear;
    }
  }

  _searchClicked: boolean;
  searchClicked() {
    this._searchClicked = true;
    this.lossGenerationStatus = false;
    this.billingDataAvailable = false;
    this.reportGenerated = false;
    this.getByTownIdAndBillMonth();
  }

  lossGenerationStatus: boolean;

  getByTownIdAndBillMonth() {
    this.searchResultList = null;
    this._searchClicked = true;
    this.billingDataAvailable = false;
    this.reportService.getD4GenerationStatusByTownIdAndBillMonth(this.searchFormData.town.id, this.searchFormData.billingMonth, false).subscribe(successResponse => {
      this._searchClicked = false;
      this.searchResultList = successResponse;
      this.getGenerationStatus();
      this.initializePaginationVariables();
      if(this.searchResultList && this.searchResultList.length){
        this.setPage(1);
      }
    }, errorResponse => {
      this._searchClicked = false;
      console.log(errorResponse);
    });
  }

  readingData : any = true;
  getGenerationStatus() {
    this.readingData;
    for (let element of this.searchResultList) {
      this.readingData = !!(this.readingData * element.feederReadingInserted * element.exportReadingInserted * element.htReadingInserted);
      // console.log(this.readingData);
      if (!element.billingData) {
        this.billingDataAvailable = false;
        break;
      }
      this.billingDataAvailable = true;
    };
  }

  generateClicked() {
    this._generateClicked = true;
    this.reportGenerated = false;
    let d4: any = {};
    d4.regionId = this.searchFormData.region.id;
    d4.circleId = this.searchFormData.circle.id;
    d4.divisionId = this.searchFormData.division.id;
    d4.billMonth = this.searchFormData.billingMonth;
    this._generateClicked = false;
    this.generateD4ReportForTown();
  }

  exportClicked() {
    // this.globalResources.exportTableToExcel(exportElementId, "d-4_Report_" + this.searchFormData.billingMonth);
    let encodedCredentials = sessionStorage.getItem('encodedCredentials');
    let params = {
      Authorization: "Basic " + encodedCredentials,
    };
    let fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "report/d4-report/export/town/id/" + this.searchFormData.town.id + "/bill-month/" + this.searchFormData.billingMonth;
    this.globalResources.downloadFile(fileUrl, params);
  }

  fetchClicked: boolean;
  fetchButtonClicked() {
    let methodName = "fetchButtonClicked";
    this.fetchClicked = true;
    this.reportService.getD4ReportBillingDataByTownIdAndBillMonth(this.searchFormData.town.id, this.searchFormData.billingMonth, false).subscribe(success => {
      this.fetchClicked = false;
      this.searchClicked();
      this.globalResources.successAlert("Data fetched successfully.");
    }, errorResponse => {
      this.fetchClicked = false;
      if (errorResponse.status === 417) {
        // this.reportGenerated = true;
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
      }else{
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName, "Unable to generate report");
      }
    });
  }

  initializePaginationVariables() {
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

  generateD4ReportForTown() {
    let methodName = "generateD4ReportForTown";
    this._generateClicked = true;
    this.reportService.generateD4ReportByTownIdAndBillMonth(this.searchFormData.town.id, this.searchFormData.billingMonth, true).subscribe(successResponse => {
      this._generateClicked = false;
      let result = <any>successResponse;
      if (result && result.status === 201) {
        this.reportGenerated = true;
        // this.viewClicked();
        this.globalResources.successAlert("Report generated successfully !");
      } else {
        this.globalResources.handleError(successResponse, this.COMPONENT_NAME, methodName, "Unable to generate report");
      }
    }, errorResponse => {
      this._generateClicked = false;
      if (errorResponse.status === 417) {
        this.reportGenerated = true;
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
      }else{
        this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName, "Unable to generate report");
      }
    });
  }

}