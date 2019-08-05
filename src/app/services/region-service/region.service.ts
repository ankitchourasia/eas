import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConfiguration } from 'app/utility/global-configuration';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  REGION_URL = "region/";

  constructor(private http : HttpClient) { }

  getRegions(response){
    // return this.http.get(this.URL_PREFIX + 'region/');
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.get(this.URL_PREFIX + this.REGION_URL, options);
    }else{
      return this.http.get(this.URL_PREFIX + this.REGION_URL);
    }
  }

  addRegion(region, response){
    // return this.http.get(this.URL_PREFIX + 'region/');
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.post(this.URL_PREFIX + this.REGION_URL, region, options);
    }else{
      return this.http.post(this.URL_PREFIX + this.REGION_URL, region);
    }
  }

  updateRegion(region, response){
    // return this.http.get(this.URL_PREFIX + 'region/');
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.put(this.URL_PREFIX + this.REGION_URL, region, options);
    }else{
      return this.http.put(this.URL_PREFIX + this.REGION_URL, region);
    }
  }
}
