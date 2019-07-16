import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { GlobalConfiguration } from 'app/utility/global-configuration';

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

  getReadingByDivisionId(billMonth, divisionId, response){
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

  getReadingByZoneId(billMonth, zoneId, response){
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

  addDTRRead(dtrReading, punchedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("punchedBy", punchedBy);
    let options = {
      params: httpParams
    };
    return this.http.post(this.URL_PREFIX + this.DTR_URL + 'reading/', dtrReading, options);
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
  
}
