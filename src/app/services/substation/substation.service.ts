import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Injectable({
  providedIn: 'root'
})
export class SubstationService {

  constructor(private http : HttpClient) { }

  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  private SUBSTATION_URL = "substation/";

  addSubstation(substation){
    return this.http.post(this.URL_PREFIX + this.SUBSTATION_URL, substation);
  }

  getSubstationByDivisionId(divisionId){
    return this.http.get(this.URL_PREFIX + this.SUBSTATION_URL + 'division/' + divisionId);
  }

  deleteSubstationById(substationId, deletedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("deletedBy", deletedBy);
    let options = {
      params: httpParams
    };
    return this.http.delete(this.URL_PREFIX + this.SUBSTATION_URL + substationId, options);
  }

  updateSubstation(substation, updatedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("updatedBy", updatedBy);
    let options = {
      params: httpParams
    };
    return this.http.put(this.URL_PREFIX + this.SUBSTATION_URL  + substation.id, substation, options);
  }

  getSubstationsByZoneId(zoneId){
    return this.http.get(this.URL_PREFIX + this.SUBSTATION_URL + 'zone/' + zoneId);
  }
}
