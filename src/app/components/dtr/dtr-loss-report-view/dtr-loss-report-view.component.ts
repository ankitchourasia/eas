import { Component, OnInit, Input } from '@angular/core';
import { DtrService } from '@eas-services/dtr-service/dtr.service';
import { GlobalResources } from 'app/utility/global.resources';
import { GlobalConstants } from 'app/utility/global.constants';
import { FeederService } from '@eas-services/feeder/feeder.service';
import { SubstationService } from '@eas-services/substation/substation.service';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { DivisionService } from '@eas-services/division-service/division.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { GlobalConfiguration } from 'app/utility/global-configuration';

@Component({
  selector: 'eas-dtr-loss-report-view',
  templateUrl: './dtr-loss-report-view.component.html',
  styleUrls: ['./dtr-loss-report-view.component.css']
})
export class DtrLossReportViewComponent implements OnInit {

  formData: any = {};
  dtrLossReports: any;
  grossLoss: any = 0;
  grossInput: number = 0;
  grossConsumer: number = 0;
  grossConsumption: number = 0;
  grossAssessment: number = 0;
  regionList: any;
  circleList: any;
  divisionList: any;
  zoneList: any;
  substationList: any;
  feederList: any;
  user: any;

  @Input("feeder")
  set setFeeder(feeder : any){
    this.formData.selectedFeeder = feeder;
    this.formData.feeder = this.formData.selectedFeeder;
    this.searchClicked();
  }

  @Input("billingMonth")
  set setBillingMonth(billingMonth : any){
    this.formData.selectedBillingMonth = billingMonth;
    this.formData.billingMonth = this.formData.selectedBillingMonth;
    this.searchClicked();
  }
  constructor(public globalResources: GlobalResources, public globalConstants: GlobalConstants,
    private dtrService : DtrService, private feederService : FeederService, private substationService: SubstationService,
    private regionService: RegionService, private circleService: CircleService, private divisionService: DivisionService, 
    private zoneService: ZoneService) { }

  ngOnInit() {
    this.setPartialData();
  }

  setPartialData(){
    this.zoneList = [];
    this.regionList = [];
    this.circleList = [];
    this.divisionList = [];
    this.substationList = null;
    this.user = this.globalResources.getUserDetails();
    if(this.user.role === this.globalConstants.ROLE_SUPER_ADMIN){
      this.getRegionList();
    }else if(this.user.role === this.globalConstants.ROLE_ADMIN){
      this.zoneList = (this.user.zoneList);
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      this.formData.region = this.user.region;
      this.formData.circle = this.user.circle;
      this.formData.division = this.user.division;
    }else if(this.user.role === this.globalConstants.ROLE_FIELD_ADMIN){
      this.zoneList.push(this.user.zone);
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      this.formData.region = this.user.region;
      this.formData.circle = this.user.circle;
      this.formData.division = this.user.division;
      this.formData.zone = this.user.zone;
      this.getSubstationByZoneId(this.formData.zone.id);
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
    if(this.user.role === this.globalConstants.ROLE_SUPER_ADMIN){
      this.circleList = null;
      this.formData.circle = undefined;
      this.divisionList = null;
      this.formData.division = undefined;
      this.zoneList = null;
      this.formData.zone = undefined;
      this.substationList = null;
      this.formData.substation = undefined;
      this.feederList = null;
      this.formData.feeder = undefined;
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
    if(this.user.role === this.globalConstants.ROLE_SUPER_ADMIN){
      this.divisionList = null;
      this.formData.division = undefined;
      this.zoneList = null;
      this.formData.zone = undefined;
      this.substationList = null;
      this.formData.substation = undefined;
      this.feederList = null;
      this.formData.feeder = undefined;
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
    if(this.user.role === this.globalConstants.ROLE_SUPER_ADMIN){
      this.zoneList = null;
      this.formData.zone = undefined;
      this.substationList = null;
      this.formData.substation = undefined;
      this.feederList = null;
      this.formData.feeder = undefined;
      this.getZoneListByDivisionId(division.id);
    }
  }

  getZoneListByDivisionId(divisionId){
    this.zoneList = this.user.zoneList;
    this.zoneService.getZonseByDivisionId(divisionId, false).subscribe(successResponse =>{
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

  feederChanged(feeder){
    console.log(feeder);
  }

  billMonthChanged(){
    if(this.formData.billMonth && this.formData.billMonthYear){
      this.formData.billingMonth = this.formData.billMonth + "-" + this.formData.billMonthYear;
    }
  }

  billMonthYearChanged(){
    if(this.formData.billMonth && this.formData.billMonthYear){
      this.formData.billingMonth = this.formData.billMonth + "-" + this.formData.billMonthYear;
    }
  }

  _searchClicked: boolean;
  searchClicked(){
    if(this.formData.feeder && this.formData.feeder.id && this.formData.billingMonth){
      this.viewDtrLossReportByFeederIdAndBillMonth(this.formData.feeder.id, this.formData.billingMonth);
    }else{
      console.log("feeder/billingMonth missing");
    }
  }

  errorMessage :string;
  viewDtrLossReportByFeederIdAndBillMonth(feederId, billingMonth){
    this._searchClicked = true;
    this.dtrLossReports = null;
    this.errorMessage = null;
    this.dtrService.getDTRLossReportByFeederIdAndBillMonth(feederId, billingMonth, false).subscribe(
    successResponse =>{
      this._searchClicked = false;
      this.dtrLossReports = <any>successResponse;
      if(this.dtrLossReports && this.dtrLossReports.length){
        this.dtrLossReports.forEach((dtrLossReport,index) => {
          this.calculateTotal(dtrLossReport, index);
        });
        this.calculateGrossLoss();
        this.roundOffAllValues();
      }
      },errorResponse =>{
        this._searchClicked = false;
        console.log(errorResponse);
        this.errorMessage = "DTR loss report does not exists!";
        // let alertResponse = this.globalResources.errorAlert("DTR LOSS REPORT does not exists!");
      }
    );
  }

  calculateTotal(report,index){
    this.grossInput = this.grossInput + parseInt(report.netDTRInput);
    this.grossConsumer = this.grossConsumer + parseInt(report.totalConsumer);
    this.grossConsumption = this.grossConsumption + parseInt(report.totalSoldUnit);
    this.grossAssessment = this.grossAssessment + parseInt(report.assessmentUnit);
  }

  calculateGrossLoss(){
    if(this.grossInput == 0){
      this.grossLoss = '###';
    }else{
      let loss = this.grossInput - this.grossConsumption;
      loss = loss / this.grossInput;
      loss = loss * 100;
      this.grossLoss = Math.round(loss*100)/100;
    }
  }

  roundOffAllValues(){
    this.grossInput = Math.round(this.grossInput * 100)/100;
  }

  exportTotalConsumers(report){
    // let user = this.globalResources.getUserDetails();
    let encodedCredentials = sessionStorage.getItem('encodedCredentials');
    let params = {
      Authorization: "Basic " + encodedCredentials,
      locationCode: report.zoneLocationCode,
      billMonth: report.lossMonth,
      groupNo: report.billingGroupNo,
      readerNo: report.billingRDNo
    };
    let fileUrl = GlobalConfiguration.URL_PREFIX_FOR_FILE_EXPORT + "dtrloss/consumers/export";
    this.globalResources.downloadFile(fileUrl,params);
  }

  printClicked(){
    this.globalResources.printElementById('dtrLossReport',{fontSize:"60%", textAlign:"center"});
    // this.globalResources.printByElementId('dtrLossReport');
    // this.globalResources.exportTableToExcel('dtrLossReport');
  }
}
