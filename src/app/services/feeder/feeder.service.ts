import { Injectable } from '@angular/core';
import { GlobalConstants } from 'app/utility/global.constants';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeederService {

  constructor(private http : HttpClient) { }

  private URL_PREFIX = GlobalConstants.URL_PREFIX;

  addFeeder(feeder){
    return this.http.post(this.URL_PREFIX + 'feeder', feeder);
  }

  getFeederByDivisionId(divisionId){
    return this.http.get(this.URL_PREFIX + 'feeder/division/' + divisionId);
  }

  deleteFeederById(feederId, deletedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("deletedBy", deletedBy);
    let options = {
      params: httpParams
    };
    return this.http.delete(this.URL_PREFIX + "feeder/" + feederId, options);
  }

  updateFeeder(feeder, updatedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("updatedBy", updatedBy);
    let options = {
      params: httpParams
    };
    return this.http.put(this.URL_PREFIX + "feeder/" + feeder.id, feeder, options);
  }

  getFeederBySubstationId(substationId){
    return this.http.get(this.URL_PREFIX + 'feeder/substation/' + substationId);
  }

  getPreviousReadingByFeederId(feederId){
    return this.http.get(this.URL_PREFIX + 'feeder/reading/last-inserted/feeder/id/' + feederId);
  }

  addFeederReading(feederReading, punchedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("punchedBy", punchedBy);
    let options = {
      params: httpParams
    };
    return this.http.post(this.URL_PREFIX + 'feeder/reading', feederReading, options);
  }

  addFeederMeterReplacement(replacementData, punchedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("punchedBy", punchedBy);
    let options = {
      params: httpParams
    };
    return this.http.post(this.URL_PREFIX + 'feeder/meter/replacement', replacementData, options);
  }

  getFeederReadingsByDivisionId(divisionId, billMonth){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("billMonth", billMonth);
    let options = {
      params: httpParams
    };
    return this.http.get(this.URL_PREFIX + 'feeder/reading/division/id/' + divisionId, options);
  }

  updateFeederReading(reading, nextBillMonth, updatedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("nextBillMonth", nextBillMonth)
    .append("updatedBy", updatedBy);
    let options = {
      params: httpParams
    };
    return this.http.put(this.URL_PREFIX + 'feeder/reading/' + reading.id, reading, options);
  }
}
