import { Injectable } from '@angular/core';
import { GlobalConfiguration } from '@eas-utility/global-configuration';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  private REPORT_URL = "report/";

  constructor(private httpClient : HttpClient) { }

  getD1GenerationStatusByZoneIdAndBillMonth(zoneId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/missing-data/zone/id/' + zoneId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/missing-data/zone/id/' + zoneId + "/bill-month/" + billMonth);
    }
  }

  getD1GenerationStatusByDivisionIdAndBillMonth(divisionId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/missing-data/division/id/' + divisionId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/missing-data/division/id/' + divisionId + "/bill-month/" + billMonth);
    }
  }

  generateD1ReportForZone(d1Report, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd1-report/zone/',  d1Report,  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd1-report/zone/', d1Report);
    }
  }

  generateD1ReportForDivision(d1Report, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd1-report/division/',  d1Report,  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd1-report/division/', d1Report);
    }
  }
  
  getD1ByZoneIdAndBillMonth(zoneId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/zone/id/' + zoneId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/zone/id/' + zoneId + "/bill-month/" + billMonth);
    }
  }

  getD1ByDivisionIdAndBillMonth(divisionId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/division/id/' + divisionId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/division/id/' + divisionId + "/bill-month/" + billMonth);
    }
  }

  getNGBBillingStatusByZoneIdAndBillMonth(zoneId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'ngb-billing/status/zone/id/' + zoneId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'ngb-billing/status/zone/id/' + zoneId + "/bill-month/" + billMonth);
    }
  }

  getNGBBillingStatusByTownIdAndBillMonth(townId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'ngb-billing/status/town/id/' + townId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'ngb-billing/status/town/id/' + townId + "/bill-month/" + billMonth);
    }
  }

  getNGBBillingStatusByDivisionIdAndBillMonth(divisionId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'ngb-billing/status/division/id/' + divisionId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'ngb-billing/status/division/id/' + divisionId + "/bill-month/" + billMonth);
    }
  }

  generateD7ReportForTown(d7Report, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd7-report/town/',  d7Report,  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd7-report/town/', d7Report);
    }
  }

  generateD7ReportForCircle(d7Report, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd7-report/circle/',  d7Report,  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd7-report/circle/', d7Report);
    }
  }
    
  getD7ByTownIdAndBillMonth(townId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd7-report/town/id/' + townId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd7-report/town/id/' + townId + "/bill-month/" + billMonth);
    }
  }

  getD7ByCircleIdAndBillMonth(circleId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd7-report/circle/id/' + circleId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd7-report/circle/id/' + circleId + "/bill-month/" + billMonth);
    }
  }

  generateD4ReportForZone(d4Report, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd4-report/zone/',  d4Report,  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd4-report/zone/', d4Report);
    }
  }

  generateD4ReportForDivision(d4Report, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd4-report/division/',  d4Report,  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd4-report/division/', d4Report);
    }
  }
    
  getD4ByZoneIdAndBillMonth(zoneId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd4-report/zone/id/' + zoneId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd4-report/zone/id/' + zoneId + "/bill-month/" + billMonth);
    }
  }

  getD4ByDivisionIdAndBillMonth(divisionId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd4-report/division/id/' + divisionId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd4-report/division/id/' + divisionId + "/bill-month/" + billMonth);
    }
  }

  generateD5ReportForZone(d5Report, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd5-report/zone/',  d5Report,  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd5-report/zone/', d5Report);
    }
  }

  generateD5ReportForDivision(d5Report, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd5-report/division/',  d5Report,  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd5-report/division/', d5Report);
    }
  }

  getD5ByZoneIdAndBillMonth(zoneId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd5-report/zone/id/' + zoneId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd5-report/zone/id/' + zoneId + "/bill-month/" + billMonth);
    }
  }
  
  getD5ByDivisionIdAndBillMonth(divisionId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd5-report/division/id/' + divisionId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd5-report/division/id/' + divisionId + "/bill-month/" + billMonth);
    }
  }

  generateNscMonitoringInput(nscMonitoringInput, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd2-report/town',  nscMonitoringInput,  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd2-report/town', nscMonitoringInput);
    }
  }
  
  generateD2ReportForTown(d2Report, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd2-report/town/',  d2Report,  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd2-report/town/', d2Report);
    }
  }

  // generateD2ReportForDivision(d2Report, response){
  //   if(response){
  //     let options : any = {'observe' : 'response'};
  //     return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd2-report/division/',  d2Report,  options);
  //   }else{
  //     return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd2-report/division/', d2Report);
  //   }
  // }
    
  getD2ByTownIdAndBillMonth(townId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd2-report/town/id/' + townId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd2-report/town/id/' + townId + "/bill-month/" + billMonth);
    }
  }

  // getD2ByDivisionIdAndBillMonth(divisionId, billMonth, response){
  //   if(response){
  //     let options : any = {'observe' : 'response'};
  //     return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd2-report/division/id/' + divisionId + "/bill-month/" + billMonth,  options);
  //   }else{
  //     return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd2-report/division/id/' + divisionId + "/bill-month/" + billMonth);
  //   }
  // }

  generateConsumerComplaintsRedressal(consumerComplaintsRedressal, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd3-report/town',  consumerComplaintsRedressal,  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd3-report/town', consumerComplaintsRedressal);
    }
  }

  getD3ByTownIdAndBillMonth(zoneId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd3-report/town/id/' + zoneId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd3-report/town/id/' + zoneId + "/bill-month/" + billMonth);
    }
  }

  // getD3ByDivisionIdAndBillMonth(divisionId, billMonth, response){
  //   if(response){
  //     let options : any = {'observe' : 'response'};
  //     return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd3-report/division/id/' + divisionId + "/bill-month/" + billMonth,  options);
  //   }else{
  //     return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd3-report/division/id/' + divisionId + "/bill-month/" + billMonth);
  //   }
  // }

  generateJsonInputForZone(zoneId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'feeder/monitoring/zone/id/' + zoneId + "/bill-month/" + billMonth,  {},  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'feeder/monitoring/zone/id/' + zoneId + "/bill-month/" + billMonth, {});
    }
  }

  getJsonInputByZoneIdAndBillMonth(zoneId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'feeder/monitoring/zone/id/' + zoneId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'feeder/monitoring/zone/id/' + zoneId + "/bill-month/" + billMonth);
    }
  }

  getJsonInputByBillMonth(billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'feeder/monitoring/bill-month/' + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'feeder/monitoring/bill-month/' + billMonth);
    }
  }

  getD1ReportDataByZoneIdAndBillMonth(zoneId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/zone/' + zoneId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/zone/' + zoneId + "/bill-month/" + billMonth);
    }
  }

  generateD1ReportDataByZoneIdAndBillMonth(zoneId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd1-report/zone/' + zoneId + "/bill-month/" + billMonth, null,  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd1-report/zone/' + zoneId + "/bill-month/" + billMonth, null);
    }
  }

  generateD1ReportDataByDivisionIdAndBillMonth(divisionId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd1-report/division/' + divisionId + "/bill-month/" + billMonth, null,  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd1-report/division/' + divisionId + "/bill-month/" + billMonth, null);
    }
  }

  getD4GenerationStatusByZoneIdAndBillMonth(zoneId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd4-report/missing-data/zone/id/' + zoneId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd4-report/missing-data/zone/id/' + zoneId + "/bill-month/" + billMonth);
    }
  }

  getD4GenerationStatusByDivisionIdAndBillMonth(divisionId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd4-report/missing-data/division/id/' + divisionId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd4-report/missing-data/division/id/' + divisionId + "/bill-month/" + billMonth);
    }
  }

  getD4ReportBillingDataByZoneIdAndBillMonth(zoneId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd4-report/billing-data/zone/id/' + zoneId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd4-report/billing-data/zone/id/' + zoneId + "/bill-month/" + billMonth);
    }
  }

  generateD4ReportByZoneIdAndBillMonth(zoneId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd4-report/zone/id/' + zoneId + "/bill-month/" + billMonth, null, options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd4-report/zone/id/' + zoneId + "/bill-month/" + billMonth, null);
    }
  }

  getFeederMonitoringReportBillingDataByZoneIdAndBillMonth(zoneId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'feeder/monitoring/missing-data/zone/id/' + zoneId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'feeder/monitoring/missing-data/zone/id/' + zoneId + "/bill-month/" + billMonth);
    }
  }

  getD1GenerationStatusByTownIdAndBillMonth(townId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/missing-data/town/' + townId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/missing-data/town/' + townId + "/bill-month/" + billMonth);
    }
  }

  getD1ByTownIdAndBillMonth(townId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/town/' + townId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/town/' + townId + "/bill-month/" + billMonth);
    }
  }

  getD1ReportDataByTownIdAndBillMonth(townId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/billing-data/town/' + townId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/billing-data/town/' + townId + "/bill-month/" + billMonth);
    }
  }

  generateD1ReportDataByTownIdAndBillMonth(townId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd1-report/town/' + townId + "/bill-month/" + billMonth, null,  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd1-report/town/' + townId + "/bill-month/" + billMonth, null);
    }
  }

  getD4GenerationStatusByTownIdAndBillMonth(zoneId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd4-report/missing-data/town/id/' + zoneId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd4-report/missing-data/town/id/' + zoneId + "/bill-month/" + billMonth);
    }
  }

  getD4ReportBillingDataByTownIdAndBillMonth(zoneId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd4-report/billing-data/town/id/' + zoneId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd4-report/billing-data/town/id/' + zoneId + "/bill-month/" + billMonth);
    }
  }

  generateD4ReportByTownIdAndBillMonth(townId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd4-report/town/id/' + townId + "/bill-month/" + billMonth, null, options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd4-report/town/id/' + townId + "/bill-month/" + billMonth, null);
    }
  }

  getBillingDataForZone(zoneId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'feeder/monitoring/billing-data/zone/id/' + zoneId + "/bill-month/" + billMonth, options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'feeder/monitoring/billing-data/zone/id/' + zoneId + "/bill-month/" + billMonth);
    }
  }

  getMissingTownWiseBillDataByBillMonth(billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/missing/town-wise-bill-data/bill-month/' + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/missing/town-wise-bill-data/bill-month/' + billMonth);
    }
  }

  generateAllTownD1ReportByBillMonth(billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/bill-month/' + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/bill-month/' + billMonth);
    }
  }

  exportAllTownD1ReportByBillMonth(billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/export/bill-month/' + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/export/bill-month/' + billMonth);
    }
  }

  getTownByZoneId(zoneId, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + 'town/zone/id/' + zoneId,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + 'town/zone/id/' + zoneId);
    }
  }

  getMissingD7DataByBillMonth(billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd7-report/missing/d7-data/bill-month/' + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd7-report/missing/d7-data/bill-month/' + billMonth);
    }
  }

  getAllTownD7ReportByBillMonth(billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd7-report/bill-month/' + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd7-report/bill-month/' + billMonth);
    }
  }

  generateAllTownD7ReportByBillMonth(billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd7-report/bill-month/' + billMonth,  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd7-report/bill-month/' + billMonth, null);
    }
  }

  getD1BillingDataByTownId(townId, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/billing-data/town/id/' + townId,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/billing-data/town/id/' + townId);
    }
  }

  getFeederWiseBillingDataByTownId(townId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + 'feeder/reading/data/town/id/' + townId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + 'feeder/reading/data/town/id/' + townId + "/bill-month/" + billMonth);
    }
  }

  getMissingOnlineFeederReportDataByBillMonth(billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'feeder/monitoring/missing/data/bill-month/' + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'feeder/monitoring/missing/data/bill-month/' + billMonth);
    }
  }
}