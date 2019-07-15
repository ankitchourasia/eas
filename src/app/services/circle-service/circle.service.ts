import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConfiguration } from 'app/utility/global-configuration';

@Injectable({
  providedIn: 'root'
})
export class CircleService {

  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  private CIRCLE_URL = "circle/";

  constructor(private http : HttpClient) { }

  getCirclesByRegionId(regionId,response){
    // return this.http.get(this.URL_PREFIX + 'region/');
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.get(this.URL_PREFIX + this.CIRCLE_URL + 'region/id/' + regionId,  options);
    }else{
      return this.http.get(this.URL_PREFIX + this.CIRCLE_URL + 'region/id/' + regionId);
    }
  }
}
