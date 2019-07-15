import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'app/utility/global.constants';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private URL_PREFIX = GlobalConstants.URL_PREFIX;

  constructor(private http : HttpClient) { }

  getRegions(response){
    // return this.http.get(this.URL_PREFIX + 'region/');
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.get(this.URL_PREFIX + 'region', options);
    }else{
      return this.http.get(this.URL_PREFIX + 'region');
    }
  }
}
