import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalConstants } from 'app/utility/global.constants';

@Injectable({
  providedIn: 'root'
})
export class SubstationService {

  constructor(private http : HttpClient) { }

  private URL_PREFIX = GlobalConstants.URL_PREFIX;

  addSubstation(substation){
    return this.http.post(this.URL_PREFIX + 'substation', substation);
  }

  getSubstationByDivisionId(divisionId){
    return this.http.get(this.URL_PREFIX + 'substation/division/' + divisionId);
  }

  deleteSubstationById(substationId, deletedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("deletedBy", deletedBy);
    let options = {
      params: httpParams
    };
    return this.http.delete(this.URL_PREFIX + "substation/" + substationId, options);
  }

  updateSubstation(substation, updatedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("updatedBy", updatedBy);
    let options = {
      params: httpParams
    };
    return this.http.put(this.URL_PREFIX + "substation/" + substation.id, substation, options);
  }

  getSubstationsByZoneId(zoneId){
    return this.http.get(this.URL_PREFIX + 'substation/zone/' + zoneId);
  }
}
