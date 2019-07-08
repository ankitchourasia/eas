import { Injectable } from '@angular/core';
import { GlobalConstants } from 'app/utility/global.constants';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ZoneService {

  constructor(private http: HttpClient) { }

  private ZONE_URL = GlobalConstants.URL_PREFIX + "zone"

  getZonesFromDivisionId(divisionId){
    return this.http.get(this.ZONE_URL + "/division/id/" + divisionId);
  }

}
