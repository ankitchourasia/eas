import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConfiguration } from 'app/utility/global-configuration';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  private URL_PREFIX = GlobalConfiguration.URL_PREFIX;
  private DIVISION_URL = "division/";

  constructor(private http : HttpClient) { }

  getDivisionsByCircleId(circleId,response){
    // return this.http.get(this.URL_PREFIX + 'circle/');
    if(response){
      let options : any = {'observe' : 'response'};
      return this.http.get(this.URL_PREFIX + this.DIVISION_URL + 'circle/id/' + circleId,  options);
    }else{
      return this.http.get(this.URL_PREFIX + this.DIVISION_URL + 'circle/id/' + circleId);
    }
  }
}
