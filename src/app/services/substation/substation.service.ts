import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
