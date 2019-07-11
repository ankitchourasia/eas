import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'app/utility/global.constants';

@Injectable({
  providedIn: 'root'
})
export class DtrService {

  constructor(private http : HttpClient) { }

  private URL_PREFIX = GlobalConstants.URL_PREFIX;

  addDTR(dtr){
    return this.http.post(this.URL_PREFIX + 'dtr', dtr);
  }

  getDTRByDivisionId(divisionId){
    return this.http.get(this.URL_PREFIX + 'dtr/division/' + divisionId);
  }

  getDTRByFeederId(feederId){
    return this.http.get(this.URL_PREFIX + 'dtr/feeder/' + feederId);
  }

  deleteDTRById(dtrId, deletedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("deletedBy", deletedBy);
    let options = {
      params: httpParams
    };
    return this.http.delete(this.URL_PREFIX + "dtr/" + dtrId, options);
  }

  updateDTR(dtr, updatedBy){
    let httpParams = new HttpParams();
    httpParams = httpParams.append("updatedBy", updatedBy);
    let options = {
      params: httpParams
    };
    return this.http.put(this.URL_PREFIX + "dtr/" + dtr.id, dtr, options);
  }
  
}
