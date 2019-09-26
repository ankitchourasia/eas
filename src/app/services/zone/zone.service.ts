import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(private http: HttpClient) { }

  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  private ZONE_URL = "zone/";

  getZonesFromDivisionId(divisionId){
    return this.http.get(this.URL_PREFIX + this.ZONE_URL + "division/id/" + divisionId);
  }

  getZonesByDivisionId(divisionId,response){
    // return this.http.get(this.URL_PREFIX + 'circle/');
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.get(this.URL_PREFIX + this.ZONE_URL + 'division/id/' + divisionId,  options);
    }else{
      return this.http.get(this.URL_PREFIX + this.ZONE_URL +  'division/id/' + divisionId);
    }
  }

  getZones(response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.get(this.URL_PREFIX + this.ZONE_URL,  options);
    }else{
      return this.http.get(this.URL_PREFIX + this.ZONE_URL);
    }
  }

  addZone(zone, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.post(this.URL_PREFIX + this.ZONE_URL, zone,  options);
    }else{
      return this.http.post(this.URL_PREFIX + this.ZONE_URL, zone);
    }
  }

  updateZone(zone, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.put(this.URL_PREFIX + this.ZONE_URL, zone,  options);
    }else{
      return this.http.put(this.URL_PREFIX + this.ZONE_URL, zone);
    }
  }

}
