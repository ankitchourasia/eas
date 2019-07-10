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

}
