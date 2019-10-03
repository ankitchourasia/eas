import { Component, OnInit } from '@angular/core';
import { GlobalResources } from '@eas-utility/global.resources';
import { GlobalConstants } from '@eas-utility/global.constants';
import { PaginationService } from '@eas-services/pagination/pagination.service';
import { RegionService } from '@eas-services/region-service/region.service';
import { CircleService } from '@eas-services/circle-service/circle.service';
import { DivisionService } from '@eas-services/division-service/division.service';
import { ZoneService } from '@eas-services/zone/zone.service';
import { ReportService } from '@eas-services/report-service/report.service';

@Component({
  selector: 'eas-report-feeder-json-file',
  templateUrl: './report-feeder-json-file.component.html',
  styleUrls: ['./report-feeder-json-file.component.css']
})
export class ReportFeederJsonFileComponent implements OnInit {

  COMPONENT_NAME: string = "ReportFeederJsonFileComponent";
  searchFormData: any;
  regionList: any;
  circleList: any;
  divisionList: any;
  zoneList: any;
  user: any;
  viewResultList: any;
  billingStatusList: any;
  pagedBillingStatusList: any;
  pager: any;
  pageSize: number;
  _generateClicked: boolean;
  reportGenerated: boolean;
  _searchClicked: boolean;
  generationStatusFlag: boolean;
  
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
    if(this.user.role === this.globalConstants.ROLE_SUPER_ADMIN){
      this.getRegionList();
    }else if(this.user.role === this.globalConstants.ROLE_ADMIN){
      // this.zoneList = (this.user.zoneList);
      this.getZoneListByDivisionId(this.user.division.id);
      this.regionList.push(this.user.region);
      this.circleList.push(this.user.circle);
      this.divisionList.push(this.user.division);
      this.searchFormData.region = this.user.region;
      this.searchFormData.circle = this.user.circle;
      this.searchFormData.division = this.user.division;
    }else if(this.user.role === this.globalConstants.ROLE_FIELD_ADMIN){
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
    if(this.user.role === this.globalConstants.ROLE_SUPER_ADMIN){
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
    if(this.user.role === this.globalConstants.ROLE_SUPER_ADMIN){
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
    if(this.user.role === this.globalConstants.ROLE_SUPER_ADMIN){
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
    this.viewResultList = null;
    this.reportGenerated = false;
    console.log(zone);
  }

  billMonthChanged(){
    this.reportGenerated = false;
    this.billingStatusList = null;
    if(this.searchFormData.billMonth && this.searchFormData.billMonthYear){
      this.searchFormData.billingMonth = this.searchFormData.billMonth + "-" + this.searchFormData.billMonthYear;
    }
  }

  billMonthYearChanged(){
    this.reportGenerated = false;
    this.billingStatusList = null;
    if(this.searchFormData.billMonth && this.searchFormData.billMonthYear){
      this.searchFormData.billingMonth = this.searchFormData.billMonth + "-" + this.searchFormData.billMonthYear;
    }
  }

  searchClicked(){
    this.reportGenerated = false;
    this.billingStatusList = null;
    if(this.searchFormData.zone === "ALL"){
      this.getNGBBillingStatusByDivisionIdAndBillMonth(this.searchFormData.division.id, this.searchFormData.billingMonth);
    }else{
      this.getNGBBillingStatusByZoneIdAndBillMonth(this.searchFormData.zone.id, this.searchFormData.billingMonth);
    }
  }

  getNGBBillingStatusByDivisionIdAndBillMonth(divisionId, billMonth){
    let methodName = "getNGBBillingStatusByDivisionIdAndBillMonth";
    this._searchClicked = true;
    this.generationStatusFlag = false;
    this.billingStatusList = [];
    this.reportService.getNGBBillingStatusByDivisionIdAndBillMonth(divisionId, billMonth, false).subscribe(successResponse =>{
      this._searchClicked = false;
      this.billingStatusList =successResponse;
      this.generationStatusFlag = this.billingStatusList.every(element => element.billingStatus);
      this.billingStatusList.forEach(element => {
        this.getD1GenerationStatusByZoneIdAndBillMonth(element);    
      });
      this.initializePaginationVariables();
      this.setPage(1);
    },errorResponse =>{
      this._searchClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  getNGBBillingStatusByZoneIdAndBillMonth(zoneId, billMonth){
    let methodName = "getNGBBillingStatusByZoneIdAndBillMonth";
    this._searchClicked = true;
    this.generationStatusFlag = false;
    this.billingStatusList = [];
    this.reportService.getNGBBillingStatusByZoneIdAndBillMonth(zoneId, billMonth, false).subscribe(successResponse =>{
      this._searchClicked = false;
      this.billingStatusList.push(successResponse);
      this.generationStatusFlag = this.billingStatusList.every(element => element.billingStatus);
      this.billingStatusList.forEach(element => {
        this.getD1GenerationStatusByZoneIdAndBillMonth(element);    
      });
      this.initializePaginationVariables();
      this.setPage(1);
    },errorResponse =>{
      this._searchClicked = false;
      this.globalResources.handleError(errorResponse, this.COMPONENT_NAME, methodName);
    });
  }

  getD1GenerationStatusByZoneIdAndBillMonth(searchElement){
    this._searchClicked = true;
    searchElement.generationStatusList = [];
    this.reportService.getD1GenerationStatusByZoneIdAndBillMonth(searchElement.zone.id, this.searchFormData.billingMonth, false).subscribe(successResponse =>{
      this._searchClicked = false;
      searchElement.generationStatusList = successResponse;
      this.generationStatusFlag = !!(Number(this.generationStatusFlag) * Number(this.checkGenerationStatus(searchElement.generationStatusList)));
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
    let generateInput: any = {};
    generateInput.regionId = this.searchFormData.region.id;
    generateInput.circleId = this.searchFormData.circle.id;
    generateInput.divisionId = this.searchFormData.division.id;
    generateInput.billMonth = this.searchFormData.billingMonth;
    this._generateClicked = false;
    generateInput.zoneId = this.searchFormData.zone.id;
    generateInput.zoneName = this.searchFormData.zone.name;
    this.generateJsonInputForZone(generateInput);
  }

  generateJsonInputForZone(generateInputObject){
    this._generateClicked = true;
    this.reportService.generateJsonInputForZone(generateInputObject, true).subscribe(successResponse =>{
      this._generateClicked = false;
      let result = <any>successResponse;
      if(result && result.status === 201){
        this.reportGenerated = true;
        // this.viewClicked();
        let alertResponse = this.globalResources.successAlert("Report generated successfully !");
      }else{
        console.log("success with invalid result");
      }
    },errorResponse =>{
      console.log(errorResponse);
      this._generateClicked = false;
      if(errorResponse.status === 417){
        this.reportGenerated = true;
        // this.viewClicked();
        let alertResponse = this.globalResources.errorAlert(errorResponse.error.errorMessage);
      }else{
        this.globalResources.errorAlert(errorResponse.error.errorMessage);
      }
    });
  }

  viewClicked(){
      this.viewByZoneIdAndBillMonth();
  }

  viewByZoneIdAndBillMonth(){
    let methodName = "viewByZoneIdAndBillMonth";
    this.viewResultList = [];
    this.reportService.getJsonInputByZoneIdAndBillMonth(this.searchFormData.zone.id, this.searchFormData.billingMonth, false).subscribe(successResponse =>{
      console.log(successResponse);
      let result:any = successResponse;
      if(result && result.length)
      {
        this.viewResultList = result;
        let transaction_data =[];
        this.viewResultList.forEach(element => {
          transaction_data.push(this.prepareTransactionDataElement(element));    
        });

        let jsonObject: any = {};
        jsonObject.headerObject = this.prepareHeaderObject(this.viewResultList);
        jsonObject.transaction_data = transaction_data;
        jsonObject.footerObject = this.prepareFooterObject(this.viewResultList);
        
        let jsonData = JSON.stringify(jsonObject , null, '\t');
        let dataType = 'data:application/octet-stream';
        this.globalResources.downloadByBlob(jsonData, dataType, "jsonFile", "json");
      }
    },errorResponse =>{
      console.log(errorResponse);
      this.globalResources.handleError(this.COMPONENT_NAME, methodName, errorResponse);
    });
  }

  prepareHeaderObject(records){
    let current_datetime = new Date()
    // let formatted_date = current_datetime.getFullYear() + "-" 
    //                     + this.appendLeadingZeroes(current_datetime.getMonth() + 1) + "-" 
    //                     + current_datetime.getDate() + " " 
    //                     + current_datetime.getHours() + ":" 
    //                     + current_datetime.getMinutes() + ":" 
    //                     + current_datetime.getSeconds();
    let formatted_date = current_datetime.getFullYear() + "-" + 
                        ("0" + (current_datetime.getMonth() + 1)).slice(-2) + "-" + 
                        ("0" + current_datetime.getDate()).slice(-2) + " " + 
                        ("0" + current_datetime.getHours()).slice(-2) + ":" + 
                        ("0" + current_datetime.getMinutes()).slice(-2) + ":" + 
                        ("0" + current_datetime.getSeconds()).slice(-2); 
    let headerObject: any = {};
    headerObject["File_name"] = this.getFileName();
    headerObject["File_generation_time"] = formatted_date;
    headerObject["no_of_records"] = records.length;
    headerObject["version"] = "1";
    return headerObject;
  }

  prepareFooterObject(records){
    let footerObject: any = {};
    footerObject["File_name"] =  this.getFileName();
    footerObject["no_of_records"] = records.length;
    return footerObject;
  }

  getFileName(){
    let fileName = "mpwkvvcl_uf_"
    let endBillMonth = this.searchFormData.billingMonth;
    let startBillMonth = this.globalResources.getNextBillMonth(endBillMonth);

    let startBillMonthValues = startBillMonth.split("-");
    let endBillMonthValues = endBillMonth.split("-");

    let month1 = Number(this.globalConstants.MONTHS.indexOf(startBillMonthValues[0])+1);
    let year1 = Number(startBillMonthValues[1])-1;
    let month2 = Number(this.globalConstants.MONTHS.indexOf(endBillMonthValues[0])+1);
    let year2 = Number(endBillMonthValues[1]);
    
    return fileName + ("0" + month1).slice(-2) + ("0" + year1).slice(-2) + "_"+ ("0" + month2).slice(-2) + ("0" + year2).slice(-2) + ".txt"; 
  }

  appendLeadingZeroes(n){
    if(n <= 9){
      return "0" + n;
    }
    return n
  }

  prepareTransactionDataElement(sourceObject){
    let customObject: any = {}
    customObject["Feeder_Code"] = sourceObject.feederCode;
    customObject["Feeder_Type(U/R/M)"] = sourceObject.feederType;
    customObject["Start_Billing_Period"] = sourceObject.startBillingDate;
    customObject["End_Billing_Period"] = sourceObject.endBillingDate;
    customObject["No_Of_Power_Failure"] = sourceObject.powerFailureCount;
    customObject["Duration_Of_Power_Failure(Sec)"] = sourceObject.powerFailureDuration;
    customObject["Minimum_Voltage(V)"] = sourceObject.minimumVoltage;
    customObject["Max_Current(A)"] = sourceObject.maxCurrent;
    customObject["Input_Energy(kwh)"] = sourceObject.feederInput;
    customObject["Export_Energy(kwh)"] = sourceObject.exportEnergy;
    customObject["HT_Industrial_Consumer_Count"] = sourceObject.htIndustrialConsumer;
    customObject["HT_Commercial_Consumer_Count"] = sourceObject.htCommercialConsumer;
    customObject["LT_Industrial_Consumer_Count"] = sourceObject.ltIndustrialConsumer;
    customObject["LT_Commercial_Consumer_Count"] = sourceObject.ltCommercialConsumer;
    customObject["LT_Domestic_Consumer_Count"] = sourceObject.ltDomesticConsumer;
    customObject["Govt_Consumer_Count"] = sourceObject.governmentConsumer;
    customObject["Agri_Consumer_Count"] = sourceObject.agricultureConsumer;
    customObject["Others_Consumer_Count"] = sourceObject.otherConsumer;
    customObject["HT_Industrial_Energy_Billed"] = sourceObject.htIndustrialEnergy;
    customObject["HT_Commercial_Energy_Billed"] = sourceObject.htCommercialEnergy;
    customObject["LT_Industrial_Energy_Billed"] = sourceObject.ltIndustrialEnergy;
    customObject["LT_Commercial_Energy_Billed"] = sourceObject.ltCommercialEnergy;
    customObject["LT_Domestic_Energy_Billed(kwh)"] = sourceObject.ltDomesticEnergy;
    customObject["Govt_Energy_Billed(kwh)"] = sourceObject.governmentEnergy;
    customObject["Agri_Energy_Billed(kwh)"] = sourceObject.agricultureEnergy;
    customObject["Others_Energy_Billed(kwh)"] = sourceObject.otherEnergy;
    customObject["HT_Industrial_Amount_Billed"] = sourceObject.htIndustrialAmountBilled;
    customObject["HT_Commercial_Amount_Billed"] = sourceObject.htCommercialAmountBilled;
    customObject["LT_Industrial_Amount_Billed"] = sourceObject.ltIndustrialAmountBilled;
    customObject["LT_Commercial_Amount_Billed"] = sourceObject.ltCommercialAmountBilled;
    customObject["LT_Domestic_Amount_Billed"] = sourceObject.ltDomesticAmountBilled;
    customObject["Govt_Amount_Billed"] = sourceObject.governmentAmountBilled;
    customObject["Agri_Amount_Billed"] = sourceObject.agricultureAmountBilled;
    customObject["Others_Amount_Billed"] = sourceObject.otherAmountBilled;
    customObject["HT_Industrial_Amount_Collected"] = sourceObject.htIndustrialAmountCollected;
    customObject["HT_Commercial_Amount_Collected"] = sourceObject.htCommercialAmountCollected;
    customObject["LT_Industrial_Amount_Collected"] = sourceObject.ltIndustrialAmountCollected;
    customObject["LT_Commercial_Amount_Collected"] = sourceObject.ltCommercialAmountCollected;
    customObject["LT_Domestic_Amount_Collected"] = sourceObject.ltDomesticAmountCollected;
    customObject["Govt_Amount_Collected"] = sourceObject.governmentAmountCollected;
    customObject["Agri_Amount_Collected"] = sourceObject.agricultureAmountCollected;
    customObject["Others_Amount_Collected"] = sourceObject.otherAmountCollected;
    return customObject;
  }

  initializePaginationVariables(){
    this.pager = {};
    this.pageSize = 1;
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.billingStatusList.length, page, this.pageSize);
    this.pagedBillingStatusList = this.billingStatusList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
