import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConfiguration } from '@eas-utility/global-configuration';

@Injectable({
  providedIn: 'root'
})
export class CircleService {

  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  private CIRCLE_URL = "circle/";

  constructor(private http : HttpClient) { }

  getCircles(response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.get(this.URL_PREFIX + this.CIRCLE_URL,  options);
    }else{
      return this.http.get(this.URL_PREFIX + this.CIRCLE_URL);
    }
  }
  
  getCirclesByRegionId(regionId,response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.get(this.URL_PREFIX + this.CIRCLE_URL + 'region/id/' + regionId,  options);
    }else{
      return this.http.get(this.URL_PREFIX + this.CIRCLE_URL + 'region/id/' + regionId);
    }
  }

  addCircle(circle, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.post(this.URL_PREFIX + this.CIRCLE_URL, circle,  options);
    }else{
      return this.http.post(this.URL_PREFIX + this.CIRCLE_URL, circle);
    }
  }

  updateCircle(circle, response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.put(this.URL_PREFIX + this.CIRCLE_URL, circle,  options);
    }else{
      return this.http.put(this.URL_PREFIX + this.CIRCLE_URL, circle);
    }
  }

  getTownsByCircleId(circleId,response){
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.get(this.URL_PREFIX + 'town/circle/' + circleId,  options);
    }else{
      return this.http.get(this.URL_PREFIX + 'town/circle/' + circleId);
    }
  }
}
