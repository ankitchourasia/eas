import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { ReportService } from '@eas-services/report-service/report.service';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Component({
  selector: 'eas-report-d2',
  templateUrl: './report-d2.component.html',
  styleUrls: ['./report-d2.component.css']
})
export class ReportD2Component implements OnInit {

  searchFormData: any;
  regionList: any;
  circleList: any;
  townList:any;
  viewResultList: any;
  _viewClicked: boolean;
  user: any;
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private regionService: RegionService, private circleService: CircleService, private reportService: ReportService) { }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.regionList = [];
    this.circleList = [];
    this.townList = [];
    this.viewResultList = [];
    this.searchFormData = {};
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.getRegionList();
    } else {
      this.getTownListByCircleId(this.user.circle.id);
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.searchFormData.region = this.user.region;
      this.searchFormData.circle = this.user.circle;
    }
  }

  getRegionList(){
    this.regionList = [];
    this.regionService.getRegions(false).subscribe(successResponse =>{
      if(successResponse){
        this.regionList = successResponse;
      }
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  regionChanged(region){
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.circleList = [];
      this.searchFormData.circle = undefined;
      this.townList = [];
      this.searchFormData.town = undefined;
      this.getCircleListByRegionId(region.id);
    }
  }

  getCircleListByRegionId(regionId){
    this.circleList = [];
    this.circleService.getCirclesByRegionId(regionId, false).subscribe(successResponse =>{
      if(successResponse){
        this.circleList = successResponse;
      }
    },errorResponse =>{
      console.log(errorResponse);
    });
  }

  circleChanged(circle){
    if(this.user.role === GlobalConfiguration.ROLE_SUPER_ADMIN){
      this.townList = [];
      this.searchFormData.town = undefined;
      this.getTownListByCircleId(circle.id);
    }
  }

  getTownListByCircleId(circleId){
    this.townList = [];
    this.circleService.getTownsByCircleId(circleId, false).subscribe(successResponse =>{
      this.townList = successResponse;
    },errorResponse =>{
      console.log(errorResponse);
    });
  }
  
  townChanged(){
    this.viewResultList = [];
  }

  billMonthChanged(){
    this.viewResultList = [];
    if(this.searchFormData.month && this.searchFormData.year){
      this.searchFormData.billMonth = this.searchFormData.month + "-" + this.searchFormData.year;
    }
  }

  billMonthYearChanged(){
    this.viewResultList = [];
    if(this.searchFormData.month && this.searchFormData.year){
      this.searchFormData.billMonth = this.searchFormData.month + "-" + this.searchFormData.year;
    }
  }

  viewClicked(){
    this.viewByTownIdAndBillMonth();
  }

  viewByTownIdAndBillMonth(){
    this._viewClicked = true;
    this.viewResultList = [];
    this.reportService.getD2ByTownIdAndBillMonth(this.searchFormData.town.id, this.searchFormData.billMonth, false).subscribe(successResponse =>{
      this._viewClicked = false;
      console.log(successResponse);
      if(successResponse){
        this.viewResultList.push(successResponse);
      }
    },errorResponse =>{
      this._viewClicked = false;
      console.log(errorResponse);
    });
  }

  // viewByDivisionIdAndBillMonth(){
  //   this._viewClicked = true;
  //   this.viewResultList = [];
  //   this.reportService.getD2ByDivisionIdAndBillMonth(this.searchFormData.division.id, this.searchFormData.billMonth, false).subscribe(successResponse =>{
  //     this._viewClicked = false;
  //     console.log(successResponse);
  //     if(successResponse){
  //       this.viewResultList = successResponse;
  //     }
  //   },errorResponse =>{
  //     this._viewClicked = false;
  //     console.log(errorResponse);
  //   });
  // }

  //exportClicked(exportElementId){
   // this.globalResources.exportTableToExcel(exportElementId, "d-2_Report_" + this.searchFormData.billMonth);
    // let encodedCredentials = sessionStorage.getItem('encodedCredentials');
    // let params = {
    //   Authorization: "Basic " + encodedCredentials,
    // };
    // let fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "report/d2-report/export/division/id/" + this.searchFormData.division.id + "/bill-month/" + this.searchFormData.billMonth;
    // this.globalResources.downloadFile(fileUrl,params);
  //}

  exportClicked(exportElementId){
    let encodedCredentials = sessionStorage.getItem('encodedCredentials');
    let params = {
      Authorization: "Basic " + encodedCredentials,
    };
    let fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "report/d2-report/export/town/id/" + this.searchFormData.town.id + "/bill-month/" + this.searchFormData.billMonth;
    this.globalResources.downloadFile(fileUrl,params);
  }
}