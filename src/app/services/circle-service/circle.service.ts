import { Injectable } from '@angular/core';
import { GlobalConstants } from 'app/utility/global.constants';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CircleService {

  private URL_PREFIX = GlobalConstants.URL_PREFIX;

  constructor(private http : HttpClient) { }

  getCirclesByRegionId(regionId,response){
    // return this.http.get(this.URL_PREFIX + 'region/');
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.get(this.URL_PREFIX + 'circle/region/id/' + regionId,  options);
    }else{
      return this.http.get(this.URL_PREFIX + 'circle/region/id/' + regionId);
    }
  }
}
