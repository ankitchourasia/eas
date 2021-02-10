import { Component, OnInit } from '@angular/core';
import { ReportAdminReportMenuService } from '../report-admin-report-menu.service';
import { ReportService } from '@eas-services/report-service/report.service';
import { GlobalConstants } from '@eas-utility/global.constants';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { GlobalResources } from '@eas-utility/global.resources';

@Component({
  selector: 'eas-report-admin-online-feeder-report',
  templateUrl: './report-admin-online-feeder-report.component.html',
  styleUrls: ['./report-admin-online-feeder-report.component.css']
})
export class ReportAdminOnlineFeederReportComponent implements OnInit {

  COMPONENT_NAME = "ReportAdminOnlineFeederReportComponent";

  missingData : any;
  billingMonth : any = {};
  searching: boolean;
  downloadReport : boolean;
  constructor(private adminReportMenuService: ReportAdminReportMenuService, private reportService : ReportService, 
    public globalConstants : GlobalConstants, private globalResources : GlobalResources) { 
    if(!this.adminReportMenuService.ONLINE_FEEDER_REPORT_MENU.active){
      this.adminReportMenuService.menuClicked(this.adminReportMenuService.ONLINE_FEEDER_REPORT_MENU);
    }
  }

  ngOnInit(): void {
  }

  getMissingTownWiseBillData(billMonth){
    this.searching = true;
    this.missingData = undefined;
    this.reportService.getMissingOnlineFeederReportDataByBillMonth(billMonth, false).subscribe(success =>{
      this.searching = false;
      console.log(success);
      this.missingData = success;
      this.missingData.sort(this.globalResources.dynamicSort("name","asc"));
    }, error =>{
      this.searching = false;
      console.log(error);
    })
  }

  billMonthChanged(){
    this.downloadReport = false;
    this.missingData = [];
    if(this.billingMonth.month && this.billingMonth.year){
      this.billingMonth.billMonth = this.billingMonth.month + "-" + this.billingMonth.year;
    }
  }

  searchClicked(){
    if(this.billingMonth.billMonth){
      this.getMissingTownWiseBillData(this.billingMonth.billMonth);
    }
  }

  downloadReportButtonClicked(){
    this.viewByZoneIdAndBillMonth();
  }

  resultList : any;
  viewByZoneIdAndBillMonth(){
    let methodName = "viewByZoneIdAndBillMonth";
    this.resultList = [];
    this.reportService.getJsonInputByBillMonth(this.billingMonth.billMonth, false).subscribe(successResponse =>{
      let result:any = successResponse;
      if(result && result.length)
      {
        this.resultList = result;
        let transaction_data =[];
        this.resultList.forEach(element => {
          transaction_data.push(this.prepareTransactionDataElement(element));    
        });

        let jsonObject: any = {};
        jsonObject.headerObject = this.prepareHeaderObject(this.resultList);
        jsonObject.transaction_data = transaction_data;
        jsonObject.footerObject = this.prepareFooterObject(this.resultList);
        
        let jsonData = JSON.stringify(jsonObject , null, '\t');
        let dataType = 'data:application/octet-stream'; //'octet/stream'
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
    let endBillMonth = this.billingMonth.billMonth;
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

}
