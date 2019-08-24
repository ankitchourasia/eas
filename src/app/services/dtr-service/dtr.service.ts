import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Injectable({
  providedIn: 'root'
})
export class DtrService {

  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  private DTR_URL = "dtr/";

  constructor(private http : HttpClient) { }

  addDTR(dtr){
    return this.http.post(this.URL_PREFIX + this.DTR_URL, dtr);
  }

  getDTRByDivisionId(divisionId){
    return this.http.get(this.URL_PREFIX + this.DTR_URL + 'division/' + divisionId);
  }

  getDTRByFeederId(feederId){
    return this.http.get(this.URL_PREFIX + this.DTR_URL + 'feeder/' + feederId);
  }

  deleteDTRById(dtrId, deletedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("deletedBy", deletedBy);
    let options = {
      params: httpParams
    };
    return this.http.delete(this.URL_PREFIX + this.DTR_URL + dtrId, options);
  }

  updateDTR(dtr, updatedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("updatedBy", updatedBy);
    let options = {
      params: httpParams
    };
    return this.http.put(this.URL_PREFIX + this.DTR_URL + dtr.id, dtr, options);
  }

  getReadingByDTRId(dtrId, response){
    // return this.http.get(this.URL_PREFIX + this.DTR_URL + 'reading/dtr/id/' + dtrId);
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.get(this.URL_PREFIX + this.DTR_URL + 'reading/dtr/id/' + dtrId,  options);
    }else{
      return this.http.get(this.URL_PREFIX + this.DTR_URL + 'reading/dtr/id/' + dtrId);
    }
  }

  getReadingByFeederIdAndBillMonth(feederId, billMonth, response){
    // return this.http.get(this.URL_PREFIX + this.DTR_URL + 'reading/dtr/id/' + dtrId);
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.http.get(this.URL_PREFIX + this.DTR_URL + 'reading/feeder/' + feederId,  options);
    // return this.http.get(this.URL_PREFIX + this.DTR_URL + 'reading/feeder/id/' + feederId,  options);
  }

  getReadingByDivisionIdAndBillMonth(divisionId, billMonth, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.http.get(this.URL_PREFIX + this.DTR_URL + 'reading/division/id/' + divisionId,  options);
  }

  getReadingByZoneIdAndBillMonth(zoneId, billMonth, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.http.get(this.URL_PREFIX + this.DTR_URL + 'reading/zone/id/' + zoneId,  options);
  }

  getLastInsertedReadingByDtrId(dtrId, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.get(this.URL_PREFIX + this.DTR_URL + 'reading/last-inserted/dtr/id/' + dtrId,  options);
    }else{
      return this.http.get(this.URL_PREFIX + this.DTR_URL + 'reading/last-inserted/dtr/id/' + dtrId);
    }
  }

  addDTRRead(dtrReading, punchedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("punchedBy", punchedBy);
    let options = {
      params: httpParams
    };
    return this.http.post(this.URL_PREFIX + this.DTR_URL + 'reading/', dtrReading, options);
  }

  addDtrReadWithMeterReplacement(dtrReading, punchedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("punchedBy", punchedBy);
    let options = {
      params: httpParams
    };
    return this.http.post(this.URL_PREFIX + this.DTR_URL + 'meter/replacement/', dtrReading, options);
  }

  updateDTRRead(dtrReading, nextBillMonth, updatedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("updatedBy", updatedBy);
    httpParams = httpParams.append("nextBillMonth", nextBillMonth);
    let options = {
      params: httpParams
    };
    return this.http.put(this.URL_PREFIX + this.DTR_URL + 'reading/'+ dtrReading.id, dtrReading, options);
  }

  generateAllDTRLossByFeederAndBillMonth(feeder, billMonth, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.http.post(this.URL_PREFIX + 'dtrloss', feeder,  options);
  }

  generateDTRLossByDtrAndBillMonth(dtr, billMonth, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.http.post(this.URL_PREFIX + 'dtrloss/single', dtr,  options);
  }

  getDTRLossReportByFeederIdAndBillMonth(feederId, billMonth, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.http.get(this.URL_PREFIX + 'dtrloss/feederId/' + feederId,  options);
  }

  getDtrPreBillingReportsByFeederIdAndBillMonth(feederId, billMonth, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.http.get(this.URL_PREFIX + this.DTR_URL +  'prebilling/report/feeder/id/' + feederId,  options);
  }

  savePreBillingReport(dtrPrebilling, billMonth, response){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    if(response){
      options['observe'] = "response";
    }
    return this.http.post(this.URL_PREFIX + this.DTR_URL + 'prebilling/report', dtrPrebilling,  options);
  }
  
}
