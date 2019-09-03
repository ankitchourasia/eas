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

  generateD7ReportForZone(d7Report, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd7-report/zone/',  d7Report,  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd7-report/zone/', d7Report);
    }
  }

  generateD7ReportForDivision(d7Report, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd7-report/division/',  d7Report,  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd7-report/division/', d7Report);
    }
  }
    
  getD7ByZoneIdAndBillMonth(zoneId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd7-report/zone/id/' + zoneId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd7-report/zone/id/' + zoneId + "/bill-month/" + billMonth);
    }
  }

  getD7ByDivisionIdAndBillMonth(divisionId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd7-report/division/id/' + divisionId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd7-report/division/id/' + divisionId + "/bill-month/" + billMonth);
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

  saveNscMonitoringInput(nscMonitoringInput, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd2-report/zone',  nscMonitoringInput,  options);
    }else{
      return this.httpClient.post(this.URL_PREFIX + this.REPORT_URL + 'd2-report/zone', nscMonitoringInput);
    }
  }
}
