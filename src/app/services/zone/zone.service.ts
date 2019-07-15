import { Injectable } from '@angular/core';
import { GlobalConstants } from 'app/utility/global.constants';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ZoneService {

  constructor(private http: HttpClient) { }

  private URL_PREFIX = GlobalConstants.URL_PREFIX;
  private ZONE_URL = "zone";

  getZonesFromDivisionId(divisionId){
    return this.http.get(this.URL_PREFIX + this.ZONE_URL + "/division/id/" + divisionId);
  }

  getZonseByDivisionId(divisionId,response){
    // return this.http.get(this.URL_PREFIX + 'circle/');
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.get(this.URL_PREFIX + this.ZONE_URL + 'division/id/' + divisionId,  options);
    }else{
      return this.http.get(this.URL_PREFIX + this.ZONE_URL +  'division/id/' + divisionId);
    }
  }

}
