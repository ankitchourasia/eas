import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { GlobalConfiguration } from 'app/utility/global-configuration';

@Injectable({
  providedIn: 'root'
})
export class FeederService {
  
  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  FEEDER_URL = "feeder/";

  constructor(private http : HttpClient) { }

  addFeeder(feeder){
    return this.http.post(this.URL_PREFIX + this.FEEDER_URL, feeder);
  }

  getFeederByDivisionId(divisionId){
    return this.http.get(this.URL_PREFIX + this.FEEDER_URL +'division/' + divisionId);
  }

  deleteFeederById(feederId, deletedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("deletedBy", deletedBy);
    let options = {
      params: httpParams
    };
    return this.http.delete(this.URL_PREFIX + this.FEEDER_URL + feederId, options);
  }

  updateFeeder(feeder, updatedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("updatedBy", updatedBy);
    let options = {
      params: httpParams
    };
    return this.http.put(this.URL_PREFIX + this.FEEDER_URL + feeder.id, feeder, options);
  }

  getFeederBySubstationId(substationId){
    return this.http.get(this.URL_PREFIX + this.FEEDER_URL + 'substation/' + substationId);
  }

  getPreviousReadingByFeederId(feederId){
    return this.http.get(this.URL_PREFIX + this.FEEDER_URL + 'reading/last-inserted/feeder/id/' + feederId);
  }

  addFeederReading(feederReading, punchedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("punchedBy", punchedBy);
    let options = {
      params: httpParams
    };
    return this.http.post(this.URL_PREFIX + this.FEEDER_URL + 'reading', feederReading, options);
  }

  addFeederMeterReplacement(replacementData, punchedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("punchedBy", punchedBy);
    let options = {
      params: httpParams
    };
    return this.http.post(this.URL_PREFIX + this.FEEDER_URL + 'meter/replacement', replacementData, options);
  }

  getFeederReadingsByDivisionId(divisionId, billMonth){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    return this.http.get(this.URL_PREFIX + this.FEEDER_URL + 'reading/division/id/' + divisionId, options);
  }

  updateFeederReading(reading, nextBillMonth, updatedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("nextBillMonth", nextBillMonth)
    .append("updatedBy", updatedBy);
    let options = {
      params: httpParams
    };
    return this.http.put(this.URL_PREFIX + this.FEEDER_URL + 'reading/' + reading.id, reading, options);
  }
}