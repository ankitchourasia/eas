import { Injectable } from '@angular/core';
import { GlobalConfiguration } from 'app/utility/global-configuration';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  private REPORT_URL = "report/";

  constructor(private httpClient : HttpClient) { }

  getFeederWiseLossGenerationStatusByZoneIdAndBillMonth(zoneId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/zone/id/' + zoneId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/zone/id/' + zoneId + "/bill-month/" + billMonth);
    }
  }

  getFeederWiseLossGenerationStatusByDivisionIdAndBillMonth(divisionId, billMonth, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/division/id/' + divisionId + "/bill-month/" + billMonth,  options);
    }else{
      return this.httpClient.get(this.URL_PREFIX + this.REPORT_URL + 'd1-report/division/id/' + divisionId + "/bill-month/" + billMonth);
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

  // updateDTR(dtr, updatedBy){
  //   let httpParams = new HttpParams();
  //   httpParams = httpParams.append("updatedBy", updatedBy);
  //   let options = {
  //     params: httpParams
  //   };
  //   return this.http.put(this.URL_PREFIX + this.REPORT_URL + dtr.id, dtr, options);
  // }

  // getReadingByDTRId(dtrId, response){
  //   // return this.http.get(this.URL_PREFIX + this.REPORT_URL + 'reading/dtr/id/' + dtrId);
  //   if(response){
  //     let options : any = {'observe' : 'response'};
  //     return this.http.get(this.URL_PREFIX + this.REPORT_URL + 'reading/dtr/id/' + dtrId,  options);
  //   }else{
  //     return this.http.get(this.URL_PREFIX + this.REPORT_URL + 'reading/dtr/id/' + dtrId);
  //   }
  // }

  // getReadingByFeederIdAndBillMonth(feederId, billMonth, response){
  //   // return this.http.get(this.URL_PREFIX + this.REPORT_URL + 'reading/dtr/id/' + dtrId);
  //   let httpParams = new HttpParams();
  //   httpParams = httpParams.append("billMonth", billMonth);
  //   let options = {
  //     params: httpParams
  //   };
  //   if(response){
  //     options['observe'] = "response";
  //   }
  //   return this.http.get(this.URL_PREFIX + this.REPORT_URL + 'reading/feeder/' + feederId,  options);
  //   // return this.http.get(this.URL_PREFIX + this.REPORT_URL + 'reading/feeder/id/' + feederId,  options);
  // }
}
